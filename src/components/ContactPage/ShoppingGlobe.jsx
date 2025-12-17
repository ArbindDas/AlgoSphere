import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const ShoppingGlobe = () => {
  const globeCanvasRef = useRef(null);

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

    const globeGeometry = new THREE.SphereGeometry(2, 64, 64);
    const globeMaterial = new THREE.MeshPhongMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.8,
      shininess: 100,
      specular: 0xffffff
    });
    
    const globe = new THREE.Mesh(globeGeometry, globeMaterial);
    scene.add(globe);

    const ringGeometry = new THREE.TorusGeometry(2.5, 0.02, 16, 100);
    const ringMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x34d399,
      transparent: true,
      opacity: 0.6
    });
    
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = Math.PI / 2;
    scene.add(ring);

    const pointsCount = 15;
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
      size: 0.12,
      color: 0xfbbf24,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    const points = new THREE.Points(pointsGeometry, pointsMaterial);
    scene.add(points);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0x10b981, 1, 100);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      globe.rotation.y += 0.002;
      ring.rotation.z += 0.001;
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
  }, []);

  return (
    <div className="fixed right-10 bottom-10 lg:right-20 lg:bottom-20 z-0">
      <canvas ref={globeCanvasRef} className="opacity-15 hover:opacity-25 transition-opacity" />
    </div>
  );
};

export default ShoppingGlobe;