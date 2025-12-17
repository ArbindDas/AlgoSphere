

import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { useTheme } from "../context/ThemeContext";

const HeroBackground = () => {
  const mountRef = useRef(null);
  const particlesRef = useRef();
  const shapesRef = useRef([]);
  const { theme } = useTheme();

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance"
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Theme-based color palettes
    const getColors = () => {
      if (theme === 'dark') {
        // Dark theme colors - more vibrant
        return [0x3b82f6, 0x10b981, 0x8b5cf6, 0xec4899, 0xf59e0b];
      } else {
        // Light theme colors - softer, more pastel
        return [0x60a5fa, 0x34d399, 0xa78bfa, 0xf472b6, 0xfbbf24];
      }
    };

    const getParticleHue = () => {
      if (theme === 'dark') {
        return 0.6; // Blue to purple range for dark theme
      } else {
        return 0.55; // Slightly different hue for light theme
      }
    };

    const colors = getColors();
    const particleBaseHue = getParticleHue();

    // Create floating shopping-related shapes
    const geometries = [
      new THREE.BoxGeometry(1, 1, 1), // Box
      new THREE.SphereGeometry(1, 32, 32), // Sphere
      new THREE.ConeGeometry(1, 2, 32), // Cone
      new THREE.CylinderGeometry(1, 1, 2, 32) // Cylinder
    ];

    for (let i = 0; i < 8; i++) {
      const geometry = geometries[Math.floor(Math.random() * geometries.length)];
      const material = new THREE.MeshStandardMaterial({
        color: colors[Math.floor(Math.random() * colors.length)],
        emissive: theme === 'dark' ? 0x222222 : 0x444444,
        emissiveIntensity: theme === 'dark' ? 0.1 : 0.05,
        metalness: theme === 'dark' ? 0.3 : 0.2,
        roughness: theme === 'dark' ? 0.4 : 0.6,
        transparent: true,
        opacity: theme === 'dark' ? 0.6 : 0.4
      });

      const shape = new THREE.Mesh(geometry, material);
      shape.position.set(
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30
      );
      shape.scale.setScalar(Math.random() * 0.4 + 0.2);
      
      shape.userData = {
        speed: Math.random() * 0.002 + 0.001,
        rotationSpeed: Math.random() * 0.01 + 0.005
      };
      
      scene.add(shape);
      shapesRef.current.push(shape);
    }

    // Particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = theme === 'dark' ? 2000 : 1500; // Fewer particles in light theme
    const posArray = new Float32Array(particlesCount * 3);
    const colorArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 60;
      posArray[i + 1] = (Math.random() - 0.5) * 60;
      posArray[i + 2] = (Math.random() - 0.5) * 60;

      const color = new THREE.Color();
      const hue = particleBaseHue + Math.random() * 0.3;
      const saturation = theme === 'dark' ? 0.7 : 0.6; // Less saturation in light theme
      const lightness = theme === 'dark' 
        ? 0.5 + Math.random() * 0.3 
        : 0.4 + Math.random() * 0.3; // Darker in light theme
      
      color.setHSL(hue, saturation, lightness);
      colorArray[i] = color.r;
      colorArray[i + 1] = color.g;
      colorArray[i + 2] = color.b;
    }

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute("color", new THREE.BufferAttribute(colorArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: theme === 'dark' ? 0.02 : 0.015, // Smaller particles in light theme
      vertexColors: true,
      transparent: true,
      opacity: theme === 'dark' ? 0.5 : 0.4, // More transparent in light theme
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    particlesRef.current = particlesMesh;
    scene.add(particlesMesh);

    // Lights - adjusted for theme
    const ambientLight = new THREE.AmbientLight(
      0xffffff, 
      theme === 'dark' ? 0.5 : 0.7 // Brighter ambient in light theme
    );
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(
      0xffffff, 
      theme === 'dark' ? 0.8 : 0.6 // Softer directional in light theme
    );
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    camera.position.z = 25;

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      shapesRef.current.forEach(shape => {
        shape.rotation.x += shape.userData.rotationSpeed;
        shape.rotation.y += shape.userData.speed;
        shape.position.y += Math.sin(Date.now() * shape.userData.speed * 1000) * 0.01;
      });

      if (particlesRef.current) {
        particlesRef.current.rotation.y += theme === 'dark' ? 0.0005 : 0.0003; // Slower rotation in light theme
        particlesRef.current.rotation.x += theme === 'dark' ? 0.0002 : 0.0001;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup function
    const cleanup = () => {
      window.removeEventListener("resize", handleResize);
      if (mountRef.current && renderer.domElement.parentNode === mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      // Dispose geometries and materials
      geometries.forEach(geom => geom.dispose());
      shapesRef.current.forEach(shape => {
        if (shape.geometry) shape.geometry.dispose();
        if (shape.material) shape.material.dispose();
      });
      if (particlesGeometry) particlesGeometry.dispose();
      if (particlesMaterial) particlesMaterial.dispose();
      
      renderer.dispose();
      shapesRef.current = [];
    };

    return cleanup;
  }, [theme]); // Re-run when theme changes

  return <div ref={mountRef} className="fixed inset-0 -z-10" />;
};

export default HeroBackground;