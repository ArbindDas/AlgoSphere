// components/new-arrivals/NewArrivalsBackground.jsx
import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const NewArrivalsBackground = () => {
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
          powerPreference: "high-performance"
        });
    
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        mountRef.current.appendChild(renderer.domElement);
    
        // Create floating new arrival product shapes
        const geometries = [
          new THREE.BoxGeometry(1, 1, 1),
          new THREE.SphereGeometry(0.8, 32, 32),
          new THREE.ConeGeometry(0.8, 1.5, 32),
          new THREE.TorusGeometry(0.8, 0.3, 16, 100)
        ];
    
        const colors = [0x8b5cf6, 0x3b82f6, 0x10b981, 0xf59e0b, 0xef4444, 0xec4899];
    
        const shapes = [];
        const shapeCount = 12;
    
        for (let i = 0; i < shapeCount; i++) {
          const geometry = geometries[i % geometries.length];
          const material = new THREE.MeshStandardMaterial({
            color: colors[i % colors.length],
            emissive: colors[i % colors.length],
            emissiveIntensity: 0.15,
            metalness: 0.4,
            roughness: 0.3,
            transparent: true,
            opacity: 0.7
          });
    
          const shape = new THREE.Mesh(geometry, material);
          
          shape.position.set(
            (Math.random() - 0.5) * 25,
            (Math.random() - 0.5) * 15,
            (Math.random() - 0.5) * 20
          );
          
          shape.scale.setScalar(Math.random() * 0.6 + 0.3);
          shape.userData = {
            speed: Math.random() * 0.0015 + 0.0008,
            rotationSpeed: Math.random() * 0.006 + 0.003,
            floatSpeed: Math.random() * 0.001 + 0.0005
          };
          
          shapes.push(shape);
          scene.add(shape);
        }
    
        // Create floating particles
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 1200;
        const posArray = new Float32Array(particlesCount * 3);
        const colorArray = new Float32Array(particlesCount * 3);
    
        for (let i = 0; i < particlesCount * 3; i += 3) {
          posArray[i] = (Math.random() - 0.5) * 35;
          posArray[i + 1] = (Math.random() - 0.5) * 25;
          posArray[i + 2] = (Math.random() - 0.5) * 35;
    
          const color = new THREE.Color();
          const hue = 0.7 + Math.random() * 0.25;
          color.setHSL(hue, 0.8, 0.6 + Math.random() * 0.3);
          colorArray[i] = color.r;
          colorArray[i + 1] = color.g;
          colorArray[i + 2] = color.b;
        }
    
        particlesGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3));
        particlesGeometry.setAttribute("color", new THREE.BufferAttribute(colorArray, 3));
    
        const particlesMaterial = new THREE.PointsMaterial({
          size: 0.025,
          vertexColors: true,
          transparent: true,
          opacity: 0.6,
          blending: THREE.AdditiveBlending,
          sizeAttenuation: true
        });
    
        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);
    
        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);
    
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(10, 10, 5);
        scene.add(directionalLight);
    
        const pointLight = new THREE.PointLight(0x8b5cf6, 0.6, 30);
        pointLight.position.set(0, 5, 10);
        scene.add(pointLight);
    
        camera.position.z = 25;
    
        // Animation
        const animate = () => {
          requestAnimationFrame(animate);
          const time = Date.now() * 0.001;
    
          shapes.forEach((shape, i) => {
            shape.rotation.x += shape.userData.rotationSpeed;
            shape.rotation.y += shape.userData.speed * 1.5;
            shape.rotation.z += shape.userData.speed * 0.8;
            
            // Floating animation
            shape.position.y += Math.sin(time * 2 + i) * 0.008;
            shape.position.x += Math.cos(time * 1.5 + i) * 0.005;
          });
    
          particlesMesh.rotation.y += 0.0004;
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
          geometries.forEach(g => g.dispose());
          particlesMaterial.dispose();
        };
      }, []);

  return <div ref={mountRef} className="fixed inset-0 -z-10" />;
};

export default NewArrivalsBackground;