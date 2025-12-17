


import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { useTheme } from '../../context/ThemeContext';

const ShoppingGlobe = ({ theme: propTheme }) => {
  const globeCanvasRef = useRef(null);
  
  // Use context if available, otherwise use prop
  const themeContext = useTheme();
  const theme = propTheme || (themeContext?.theme || 'light');

  useEffect(() => {
    if (!globeCanvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      canvas: globeCanvasRef.current, 
      alpha: true, 
      antialias: true 
    });
    
    const globeSize = Math.min(window.innerWidth * 0.3, 400);
    renderer.setSize(globeSize, globeSize);
    camera.position.z = 5;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.5;

    // Theme-based colors
    const globeColor = theme === 'dark' ? 0x10b981 : 0x059669; // Darker green for dark mode
    const ringColor = theme === 'dark' ? 0x34d399 : 0x10b981; // Different green for ring
    const pointsColor = theme === 'dark' ? 0xfbbf24 : 0xf59e0b; // Amber/Yellow for points

    const globeGeometry = new THREE.SphereGeometry(2, 64, 64);
    const globeMaterial = new THREE.MeshPhongMaterial({
      color: globeColor,
      transparent: true,
      opacity: theme === 'dark' ? 0.9 : 0.8, // Slightly more opaque in dark mode
      shininess: theme === 'dark' ? 80 : 100, // Less shininess in dark mode
      specular: theme === 'dark' ? 0x444444 : 0xffffff // Darker specular in dark mode
    });
    
    const globe = new THREE.Mesh(globeGeometry, globeMaterial);
    scene.add(globe);

    const ringGeometry = new THREE.TorusGeometry(2.5, 0.02, 16, 100);
    const ringMaterial = new THREE.MeshBasicMaterial({ 
      color: ringColor,
      transparent: true,
      opacity: theme === 'dark' ? 0.7 : 0.6 // More visible in dark mode
    });
    
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = Math.PI / 2;
    scene.add(ring);

    const pointsCount = theme === 'dark' ? 20 : 15; // More points in dark mode
    const pointsGeometry = new THREE.BufferGeometry();
    const pointsPositions = new Float32Array(pointsCount * 3);

    for (let i = 0; i < pointsCount * 3; i += 3) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      const radius = 2.1;

      pointsPositions[i] = radius * Math.sin(phi) * Math.cos(theta);
      pointsPositions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pointsPositions[i + 2] = radius * Math.cos(phi);
    }

    pointsGeometry.setAttribute('position', new THREE.BufferAttribute(pointsPositions, 3));
    const pointsMaterial = new THREE.PointsMaterial({
      size: theme === 'dark' ? 0.15 : 0.12, // Slightly larger in dark mode
      color: pointsColor,
      transparent: true,
      opacity: theme === 'dark' ? 0.9 : 0.8, // More visible in dark mode
      blending: THREE.AdditiveBlending
    });

    const points = new THREE.Points(pointsGeometry, pointsMaterial);
    scene.add(points);

    // Adjust lighting based on theme
    const ambientLightIntensity = theme === 'dark' ? 0.4 : 0.3;
    const pointLightIntensity = theme === 'dark' ? 1.2 : 1;
    
    const ambientLight = new THREE.AmbientLight(0xffffff, ambientLightIntensity);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(globeColor, pointLightIntensity, 100);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Add subtle directional light for better definition in dark mode
    if (theme === 'dark') {
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
      directionalLight.position.set(1, 1, 1);
      scene.add(directionalLight);
    }

    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      globe.rotation.y += theme === 'dark' ? 0.0015 : 0.002; // Slower rotation in dark mode
      ring.rotation.z += theme === 'dark' ? 0.0008 : 0.001; // Slower ring rotation
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      const newGlobeSize = Math.min(window.innerWidth * 0.3, 400);
      camera.aspect = 1;
      camera.updateProjectionMatrix();
      renderer.setSize(newGlobeSize, newGlobeSize);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
    };
  }, [theme]); // Re-run effect when theme changes

  return (
    <div className="fixed right-10 bottom-10 lg:right-20 lg:bottom-20 z-0">
      <canvas 
        ref={globeCanvasRef} 
        className={`transition-all duration-300 ${
          theme === 'dark' 
            ? 'opacity-20 hover:opacity-30' 
            : 'opacity-15 hover:opacity-25'
        }`} 
      />
    </div>
  );
};

export default ShoppingGlobe;