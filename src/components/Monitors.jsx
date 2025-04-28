import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { VideoTexture } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

// import '../css/Monitors.css';

const Monitors = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(50, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000);
        let pivot = 5;
        camera.position.y = -1;
        camera.position.z = 20;
        // camera.position.y = 10;

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
        mountRef.current.appendChild(renderer.domElement);

        const textureLoader = new THREE.TextureLoader();
        const screenTexture = textureLoader.load('/models/textures/testCard.png');
        
        const video = document.createElement('video');
        video.src = '/models/textures/no-signal.mp4';  // your video file
        video.loop = true;
        video.muted = true;
        video.play();

        const videoTexture = new VideoTexture(video);
        let crt1Material = new THREE.MeshBasicMaterial({ map: videoTexture });


        const loader = new GLTFLoader();
        let crt1;
        let crt2;
        let crt3;
        let crt4;

        const crtStack = new THREE.Group();

        loader.load('/models/crt1_.glb', (gltf) => {
            crt1 = gltf.scene;
            crt1.scale.set(1, 1, 1);
            crt1.position.set(0, -pivot, 0);    // ensure it's centered
            crt1.rotation.set(0, 3.3, 0);    // ensure it's centered
            crtStack.add(crt1);

            let i = 0;
            crt1.traverse((child) => {
                if (child.isMesh) {
                    i++;
                    if (i == 6) {
                        child.material = crt1Material;
                    }
                }
            });

            const planeGeometry = new THREE.PlaneGeometry(2, 1.5); // Adjust size
            const planeMaterial = new THREE.MeshBasicMaterial({ map: screenTexture });
            const screenPlane = new THREE.Mesh(planeGeometry, planeMaterial);
            screenPlane.position.set(0, 0, 0.1); // Slightly in front of CRT screen
            crt1.add(screenPlane);
        });
        loader.load('/models/crt1_.glb', (gltf) => {
            crt2 = gltf.scene;
            crt2.scale.set(.9, .9, .9);
            crt2.position.set(0.3, 3.9-pivot, 0);    // ensure it's centered
            crt2.rotation.set(0, 3.14-0.1, 0);    // ensure it's centered
            crtStack.add(crt2);
            
            let i = 0;
            crt2.traverse((child) => {
                if (child.isMesh) {
                    i++;
                    if (i == 6) {
                        child.material = new THREE.MeshBasicMaterial({ map: screenTexture });
                    }
                }
            });
        });
        loader.load('/models/crt2_.glb', (gltf) => {
            crt3 = gltf.scene;
            crt3.scale.set(1, 1, 1);
            crt3.position.set(0, 6.75-pivot, 0.2);    // ensure it's centered
            crt3.rotation.set(0, 3.14+0.2, 0);    // ensure it's centered
            crtStack.add(crt3);
            
            let i = 0;
            crt3.traverse((child) => {
                if (child.isMesh) {
                    i++;
                    if (i == 9) {
                        child.material = crt1Material;
                    }
                }
            });
        });
        loader.load('/models/crt3_.glb', (gltf) => {
            crt4 = gltf.scene;
            crt4.scale.set(1, 1, 1);
            crt4.position.set(-.4, 9.2-pivot, 0.1);    // ensure it's centered
            crt4.rotation.set(0, 3.14-.1, 0);    // ensure it's centered
            crtStack.add(crt4);
            
            let i = 0;
            crt4.traverse((child) => {
                if (child.isMesh) {
                    i++;
                    if (i == 4) {
                        child.material = new THREE.MeshBasicMaterial({ map: screenTexture });
                    }
                }
            });
        });

        crtStack.rotation.set(0, 0, 0);    // ensure it's centered
        scene.add(crtStack);

        const ambientLight = new THREE.AmbientLight(0xffffff, 1);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);

        const handleMouseMove = (event) => {
            const { clientX, clientY } = event;
            const windowCenterX = window.innerWidth / 2;
            const windowCenterY = window.innerHeight / 2;
        
            const rotationY = (clientX - windowCenterX) / windowCenterX; // -1 to +1
            const rotationX = (clientY - windowCenterY) / windowCenterY; // -1 to +1
        
            crtStack.rotation.y = rotationY * 0.5; // adjust multiplier to control sensitivity
            crtStack.rotation.x = rotationX * 0.2;
        };
        
        window.addEventListener('mousemove', handleMouseMove);
        
        const animate = () => {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
          };
        animate();

        
        // Cleanup on unmount
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (mountRef.current && renderer.domElement.parentNode === mountRef.current) {
                mountRef.current.removeChild(renderer.domElement);
            }
        };
      }, []);
    
    return (
        <div ref={mountRef} style={{ width: '100vw', height: '100vh' }} />
    );
};

export default Monitors;