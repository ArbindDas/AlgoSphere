

import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";
import React, { useState, useRef, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

// Three.js Background for Auth Pages with theme support
const AuthBackground = ({ type = "login" }) => {
  const mountRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Theme-based color schemes
    const getColors = () => {
      if (theme === 'dark') {
        // Dark theme colors
        return type === "login" 
          ? [0x8b5cf6, 0x3b82f6, 0x6366f1, 0xec4899] // Purple/Blue/Pink for login
          : [0x10b981, 0x06b6d4, 0x8b5cf6, 0xf59e0b]; // Green/Cyan/Purple/Amber for register
      } else {
        // Light theme colors (slightly different hues)
        return type === "login" 
          ? [0x7c3aed, 0x2563eb, 0x4f46e5, 0xdb2777] // Brighter versions for light theme
          : [0x059669, 0x0891b2, 0x7c3aed, 0xd97706]; // Brighter versions for light theme
      }
    };

    const getParticleHue = () => {
      if (theme === 'dark') {
        return type === "login" ? 0.7 : 0.3;
      } else {
        return type === "login" ? 0.65 : 0.25; // Slightly adjusted for light theme
      }
    };

    const colors = getColors();
    const baseHue = getParticleHue();

    // Create floating geometric shapes
    const geometries = [
      new THREE.OctahedronGeometry(1, 0),
      new THREE.DodecahedronGeometry(1, 0),
      new THREE.IcosahedronGeometry(1, 0),
      new THREE.TorusKnotGeometry(1, 0.3, 100, 16),
    ];

    const shapes = [];
    const shapeCount = 8;

    for (let i = 0; i < shapeCount; i++) {
      const geometry = geometries[i % geometries.length];
      const material = new THREE.MeshStandardMaterial({
        color: colors[i % colors.length],
        emissive: colors[i % colors.length],
        emissiveIntensity: theme === 'dark' ? 0.3 : 0.1, // Less emissive in light theme
        metalness: theme === 'dark' ? 0.7 : 0.5, // Less metallic in light theme
        roughness: theme === 'dark' ? 0.2 : 0.4, // More rough in light theme
        transparent: true,
        opacity: theme === 'dark' ? 0.6 : 0.4, // More transparent in light theme
      });

      const shape = new THREE.Mesh(geometry, material);

      shape.position.set(
        (Math.random() - 0.5) * 25,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 25
      );

      shape.scale.setScalar(Math.random() * 0.8 + 0.4);
      shape.userData = {
        speed: Math.random() * 0.002 + 0.001,
        rotationSpeed: Math.random() * 0.01 + 0.005,
      };

      shapes.push(shape);
      scene.add(shape);
    }

    // Create particle system
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = theme === 'dark' ? 1500 : 1200; // Fewer particles in light theme
    const posArray = new Float32Array(particlesCount * 3);
    const colorArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 40;
      posArray[i + 1] = (Math.random() - 0.5) * 30;
      posArray[i + 2] = (Math.random() - 0.5) * 40;

      const color = new THREE.Color();
      const hue = baseHue + Math.random() * 0.2;
      const saturation = theme === 'dark' ? 0.8 : 0.7; // Less saturation in light theme
      const lightness = theme === 'dark' 
        ? 0.6 + Math.random() * 0.3 
        : 0.5 + Math.random() * 0.3; // Darker in light theme
      
      color.setHSL(hue, saturation, lightness);
      colorArray[i] = color.r;
      colorArray[i + 1] = color.g;
      colorArray[i + 2] = color.b;
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3)
    );
    particlesGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(colorArray, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: theme === 'dark' ? 0.03 : 0.02, // Smaller particles in light theme
      vertexColors: true,
      transparent: true,
      opacity: theme === 'dark' ? 0.8 : 0.6, // More transparent in light theme
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    const particlesMesh = new THREE.Points(
      particlesGeometry,
      particlesMaterial
    );
    scene.add(particlesMesh);

    // Lighting - adjusted for theme
    const ambientLight = new THREE.AmbientLight(
      0xffffff, 
      theme === 'dark' ? 0.5 : 0.7 // Brighter ambient in light theme
    );
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(
      0xffffff, 
      theme === 'dark' ? 0.8 : 0.6 // Softer directional in light theme
    );
    directionalLight.position.set(10, 10, 5);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(
      type === "login" ? 0x8b5cf6 : 0x10b981,
      theme === 'dark' ? 0.5 : 0.3, // Dimmer point light in light theme
      50
    );
    pointLight.position.set(0, 5, 10);
    scene.add(pointLight);

    camera.position.z = 25;

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      const time = Date.now() * 0.001;

      shapes.forEach((shape, i) => {
        shape.rotation.x += shape.userData.rotationSpeed;
        shape.rotation.y += shape.userData.speed;
        shape.rotation.z += shape.userData.speed * 0.7;

        // Floating animation
        shape.position.y += Math.sin(time * 2 + i) * 0.01;
        shape.position.x += Math.cos(time * 1.5 + i) * 0.008;
      });

      particlesMesh.rotation.y += theme === 'dark' ? 0.0003 : 0.0002; // Slower rotation in light theme
      particlesMesh.rotation.x += theme === 'dark' ? 0.00015 : 0.0001;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      mountRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
      // Dispose geometries and materials
      geometries.forEach(geom => geom.dispose());
      shapes.forEach(shape => {
        shape.geometry.dispose();
        shape.material.dispose();
      });
      particlesGeometry.dispose();
      particlesMaterial.dispose();
    };
  }, [type, theme]); // Re-run when type or theme changes

  return <div ref={mountRef} className="fixed inset-0 -z-10" />;
};

export default AuthBackground;