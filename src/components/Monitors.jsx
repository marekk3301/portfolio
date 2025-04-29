import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const Monitors = () => {
  const mountRef = useRef(null);
  const crtRefs = useRef({});
  const navigate = useNavigate();

  // Configuration for each CRT monitor
  const crtConfigs = [
    {
      name: 'crt1',
      path: '/models/crt1_.glb',
      scale: [1, 1, 1],
      position: [0, 0, 0],
      rotation: [0, 3.3, 0],
      targetMeshIndex: 6,
      route: '/hackathons',
      videoSrc: '/models/textures/no-signal.mp4'
    },
    {
      name: 'crt2',
      path: '/models/crt1_.glb',
      scale: [0.9, 0.9, 0.9],
      position: [0.3, 3.9, 0],
      rotation: [0, 3.04, 0],
      targetMeshIndex: 6,
      route: '/ootm',
      videoSrc: '/models/textures/no-signal.mp4'
    },
    {
      name: 'crt3',
      path: '/models/crt2_.glb',
      scale: [1, 1, 1],
      position: [0, 6.75, 0.2],
      rotation: [0, 3.34, 0],
      targetMeshIndex: 9,
      route: '/projects',
      videoSrc: null // Uses static texture
    },
    {
      name: 'crt4',
      path: '/models/crt3_.glb',
      scale: [1, 1, 1],
      position: [-0.4, 9.1, 0.1],
      rotation: [0, 3.04, 0],
      targetMeshIndex: 4,
      route: '/skills',
      videoSrc: '/models/textures/no-signal.mp4'
    }
  ];

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

    // Create video materials
    const createVideoMaterial = (src) => {
      if (!src) {
        const texture = new THREE.TextureLoader().load('/models/textures/testCard.png');
        return new THREE.MeshBasicMaterial({ map: texture });
      }

      const video = document.createElement('video');
      video.src = src;
      video.loop = true;
      video.muted = true;
      video.playsInline = true;
      video.play();
      return new THREE.MeshBasicMaterial({ map: new THREE.VideoTexture(video) });
    };

    // Create static noise material
    const staticNoiseVideoMaterial = createVideoMaterial('/models/textures/static.mp4');

    // Track all loaded CRTs
    const loadedCRTs = [];
    let allCRTsLoaded = false;

    // Load CRT models
    const loader = new GLTFLoader();
    const crtStack = new THREE.Group();
    const pivotOffset = 5;

    const loadCRT = (config) => {
      const screenMaterial = createVideoMaterial(config.videoSrc);
      
      loader.load(config.path, (gltf) => {
        const crt = gltf.scene;
        crt.name = config.name;
        crt.scale.set(...config.scale);
        crt.position.set(...config.position.map((p, i) => (i === 1 ? p - pivotOffset : p)));
        crt.rotation.set(...config.rotation);

        crt.userData = {
          screenMesh: null,
          originalMaterial: screenMaterial,
          route: config.route
        };
        
        let meshIndex = 0;
        crt.traverse((child) => {
          if (child.isMesh) {
            meshIndex++;
            if (meshIndex === config.targetMeshIndex) {
              child.material = screenMaterial;
              crt.userData.screenMesh = child;
            }
          }
        });

        crtStack.add(crt);
        crtRefs.current[config.name] = crt;
        loadedCRTs.push(crt);

        // Check if all CRTs are loaded
        if (loadedCRTs.length === crtConfigs.length) {
          allCRTsLoaded = true;
        }
      });
    };

    // Load all CRTs from config
    crtConfigs.forEach(loadCRT);
    crtStack.rotation.set(0, 0, 0);
    scene.add(crtStack);

    // Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 1));
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Interaction handlers
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let currentlyHovered = null;

    const applyHoverEffect = (hoveredCrt) => {
      if (!allCRTsLoaded) return;

      // First reset all to original
      loadedCRTs.forEach(crt => {
        if (crt.userData?.screenMesh && crt.userData.originalMaterial) {
          crt.userData.screenMesh.material = crt.userData.originalMaterial;
        }
      });

      // Then apply static to all except hovered
      if (hoveredCrt) {
        loadedCRTs.forEach(crt => {
          if (crt !== hoveredCrt && crt.userData?.screenMesh) {
            crt.userData.screenMesh.material = staticNoiseVideoMaterial;
          }
        });
      }

      currentlyHovered = hoveredCrt?.name || null;
    };

    const handleMouseMove = (event) => {
      const rect = mountRef.current.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(crtStack.children, true);
    
      if (intersects.length > 0) {
        const intersected = intersects[0].object;
        let crt = intersected;
        
        // Find the parent CRT group
        while (crt.parent && crt.parent !== crtStack) {
          crt = crt.parent;
        }
    
        if (crt.userData?.screenMesh && currentlyHovered !== crt.name) {
          applyHoverEffect(crt);
        }
      } else {
        applyHoverEffect(null);
      }
    
      // Handle CRT stack rotation
      const { clientX, clientY } = event;
      const windowCenterX = window.innerWidth / 2;
      const windowCenterY = window.innerHeight / 2;
    
      crtStack.rotation.y = ((clientX - windowCenterX) / windowCenterX) * 0.5;
      crtStack.rotation.x = ((clientY - windowCenterY) / windowCenterY) * 0.2;
    };

    const handleMouseClick = (event) => {
      const rect = mountRef.current.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(crtStack.children, true);
    
      if (intersects.length > 0) {
        let clicked = intersects[0].object;
        
        // Find the parent CRT group
        while (clicked.parent && clicked.parent !== crtStack) {
          clicked = clicked.parent;
        }
    
        if (clicked.userData?.route) {
          navigate(clicked.userData.route);
        }
      }
    };

    // Event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleMouseClick);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleMouseClick);

      if (mountRef.current?.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, [navigate]);

  return <div ref={mountRef} style={{ width: '100vw', height: '100vh' }} />;
};

export default Monitors;