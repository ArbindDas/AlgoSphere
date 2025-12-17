
// // components/HeroBackground.jsx
// import React, { useRef, useEffect } from "react";
// import * as THREE from "three";

// const HeroBackground = () => {
//   const mountRef = useRef(null);
//   const particlesRef = useRef();
//   const shapesRef = useRef([]);

//   useEffect(() => {
//     if (!mountRef.current) return;

//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//     const renderer = new THREE.WebGLRenderer({
//       alpha: true,
//       antialias: true,
//       powerPreference: "high-performance"
//     });

//     renderer.setSize(window.innerWidth, window.innerHeight);
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
//     mountRef.current.appendChild(renderer.domElement);

//     // Create floating shopping-related shapes
//     const geometries = [
//       new THREE.BoxGeometry(1, 1, 1), // Box
//       new THREE.SphereGeometry(1, 32, 32), // Sphere
//       new THREE.ConeGeometry(1, 2, 32), // Cone
//       new THREE.CylinderGeometry(1, 1, 2, 32) // Cylinder
//     ];

//     const colors = [0x3b82f6, 0x10b981, 0x8b5cf6, 0xec4899, 0xf59e0b];

//     for (let i = 0; i < 8; i++) {
//       const geometry = geometries[Math.floor(Math.random() * geometries.length)];
//       const material = new THREE.MeshStandardMaterial({
//         color: colors[Math.floor(Math.random() * colors.length)],
//         emissive: 0x222222,
//         emissiveIntensity: 0.1,
//         metalness: 0.3,
//         roughness: 0.4,
//         transparent: true,
//         opacity: 0.6
//       });

//       const shape = new THREE.Mesh(geometry, material);
//       shape.position.set(
//         (Math.random() - 0.5) * 30,
//         (Math.random() - 0.5) * 30,
//         (Math.random() - 0.5) * 30
//       );
//       shape.scale.setScalar(Math.random() * 0.4 + 0.2);
      
//       shape.userData = {
//         speed: Math.random() * 0.002 + 0.001,
//         rotationSpeed: Math.random() * 0.01 + 0.005
//       };
      
//       scene.add(shape);
//       shapesRef.current.push(shape);
//     }

//     // Particles
//     const particlesGeometry = new THREE.BufferGeometry();
//     const particlesCount = 2000;
//     const posArray = new Float32Array(particlesCount * 3);
//     const colorArray = new Float32Array(particlesCount * 3);

//     for (let i = 0; i < particlesCount * 3; i += 3) {
//       posArray[i] = (Math.random() - 0.5) * 60;
//       posArray[i + 1] = (Math.random() - 0.5) * 60;
//       posArray[i + 2] = (Math.random() - 0.5) * 60;

//       const color = new THREE.Color();
//       const hue = 0.6 + Math.random() * 0.3; // Blue to purple range
//       color.setHSL(hue, 0.7, 0.5 + Math.random() * 0.3);
//       colorArray[i] = color.r;
//       colorArray[i + 1] = color.g;
//       colorArray[i + 2] = color.b;
//     }

//     particlesGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3));
//     particlesGeometry.setAttribute("color", new THREE.BufferAttribute(colorArray, 3));

//     const particlesMaterial = new THREE.PointsMaterial({
//       size: 0.02,
//       vertexColors: true,
//       transparent: true,
//       opacity: 0.5,
//       blending: THREE.AdditiveBlending,
//       sizeAttenuation: true
//     });

//     const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
//     particlesRef.current = particlesMesh;
//     scene.add(particlesMesh);

//     // Lights
//     const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
//     scene.add(ambientLight);

//     const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
//     directionalLight.position.set(5, 5, 5);
//     scene.add(directionalLight);

//     camera.position.z = 25;

//     // Animation
//     const animate = () => {
//       requestAnimationFrame(animate);

//       shapesRef.current.forEach(shape => {
//         shape.rotation.x += shape.userData.rotationSpeed;
//         shape.rotation.y += shape.userData.speed;
//         shape.position.y += Math.sin(Date.now() * shape.userData.speed * 1000) * 0.01;
//       });

//       if (particlesRef.current) {
//         particlesRef.current.rotation.y += 0.0005;
//         particlesRef.current.rotation.x += 0.0002;
//       }

//       renderer.render(scene, camera);
//     };

//     animate();

//     // Handle resize
//     const handleResize = () => {
//       camera.aspect = window.innerWidth / window.innerHeight;
//       camera.updateProjectionMatrix();
//       renderer.setSize(window.innerWidth, window.innerHeight);
//     };

//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//       mountRef.current?.removeChild(renderer.domElement);
//       renderer.dispose();
//     };
//   }, []); // ← Only one useEffect

//   return <div ref={mountRef} className="fixed inset-0 -z-10" />;
// };

// export default HeroBackground;


// components/HeroBackground.jsx
import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const HeroBackground = () => {
  const mountRef = useRef(null);
  const particlesRef = useRef();
  const shapesRef = useRef([]);

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

    // Create floating shopping-related shapes
    const geometries = [
      new THREE.BoxGeometry(1, 1, 1), // Box
      new THREE.SphereGeometry(1, 32, 32), // Sphere
      new THREE.ConeGeometry(1, 2, 32), // Cone
      new THREE.CylinderGeometry(1, 1, 2, 32) // Cylinder
    ];

    const colors = [0x3b82f6, 0x10b981, 0x8b5cf6, 0xec4899, 0xf59e0b];

    for (let i = 0; i < 8; i++) {
      const geometry = geometries[Math.floor(Math.random() * geometries.length)];
      const material = new THREE.MeshStandardMaterial({
        color: colors[Math.floor(Math.random() * colors.length)],
        emissive: 0x222222,
        emissiveIntensity: 0.1,
        metalness: 0.3,
        roughness: 0.4,
        transparent: true,
        opacity: 0.6
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
    const particlesCount = 2000;
    const posArray = new Float32Array(particlesCount * 3);
    const colorArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 60;
      posArray[i + 1] = (Math.random() - 0.5) * 60;
      posArray[i + 2] = (Math.random() - 0.5) * 60;

      const color = new THREE.Color();
      const hue = 0.6 + Math.random() * 0.3; // Blue to purple range
      color.setHSL(hue, 0.7, 0.5 + Math.random() * 0.3);
      colorArray[i] = color.r;
      colorArray[i + 1] = color.g;
      colorArray[i + 2] = color.b;
    }

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute("color", new THREE.BufferAttribute(colorArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      vertexColors: true,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    particlesRef.current = particlesMesh;
    scene.add(particlesMesh);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
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
        particlesRef.current.rotation.y += 0.0005;
        particlesRef.current.rotation.x += 0.0002;
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

    return () => {
      window.removeEventListener("resize", handleResize);
      if (mountRef.current && renderer.domElement.parentNode === mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="fixed inset-0 -z-10" />;
};

export default HeroBackground;