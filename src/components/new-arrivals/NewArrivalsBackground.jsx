
import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { useTheme } from "../../context/ThemeContext";

const NewArrivalsBackground = ({ theme: propTheme }) => {
  const mountRef = useRef(null);
  
  // Use context if available, otherwise use prop
  const themeContext = useTheme();
  const theme = propTheme || (themeContext?.theme || 'light');

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

    // Theme-based colors
    const colors = theme === 'dark' 
      ? [
          0x7c3aed, // Purple 700
          0x2563eb, // Blue 600
          0x059669, // Emerald 600
          0xd97706, // Amber 600
          0xdc2626, // Red 600
          0xdb2777, // Pink 600
          0x4f46e5, // Indigo 600
          0x0891b2  // Cyan 600
        ]
      : [
          0x8b5cf6, // Purple 500
          0x3b82f6, // Blue 500
          0x10b981, // Emerald 500
          0xf59e0b, // Amber 500
          0xef4444, // Red 500
          0xec4899, // Pink 500
          0x6366f1, // Indigo 500
          0x06b6d4  // Cyan 500
        ];

    // Create floating new arrival product shapes
    const geometries = [
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.SphereGeometry(0.8, 32, 32),
      new THREE.ConeGeometry(0.8, 1.5, 32),
      new THREE.TorusGeometry(0.8, 0.3, 16, 100)
    ];

    const shapes = [];
    const shapeCount = theme === 'dark' ? 16 : 12; // More shapes in dark mode

    for (let i = 0; i < shapeCount; i++) {
      const geometry = geometries[i % geometries.length];
      const color = colors[i % colors.length];
      
      const material = new THREE.MeshStandardMaterial({
        color: color,
        emissive: color,
        emissiveIntensity: theme === 'dark' ? 0.25 : 0.15, // More emissive in dark mode
        metalness: theme === 'dark' ? 0.6 : 0.4, // More metallic in dark mode
        roughness: theme === 'dark' ? 0.2 : 0.3, // Smoother in dark mode
        transparent: true,
        opacity: theme === 'dark' ? 0.8 : 0.7 // More visible in dark mode
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
    const particlesCount = theme === 'dark' ? 1500 : 1200; // More particles in dark mode
    const posArray = new Float32Array(particlesCount * 3);
    const colorArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 35;
      posArray[i + 1] = (Math.random() - 0.5) * 25;
      posArray[i + 2] = (Math.random() - 0.5) * 35;

      const color = new THREE.Color();
      const hue = theme === 'dark' 
        ? 0.6 + Math.random() * 0.3  // Cooler colors in dark mode
        : 0.7 + Math.random() * 0.25; // Warmer colors in light mode
      
      const saturation = theme === 'dark' ? 0.6 : 0.8;
      const lightness = theme === 'dark' 
        ? 0.5 + Math.random() * 0.4  // Brighter in dark mode
        : 0.6 + Math.random() * 0.3;  // Softer in light mode
      
      color.setHSL(hue, saturation, lightness);
      colorArray[i] = color.r;
      colorArray[i + 1] = color.g;
      colorArray[i + 2] = color.b;
    }

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute("color", new THREE.BufferAttribute(colorArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: theme === 'dark' ? 0.02 : 0.025, // Smaller particles in dark mode
      vertexColors: true,
      transparent: true,
      opacity: theme === 'dark' ? 0.7 : 0.6, // More visible in dark mode
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Lighting based on theme
    const ambientIntensity = theme === 'dark' ? 0.7 : 0.5;
    const directionalIntensity = theme === 'dark' ? 1.2 : 0.8;
    const pointLightIntensity = theme === 'dark' ? 0.8 : 0.6;
    
    const ambientLight = new THREE.AmbientLight(0xffffff, ambientIntensity);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, directionalIntensity);
    directionalLight.position.set(10, 10, 5);
    scene.add(directionalLight);

    const pointLightColor = theme === 'dark' ? 0x7c3aed : 0x8b5cf6;
    const pointLight = new THREE.PointLight(pointLightColor, pointLightIntensity, 30);
    pointLight.position.set(0, 5, 10);
    scene.add(pointLight);

    // Add a second point light for dark mode
    if (theme === 'dark') {
      const pointLight2 = new THREE.PointLight(0x059669, 0.5, 40);
      pointLight2.position.set(-10, -5, 5);
      scene.add(pointLight2);
    }

    camera.position.z = 25;

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      const time = Date.now() * 0.001;

      shapes.forEach((shape, i) => {
        const speedMultiplier = theme === 'dark' ? 0.8 : 1; // Slower in dark mode
        shape.rotation.x += shape.userData.rotationSpeed * speedMultiplier;
        shape.rotation.y += shape.userData.speed * 1.5 * speedMultiplier;
        shape.rotation.z += shape.userData.speed * 0.8 * speedMultiplier;
        
        // Floating animation
        const floatSpeed = theme === 'dark' ? 0.006 : 0.008;
        shape.position.y += Math.sin(time * 2 + i) * floatSpeed;
        shape.position.x += Math.cos(time * 1.5 + i) * 0.005 * speedMultiplier;
      });

      const particleRotationSpeed = theme === 'dark' ? 0.0003 : 0.0004;
      particlesMesh.rotation.y += particleRotationSpeed;
      particlesMesh.rotation.x += particleRotationSpeed * 0.375;

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
      if (mountRef.current && renderer.domElement.parentNode === mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometries.forEach(g => g.dispose());
      particlesMaterial.dispose();
    };
  }, [theme]); // Re-run effect when theme changes

  return (
    <div 
      ref={mountRef} 
      className="fixed inset-0 -z-10 transition-opacity duration-500"
      style={{ opacity: theme === 'dark' ? 0.15 : 0.1 }}
    />
  );
};

export default NewArrivalsBackground;