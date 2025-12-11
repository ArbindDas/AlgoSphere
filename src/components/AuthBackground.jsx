import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";
import React, { useState, useRef, useEffect } from "react";
// Three.js Background for Auth Pages
const AuthBackground = ({ type = "login" }) => {
  const mountRef = useRef(null);

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

    // Create floating geometric shapes
    const geometries = [
      new THREE.OctahedronGeometry(1, 0),
      new THREE.DodecahedronGeometry(1, 0),
      new THREE.IcosahedronGeometry(1, 0),
      new THREE.TorusKnotGeometry(1, 0.3, 100, 16),
    ];

    const colors =
      type === "login"
        ? [0x8b5cf6, 0x3b82f6, 0x6366f1, 0xec4899]
        : [0x10b981, 0x06b6d4, 0x8b5cf6, 0xf59e0b];

    const shapes = [];
    const shapeCount = 8;

    for (let i = 0; i < shapeCount; i++) {
      const geometry = geometries[i % geometries.length];
      const material = new THREE.MeshStandardMaterial({
        color: colors[i % colors.length],
        emissive: colors[i % colors.length],
        emissiveIntensity: 0.2,
        metalness: 0.7,
        roughness: 0.2,
        transparent: true,
        opacity: 0.6,
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
    const particlesCount = 1500;
    const posArray = new Float32Array(particlesCount * 3);
    const colorArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 40;
      posArray[i + 1] = (Math.random() - 0.5) * 30;
      posArray[i + 2] = (Math.random() - 0.5) * 40;

      const color = new THREE.Color();
      const hue =
        type === "login"
          ? 0.7 + Math.random() * 0.2
          : 0.3 + Math.random() * 0.2;
      color.setHSL(hue, 0.8, 0.6 + Math.random() * 0.3);
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
      size: 0.03,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    const particlesMesh = new THREE.Points(
      particlesGeometry,
      particlesMaterial
    );
    scene.add(particlesMesh);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 5);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(
      type === "login" ? 0x8b5cf6 : 0x10b981,
      0.5,
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

      particlesMesh.rotation.y += 0.0003;
      particlesMesh.rotation.x += 0.00015;

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
    };
  }, [type]);

  return <div ref={mountRef} className="fixed inset-0 -z-10" />;
};


export default AuthBackground;