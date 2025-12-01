import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import * as THREE from "three";
import { Sparkles, ShoppingBag, Heart, Star, Truck, Clock, Tag, ChevronRight } from "lucide-react";

// Three.js Background for New Arrivals
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

// New Arrival Product Card
const NewArrivalCard = ({ product, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -12, scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative group"
    >
      {/* Glow effect */}
      <div className={`absolute inset-0 bg-gradient-to-br ${product.gradient} rounded-3xl blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />

      {/* Main Card */}
      <div className="relative bg-white/95 backdrop-blur-xl border border-white/40 rounded-3xl p-6 shadow-2xl shadow-black/5 overflow-hidden">
        {/* NEW Badge */}
        <div className="absolute top-4 left-4 z-10">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
            className="px-4 py-1.5 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold shadow-lg shadow-green-500/30 flex items-center gap-2"
          >
            <Sparkles size={12} />
            NEW ARRIVAL
          </motion.div>
        </div>

        {/* Days ago badge */}
        <div className="absolute top-4 right-4 z-10">
          <div className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-semibold text-gray-700 shadow-sm">
            {product.daysAgo} days ago
          </div>
        </div>

        {/* Product Image */}
        <div className="relative mb-6 overflow-hidden rounded-2xl bg-gradient-to-b from-gray-50 to-white">
          <motion.div
            animate={{ scale: isHovered ? 1.08 : 1 }}
            transition={{ duration: 0.4 }}
            className="aspect-square flex items-center justify-center p-8"
          >
            <div className={`${product.emojiSize || 'text-7xl'} transform transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`}>
              {product.emoji}
            </div>
          </motion.div>

          {/* Wishlist button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsLiked(!isLiked)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg z-20"
          >
            <Heart
              className={`w-5 h-5 transition-all ${isLiked ? 'fill-red-500 text-red-500 scale-110' : 'text-gray-400'}`}
            />
          </motion.button>

          {/* Quick View Overlay */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent flex items-end justify-center p-6"
              >
                <motion.button
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-3 rounded-xl bg-white text-gray-800 font-semibold shadow-lg flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Quick View
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Product Info */}
        <div className="space-y-4">
          {/* Category */}
          <div className="flex items-center justify-between">
            <span className={`px-3 py-1 rounded-full ${product.categoryColor} text-xs font-semibold`}>
              {product.category}
            </span>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-semibold text-gray-700">{product.rating}</span>
            </div>
          </div>

          {/* Title & Description */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 line-clamp-1 mb-2">{product.name}</h3>
            <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>
          </div>

          {/* Price & Discount */}
          <div className="flex items-center justify-between pt-2">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-gray-800">${product.price}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-sm text-gray-400 line-through">${product.originalPrice}</span>
                    <span className="text-xs font-bold text-green-600">
                      {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                    </span>
                  </>
                )}
              </div>
              <div className="flex items-center gap-1 mt-1">
                <Truck className="w-4 h-4 text-blue-500" />
                <span className="text-xs text-gray-600">Free shipping</span>
              </div>
            </div>

            {/* Add to Cart */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-5 py-3 rounded-xl ${product.buttonGradient} text-white font-semibold text-sm shadow-lg hover:shadow-xl transition-shadow`}
            >
              Add to Cart
            </motion.button>
          </div>
        </div>

        {/* Floating elements */}
        {isHovered && (
          <>
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
            />
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute -bottom-2 -left-2 w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"
            />
          </>
        )}
      </div>
    </motion.div>
  );
};

// Category Filter
const CategoryFilter = ({ categories, activeCategory, setActiveCategory }) => {
  return (
    <div className="flex flex-wrap gap-3 mb-12">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setActiveCategory("all")}
        className={`px-6 py-3 rounded-xl font-semibold transition-all ${
          activeCategory === "all"
            ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30"
            : "bg-white/95 backdrop-blur-xl border border-white/40 text-gray-700 hover:bg-gray-50"
        }`}
      >
        All New
      </motion.button>
      
      {categories.map((category, index) => (
        <motion.button
          key={category.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setActiveCategory(category.id)}
          className={`px-6 py-3 rounded-xl font-semibold transition-all ${
            activeCategory === category.id
              ? `${category.buttonGradient} text-white shadow-lg`
              : "bg-white/95 backdrop-blur-xl border border-white/40 text-gray-700 hover:bg-gray-50"
          }`}
        >
          {category.name}
        </motion.button>
      ))}
    </div>
  );
};

// Stats Section
const StatsSection = () => {
  const stats = [
    { value: "500+", label: "New Products This Week", icon: "🆕" },
    { value: "24h", label: "Average Arrival Time", icon: "⚡" },
    { value: "4.8★", label: "Customer Rating", icon: "⭐" },
    { value: "98%", label: "Satisfaction Rate", icon: "❤️" }
  ];

  return (
    <div className="bg-gradient-to-br from-white/90 to-purple-50/50 backdrop-blur-xl rounded-3xl p-8 border border-white/40 shadow-2xl shadow-black/5 mb-16">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="text-center p-6 rounded-2xl bg-white/50 hover:bg-white/80 transition-all"
          >
            <div className="text-3xl mb-2">{stat.icon}</div>
            <div className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</div>
            <div className="text-gray-600 text-sm">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Main New Arrivals Component
const NewArrivals = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [activeCategory, setActiveCategory] = useState("all");
  const [showCountdown, setShowCountdown] = useState(true);

  const categories = [
    { 
      id: "electronics", 
      name: "Electronics", 
      color: "blue-500", 
      buttonGradient: "bg-gradient-to-r from-blue-500 to-cyan-500",
      gradient: "from-blue-500 to-cyan-500"
    },
    { 
      id: "home", 
      name: "Home & Living", 
      color: "green-500",
      buttonGradient: "bg-gradient-to-r from-emerald-500 to-teal-500",
      gradient: "from-emerald-500 to-teal-500"
    },
    { 
      id: "fashion", 
      name: "Fashion", 
      color: "pink-500",
      buttonGradient: "bg-gradient-to-r from-pink-500 to-rose-500",
      gradient: "from-pink-500 to-rose-500"
    },
    { 
      id: "vehicles", 
      name: "Vehicles", 
      color: "orange-500",
      buttonGradient: "bg-gradient-to-r from-orange-500 to-red-500",
      gradient: "from-orange-500 to-red-500"
    },
    { 
      id: "sports", 
      name: "Sports", 
      color: "purple-500",
      buttonGradient: "bg-gradient-to-r from-purple-500 to-indigo-500",
      gradient: "from-purple-500 to-indigo-500"
    }
  ];

  const newArrivals = [
    {
      id: 1,
      name: "Quantum X Pro Laptop",
      description: "AI-powered laptop with neural processor, 4K OLED touchscreen, and 20-hour battery",
      price: 1899,
      originalPrice: 2299,
      category: "Electronics",
      categoryColor: "bg-blue-100 text-blue-600",
      emoji: "💻",
      gradient: "from-blue-500/20 to-cyan-500/20",
      buttonGradient: "bg-gradient-to-r from-blue-600 to-cyan-600",
      rating: 4.9,
      daysAgo: 1,
      isTrending: true
    },
    {
      id: 2,
      name: "Smart Home Ecosystem Pro",
      description: "Complete home automation system with AI assistant and energy optimization",
      price: 1299,
      originalPrice: 1599,
      category: "Home & Living",
      categoryColor: "bg-emerald-100 text-emerald-600",
      emoji: "🏠",
      emojiSize: "text-8xl",
      gradient: "from-emerald-500/20 to-teal-500/20",
      buttonGradient: "bg-gradient-to-r from-emerald-600 to-teal-600",
      rating: 4.8,
      daysAgo: 2,
      isTrending: true
    },
    {
      id: 3,
      name: "Electric Hyper Scooter X1",
      description: "45 mph top speed, 60-mile range, foldable design with smart navigation",
      price: 899,
      category: "Vehicles",
      categoryColor: "bg-orange-100 text-orange-600",
      emoji: "🛴",
      emojiSize: "text-8xl",
      gradient: "from-orange-500/20 to-red-500/20",
      buttonGradient: "bg-gradient-to-r from-orange-600 to-red-600",
      rating: 4.7,
      daysAgo: 1,
      isTrending: true
    },
    {
      id: 4,
      name: "AI Smartwatch Ultra",
      description: "Health monitoring with real-time AI insights and emergency response",
      price: 499,
      originalPrice: 599,
      category: "Electronics",
      categoryColor: "bg-blue-100 text-blue-600",
      emoji: "⌚",
      gradient: "from-blue-500/20 to-indigo-500/20",
      buttonGradient: "bg-gradient-to-r from-blue-600 to-indigo-600",
      rating: 4.9,
      daysAgo: 3
    },
    {
      id: 5,
      name: "Designer Smart Backpack",
      description: "Anti-theft, solar charging, and built-in tracking with smart compartments",
      price: 299,
      category: "Fashion",
      categoryColor: "bg-pink-100 text-pink-600",
      emoji: "🎒",
      gradient: "from-pink-500/20 to-rose-500/20",
      buttonGradient: "bg-gradient-to-r from-pink-600 to-rose-600",
      rating: 4.6,
      daysAgo: 4
    },
    {
      id: 6,
      name: "Smart Fitness Mirror Pro",
      description: "Interactive workouts with AI personal trainer and form correction",
      price: 1499,
      originalPrice: 1999,
      category: "Sports",
      categoryColor: "bg-purple-100 text-purple-600",
      emoji: "🪞",
      emojiSize: "text-8xl",
      gradient: "from-purple-500/20 to-indigo-500/20",
      buttonGradient: "bg-gradient-to-r from-purple-600 to-indigo-600",
      rating: 4.8,
      daysAgo: 2,
      isTrending: true
    },
    {
      id: 7,
      name: "Wireless Noise Cancelling Earbuds",
      description: "3D spatial audio with AI noise cancellation and 40-hour battery",
      price: 249,
      originalPrice: 349,
      category: "Electronics",
      categoryColor: "bg-blue-100 text-blue-600",
      emoji: "🎧",
      gradient: "from-blue-500/20 to-cyan-500/20",
      buttonGradient: "bg-gradient-to-r from-blue-600 to-cyan-600",
      rating: 4.7,
      daysAgo: 5
    },
    {
      id: 8,
      name: "Smart Kitchen Assistant",
      description: "AI recipe suggestions, inventory tracking, and cooking guidance",
      price: 399,
      category: "Home & Living",
      categoryColor: "bg-emerald-100 text-emerald-600",
      emoji: "🍳",
      emojiSize: "text-8xl",
      gradient: "from-emerald-500/20 to-teal-500/20",
      buttonGradient: "bg-gradient-to-r from-emerald-600 to-teal-600",
      rating: 4.5,
      daysAgo: 3
    }
  ];

  const filteredProducts = activeCategory === "all" 
    ? newArrivals 
    : newArrivals.filter(product => 
        product.category.toLowerCase().includes(activeCategory.toLowerCase())
      );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-purple-50/30 text-gray-800 relative overflow-hidden">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Three.js Background */}
      <NewArrivalsBackground />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 mb-6 px-6 py-3 rounded-full bg-white/80 backdrop-blur-xl border border-gray-200 shadow-sm"
            >
              <Sparkles className="w-5 h-5 text-purple-500" />
              <span className="text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text font-semibold">
                🆕 FRESH ARRIVALS JUST IN
              </span>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
            >
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                New Arrivals
              </span>
              <br />
              Discover First
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8"
            >
              Be the first to explore our latest products with cutting-edge technology and innovative design.
              <span className="font-semibold text-purple-600"> Shop early for exclusive launch prices!</span>
            </motion.p>

            {/* Countdown Banner */}
            <AnimatePresence>
              {showCountdown && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="max-w-2xl mx-auto mb-8"
                >
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 shadow-2xl shadow-purple-500/30">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Clock className="w-8 h-8 text-white" />
                        <div>
                          <h3 className="text-white font-bold text-lg">Launch Special Ending Soon!</h3>
                          <p className="text-white/80 text-sm">Limited time discounts on new arrivals</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-white">24</div>
                          <div className="text-white/80 text-xs">HOURS</div>
                        </div>
                        <div className="text-white">:</div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-white">45</div>
                          <div className="text-white/80 text-xs">MINS</div>
                        </div>
                        <button
                          onClick={() => setShowCountdown(false)}
                          className="text-white/80 hover:text-white ml-4"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Filter by Category</h2>
            <CategoryFilter 
              categories={categories}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <StatsSection />
          </motion.div>

          {/* New Arrivals Grid */}
          <div className="mb-20">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-800">Latest Products</h2>
                <p className="text-gray-600 mt-2">
                  {filteredProducts.length} new arrivals {activeCategory !== "all" && `in ${categories.find(c => c.id === activeCategory)?.name}`}
                </p>
              </div>
              <div className="flex items-center gap-2 text-purple-600 font-semibold">
                <span>Sort by: Newest</span>
                <ChevronRight className="w-5 h-5" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map((product, index) => (
                <NewArrivalCard key={product.id} product={product} index={index} />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-20">
                <div className="text-6xl mb-6">🔍</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">No new arrivals in this category</h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  Check back soon for new products or explore other categories.
                </p>
              </div>
            )}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="bg-gradient-to-br from-white/90 to-purple-50/50 backdrop-blur-xl rounded-3xl p-12 md:p-16 border border-white/40 shadow-2xl shadow-black/5">
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                Never Miss a New Arrival
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Get notified first when new products arrive. Exclusive early access for subscribers.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 rounded-xl bg-white border border-gray-300 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold shadow-lg shadow-purple-500/30 hover:shadow-xl transition-shadow"
                >
                  Get Early Access
                </motion.button>
              </div>
              
              <p className="text-sm text-gray-500 mt-6">
                By subscribing, you'll be first to know about new products and exclusive launch offers.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default NewArrivals;