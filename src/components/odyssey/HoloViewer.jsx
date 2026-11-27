import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';

const pad = (n, width) => String(n).padStart(width, "0");

// Scene units: the placeholder vehicle is 2.2 long, the projector base ring is 1.84 in radius.
const BASE_RADIUS = 1.84;
const MAX_MODEL_RADIUS = 1.45;   // loaded models stay inside the inner ring (1.55)
const MAX_MODEL_HEIGHT = 1.8;
const FRAME_MARGIN = 1.08;       // a little breathing room for the overlay labels
const CAMERA_DIRECTION = new THREE.Vector3(3.6, 2.1, 3.6).normalize(); // 3/4 view from slightly above

const vertexShader = `
  varying vec3 vN; varying vec3 vV; varying float vY;
  void main() {
    vec4 wp = modelMatrix * vec4(position, 1.);
    vY = wp.y;
    vec4 mv = viewMatrix * wp;
    vN = normalize(normalMatrix * normal);
    vV = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }`;

// Fresnel rim + scanlines + a sweeping bright band + slight flicker
const fragmentShader = `
  uniform vec3 uColor; uniform float uTime;
  varying vec3 vN; varying vec3 vV; varying float vY;
  void main() {
    float f = pow(1. - abs(dot(normalize(vN), normalize(vV))), 2.2);
    float scan = .5 + .5 * sin(vY * 140. - uTime * 3.);
    float bp = mod(uTime * .45, 1.5) - .2;
    float band = smoothstep(.09, 0., abs(vY - bp));
    float flick = .94 + .06 * sin(uTime * 31.) * sin(uTime * 7.3);
    float a = (.05 + f * .7 + scan * .05 + band * .45) * flick;
    gl_FragColor = vec4(uColor * (.55 + f + band), a);
    #include <colorspace_fragment>
  }`;

// Placeholder vehicle, matching the dimensions in the technical drawing (1 unit = 1 m)
const buildVehicle = (add) => {
    add(new THREE.BoxGeometry(2.2, .12, 1.1), 0, .32, 0);
    add(new THREE.BoxGeometry(1.4, .35, .9), -.2, .55, 0);
    add(new THREE.BoxGeometry(.5, .2, .8), .85, .45, 0);
    [[-.75, .6], [-.75, -.6], [.75, .6], [.75, -.6]].forEach(([x, z]) =>
        add(new THREE.CylinderGeometry(.26, .26, .12, 28), x, .26, z, Math.PI / 2));
    [-.75, .75].forEach((x) => add(new THREE.CylinderGeometry(.03, .03, 1.2, 8), x, .26, 0, Math.PI / 2));
};

const circlePoints = (r, y, segments = 96) => {
    const points = [];
    for (let i = 0; i <= segments; i++) {
        const a = (i / segments) * Math.PI * 2;
        points.push(new THREE.Vector3(Math.cos(a) * r, y, Math.sin(a) * r));
    }
    return points;
};

// modelUp: which axis of the model file points up ("z" by default, "y" or "x")
const HoloViewer = ({ accent, model, modelUp = "z" }) => {
    const hostRef = useRef(null);
    const yawRef = useRef(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const host = hostRef.current;
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        let renderer;
        try {
            renderer = new THREE.WebGLRenderer({ antialias: true });
        } catch (e) {
            setError("3D view is not available in this browser.");
            return undefined;
        }
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.setClearColor(0x030405, 1);
        const canvas = renderer.domElement;
        host.prepend(canvas);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(32, 1.6, .1, 100);

        // Size of what's on the turntable: footprint radius around the rotation axis, and height.
        // Starts as the placeholder vehicle's; replaced once an .stl model loads.
        let bounds = { radius: Math.hypot(1.1, .66), height: .725 };

        // Aim the camera so the model (at any rotation) and the projector base fit the view
        // both horizontally and vertically, whatever the viewer's aspect ratio.
        const fitCamera = () => {
            const centerY = bounds.height / 2;
            const footprint = Math.max(bounds.radius, BASE_RADIUS);
            const sphereRadius = Math.hypot(footprint, centerY);
            const vFov = THREE.MathUtils.degToRad(camera.fov);
            const hFov = 2 * Math.atan(Math.tan(vFov / 2) * camera.aspect);
            const distance = (sphereRadius / Math.sin(Math.min(vFov, hFov) / 2)) * FRAME_MARGIN;
            camera.position.copy(CAMERA_DIRECTION).multiplyScalar(distance).add(new THREE.Vector3(0, centerY, 0));
            camera.lookAt(0, centerY, 0);
            camera.far = distance * 3;
            camera.updateProjectionMatrix();
        };

        const color = new THREE.Color(accent);
        const material = new THREE.ShaderMaterial({
            uniforms: { uColor: { value: color }, uTime: { value: 0 } },
            vertexShader,
            fragmentShader,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            side: THREE.DoubleSide,
        });
        const edgeMaterial = new THREE.LineBasicMaterial({ color, transparent: true, opacity: .75, blending: THREE.AdditiveBlending, depthWrite: false });

        const group = new THREE.Group();
        scene.add(group);

        const addPart = (geometry, x, y, z, rx = 0) => {
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(x, y, z);
            mesh.rotation.x = rx;
            group.add(mesh);
            const edges = new THREE.LineSegments(new THREE.EdgesGeometry(geometry, 20), edgeMaterial);
            edges.position.copy(mesh.position);
            edges.rotation.copy(mesh.rotation);
            group.add(edges);
        };

        let disposed = false;
        if (model) {
            new STLLoader().load(
                `${process.env.PUBLIC_URL}/galleries/${model}`,
                (geometry) => {
                    if (disposed) return;
                    // centre the model on the rotation axis; the viewer is Y-up, most CAD exports are Z-up
                    geometry.center();
                    if (modelUp === "z") geometry.rotateX(-Math.PI / 2);
                    else if (modelUp === "x") geometry.rotateZ(Math.PI / 2);

                    // scale so it fits inside the projector ring and under the height limit
                    geometry.computeBoundingBox();
                    const height = geometry.boundingBox.max.y - geometry.boundingBox.min.y;
                    const position = geometry.attributes.position;
                    let radius = 0;
                    for (let i = 0; i < position.count; i++) {
                        radius = Math.max(radius, Math.hypot(position.getX(i), position.getZ(i)));
                    }
                    const scale = Math.min(MAX_MODEL_RADIUS / radius, MAX_MODEL_HEIGHT / height);
                    geometry.scale(scale, scale, scale);

                    // stand it on the base
                    geometry.computeBoundingBox();
                    geometry.translate(0, -geometry.boundingBox.min.y, 0);
                    bounds = { radius: radius * scale, height: height * scale };
                    fitCamera();

                    group.add(new THREE.Mesh(geometry, material));
                    group.add(new THREE.LineSegments(new THREE.EdgesGeometry(geometry, 30), edgeMaterial));
                },
                undefined,
                () => {
                    if (!disposed) buildVehicle(addPart);
                }
            );
        } else {
            buildVehicle(addPart);
        }

        // projector base: two rings and a tick scale
        const base = new THREE.Group();
        [1.55, 1.7].forEach((r) => base.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(circlePoints(r, 0)), edgeMaterial)));
        const ticks = [];
        for (let i = 0; i < 72; i++) {
            const a = (i / 72) * Math.PI * 2, r1 = 1.7, r2 = i % 6 ? 1.76 : 1.84;
            ticks.push(new THREE.Vector3(Math.cos(a) * r1, 0, Math.sin(a) * r1), new THREE.Vector3(Math.cos(a) * r2, 0, Math.sin(a) * r2));
        }
        base.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(ticks), edgeMaterial));
        scene.add(base);

        const fit = () => {
            const w = host.clientWidth, h = host.clientHeight;
            if (!w || !h) return;
            renderer.setSize(w, h, false);
            camera.aspect = w / h;
            fitCamera();
        };
        const resizeObserver = new ResizeObserver(fit);
        resizeObserver.observe(host);
        fit();

        // drag to rotate, with a little momentum
        let yaw = .6, velocity = 0, dragging = false, lastX = 0;
        const onDown = (e) => { dragging = true; lastX = e.clientX; canvas.setPointerCapture(e.pointerId); };
        const onMove = (e) => {
            if (!dragging) return;
            const dx = e.clientX - lastX;
            lastX = e.clientX;
            yaw += dx * .01;
            velocity = dx * .01;
        };
        const onUp = () => { dragging = false; };
        canvas.addEventListener("pointerdown", onDown);
        canvas.addEventListener("pointermove", onMove);
        canvas.addEventListener("pointerup", onUp);
        canvas.addEventListener("pointercancel", onUp);

        const start = performance.now();
        let frame;
        const loop = (now) => {
            frame = requestAnimationFrame(loop);
            if (!dragging) {
                if (Math.abs(velocity) > .0005) {
                    yaw += velocity;
                    velocity *= .94;
                } else if (!reduceMotion) {
                    yaw += .0035;
                }
            }
            group.rotation.y = yaw;
            material.uniforms.uTime.value = (now - start) / 1000;
            renderer.render(scene, camera);
            if (yawRef.current) {
                const deg = (((yaw * 180) / Math.PI) % 360 + 360) % 360;
                yawRef.current.textContent = `YAW ${pad(Math.round(deg), 3)}°`;
            }
        };
        frame = requestAnimationFrame(loop);

        return () => {
            disposed = true;
            cancelAnimationFrame(frame);
            resizeObserver.disconnect();
            canvas.removeEventListener("pointerdown", onDown);
            canvas.removeEventListener("pointermove", onMove);
            canvas.removeEventListener("pointerup", onUp);
            canvas.removeEventListener("pointercancel", onUp);
            scene.traverse((object) => object.geometry && object.geometry.dispose());
            material.dispose();
            edgeMaterial.dispose();
            renderer.dispose();
            renderer.forceContextLoss();
            canvas.remove();
        };
    }, [accent, model, modelUp]);

    return (
        <div className="viewer" ref={hostRef}>
            <div className="v-ui t mono"><span><b>●</b> Live model</span><span ref={yawRef}>YAW 000°</span></div>
            <div className="v-ui b mono"><span>Drag to rotate</span><span>{model ? model.split("/").pop() : "Placeholder geometry"}</span></div>
            {error && <div className="v-msg mono">{error}</div>}
        </div>
    );
};

export default HoloViewer;
