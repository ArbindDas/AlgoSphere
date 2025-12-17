

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { useTheme } from '../../context/ThemeContext';

const ThreeBackground = ({ theme: propTheme }) => {
  const canvasRef = useRef(null);
  
  // Use context if available, otherwise use prop
  const themeContext = useTheme();
  const theme = propTheme || (themeContext?.theme || 'light');

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current, 
      alpha: true, 
      antialias: true 
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    camera.position.z = 8;

    const particlesCount = theme === 'dark' ? 800 : 600; // More particles in dark mode
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 25;
      positions[i + 1] = (Math.random() - 0.5) * 25;
      positions[i + 2] = (Math.random() - 0.5) * 20;

      // Theme-based colors
      if (theme === 'dark') {
        // Dark mode: Emerald/green particles
        colors[i] = 0.1 + Math.random() * 0.2;     // R: Darker
        colors[i + 1] = 0.7 + Math.random() * 0.2;  // G: Brighter green
        colors[i + 2] = 0.3 + Math.random() * 0.2;  // B: Moderate
      } else {
        // Light mode: Softer green particles
        colors[i] = 0.1 + Math.random() * 0.3;
        colors[i + 1] = 0.6 + Math.random() * 0.3;
        colors[i + 2] = 0.4 + Math.random() * 0.3;
      }
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: theme === 'dark' ? 0.04 : 0.05, // Smaller in dark mode
      vertexColors: true,
      transparent: true,
      opacity: theme === 'dark' ? 0.3 : 0.5, // Less opacity in dark mode
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    });

    const particleSystem = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particleSystem);

    // Add some larger glowing particles for dark mode
    if (theme === 'dark') {
      const largeParticlesCount = 30;
      const largePositions = new Float32Array(largeParticlesCount * 3);
      const largeColors = new Float32Array(largeParticlesCount * 3);

      for (let i = 0; i < largeParticlesCount * 3; i += 3) {
        largePositions[i] = (Math.random() - 0.5) * 30;
        largePositions[i + 1] = (Math.random() - 0.5) * 30;
        largePositions[i + 2] = (Math.random() - 0.5) * 25;

        // Brighter green for large particles
        largeColors[i] = 0.2;
        largeColors[i + 1] = 0.9 + Math.random() * 0.1;
        largeColors[i + 2] = 0.4;
      }

      const largeParticlesGeometry = new THREE.BufferGeometry();
      largeParticlesGeometry.setAttribute('position', new THREE.BufferAttribute(largePositions, 3));
      largeParticlesGeometry.setAttribute('color', new THREE.BufferAttribute(largeColors, 3));

      const largeParticlesMaterial = new THREE.PointsMaterial({
        size: 0.1,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true
      });

      const largeParticleSystem = new THREE.Points(largeParticlesGeometry, largeParticlesMaterial);
      scene.add(largeParticleSystem);
    }

    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      particleSystem.rotation.y += theme === 'dark' ? 0.0008 : 0.001; // Slower in dark mode
      particleSystem.rotation.x += theme === 'dark' ? 0.0003 : 0.0005; // Slower in dark mode
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
    };
  }, [theme]); // Re-run effect when theme changes

  return (
    <canvas 
      ref={canvasRef} 
      className={`fixed inset-0 pointer-events-none transition-opacity duration-500 ${
        theme === 'dark' ? 'opacity-15' : 'opacity-20'
      }`} 
    />
  );
};

export default ThreeBackground;