import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { VideoTexture } from 'three';

const Monitors = () => {
  const mountRef = useRef(null);

  // Individual CRT refs
  const crtRefs = useRef({});
  const navigate = useNavigate();

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, -1, 20);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    mountRef.current.appendChild(renderer.domElement);

    const textureLoader = new THREE.TextureLoader();
    const screenTexture = textureLoader.load('/models/textures/testCard.png');

    const createVideoMaterial = (src) => {
      const video = document.createElement('video');
      video.src = src;
      video.loop = true;
      video.muted = true;
      video.playsInline = true;
      video.play();
      const texture = new VideoTexture(video);
      return new THREE.MeshBasicMaterial({ map: texture });
    };

    const crt1VideoMaterial = createVideoMaterial('/models/textures/no-signal.mp4');
    const crt2VideoMaterial = createVideoMaterial('/models/textures/no-signal.mp4');
    const crt3VideoMaterial = createVideoMaterial('/models/textures/no-signal.mp4');
    const crt4VideoMaterial = createVideoMaterial('/models/textures/no-signal.mp4');
    const staticNoiseVideoMaterial = createVideoMaterial('/models/textures/static.mp4');

    const staticMaterial = new THREE.MeshBasicMaterial({ map: screenTexture });

    const loader = new GLTFLoader();
    const crtStack = new THREE.Group();
    const pivotOffset = 5;

    // Raycaster and mouse for click detection
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let currentlyHovered = null;

    const loadCRT = (name, path, scale, position, rotation, screenMaterial, targetMeshIndex, route) => {
      loader.load(path, (gltf) => {
        const crt = gltf.scene;
        crt.name = name; // Important for identification
        crt.scale.set(...scale);
        crt.position.set(...position.map((p, i) => (i === 1 ? p - pivotOffset : p)));
        crt.rotation.set(...rotation);

        crt.userData = {
          screenMesh: null,
          originalMaterial: screenMaterial,
        };
        
        let meshIndex = 0;
        crt.traverse((child) => {
          if (child.isMesh) {
            meshIndex++;
            if (meshIndex === targetMeshIndex) {
              child.material = screenMaterial;
              crt.userData.screenMesh = child;
            }
          }
        });

        crtStack.add(crt);

        // Store ref
        crtRefs.current[name] = crt;
      });
    };

    // Load CRTs
    loadCRT('crt1', '/models/crt1_.glb', [1, 1, 1], [0, 0, 0], [0, 3.3, 0], crt1VideoMaterial, 6, '/hackathons');
    loadCRT('crt2', '/models/crt1_.glb', [0.9, 0.9, 0.9], [0.3, 3.9, 0], [0, 3.04, 0], crt2VideoMaterial, 6, '/ootm');
    loadCRT('crt3', '/models/crt2_.glb', [1, 1, 1], [0, 6.75, 0.2], [0, 3.34, 0], staticMaterial, 9, '/projects');
    loadCRT('crt4', '/models/crt3_.glb', [1, 1, 1], [-0.4, 9.1, 0.1], [0, 3.04, 0], crt4VideoMaterial, 4, '/skills');    

    crtStack.rotation.set(0, 0, 0);
    scene.add(crtStack);

    // Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 1));
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Mouse Move for CRT stack rotation
    const handleMouseMove = (event) => {
      const rect = mountRef.current.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(crtStack.children, true);
    
      if (intersects.length > 0) {
        const intersected = intersects[0].object;
    
        // Traverse up to CRT group
        let crt = intersected;
        while (crt.parent && crt.parent !== crtStack) {
          crt = crt.parent;
        }
    
        if (crt.userData?.screenMesh && currentlyHovered !== crt.name) {
          // Reset previous
          if (currentlyHovered && crtRefs.current[currentlyHovered]) {
            const oldCrt = crtRefs.current[currentlyHovered];
            const oldScreen = oldCrt.userData.screenMesh;
            if (oldScreen && oldCrt.userData.originalMaterial) {
              oldScreen.material = oldCrt.userData.originalMaterial;
            }
          }
    
          // Apply hover material
          crt.userData.screenMesh.material = staticNoiseVideoMaterial;
          currentlyHovered = crt.name;
        }
      } else {
        // Clear hover if nothing is intersected
        if (currentlyHovered && crtRefs.current[currentlyHovered]) {
          const oldCrt = crtRefs.current[currentlyHovered];
          const oldScreen = oldCrt.userData.screenMesh;
          if (oldScreen && oldCrt.userData.originalMaterial) {
            oldScreen.material = oldCrt.userData.originalMaterial;
          }
        }
        currentlyHovered = null;
      }
    
      // Continue handling CRT stack rotation
      const { clientX, clientY } = event;
      const windowCenterX = window.innerWidth / 2;
      const windowCenterY = window.innerHeight / 2;
    
      const rotationY = (clientX - windowCenterX) / windowCenterX;
      const rotationX = (clientY - windowCenterY) / windowCenterY;
    
      crtStack.rotation.y = rotationY * 0.5;
      crtStack.rotation.x = rotationX * 0.2;
    };
    

    // Mouse Click for CRT detection
    const handleMouseClick = (event) => {
      const rect = mountRef.current.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(crtStack.children, true);
    
      if (intersects.length > 0) {
        const clicked = intersects[0].object;
    
        let crt = clicked;
        while (crt.parent && crt.parent !== crtStack) {
          crt = crt.parent;
        }
    
        console.log(`Clicked on ${crt.name}`);
        navigate(crt.userData.route); // Navigate to route
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleMouseClick);

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleMouseClick);

      if (mountRef.current?.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100vw', height: '100vh' }} />;
};

export default Monitors;
