import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import * as THREE from "three";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  ShoppingCart,
  Shield,
  Zap,
  Package,
  Star,
  Sparkles,
  Search,
  Heart,
  Truck,
  RotateCcw,
  CreditCard,
  Headphones,
  User,
  Clock,
  CheckCircle,
  ChevronRight,
  Play,
  TrendingUp,
  Tag,
  Percent,
  Award,
  Globe,
  Smartphone,
  Users,
  MessageSquare,
  Send,
  HelpCircle,
  Calendar,
  Check,
  MapPin,
  Phone,
  Mail,
  Book
} from "lucide-react";

// Three.js Hero Background
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
      mountRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="fixed inset-0 -z-10" />;
};

// Product Category Card
const ProductCategoryCard = ({ icon, title, productCount, bgColor, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
      className="group relative cursor-pointer"
    >
      <div className="relative bg-white/95 backdrop-blur-xl border border-white/40 rounded-2xl p-8 shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/10 transition-all duration-500">
        <div className={`inline-flex p-4 rounded-xl ${bgColor} mb-6`}>
          {icon}
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
        <p className="text-gray-600 mb-4">Discover {productCount}+ curated products</p>
        <div className="flex items-center text-blue-600 font-medium group-hover:gap-2 transition-all duration-300">
          <span>Shop Now</span>
          <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-all duration-300" />
        </div>
      </div>
    </motion.div>
  );
};

// Product Card Component
const ProductCard = ({ image, title, price, originalPrice, rating, reviewCount, category, isNew, isSale, delay = 0 }) => {
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -5, transition: { duration: 0.3 } }}
      className="group relative bg-white/95 backdrop-blur-xl border border-white/40 rounded-2xl overflow-hidden shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/10 transition-all duration-500"
    >
      {/* Badges */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        {isNew && (
          <span className="px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full">
            NEW
          </span>
        )}
        {isSale && (
          <span className="px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded-full">
            -{discount}%
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:bg-white hover:shadow-lg transition-all">
        <Heart size={18} className="text-gray-600 hover:text-red-500" />
      </button>

      {/* Product Image */}
      <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden">
        <div className="w-48 h-48 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/50 to-transparent" />
      </div>

      {/* Product Info */}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-medium px-2 py-1 bg-blue-50 text-blue-600 rounded">
            {category}
          </span>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={12} className={i < rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"} />
            ))}
            <span className="text-xs text-gray-500 ml-1">({reviewCount})</span>
          </div>
        </div>

        <h3 className="font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">{title}</h3>
        
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl font-bold text-gray-800">${price.toFixed(2)}</span>
          {originalPrice && (
            <span className="text-lg text-gray-400 line-through">${originalPrice.toFixed(2)}</span>
          )}
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 flex items-center justify-center gap-2"
        >
          <ShoppingCart size={18} />
          Add to Cart
        </motion.button>
      </div>
    </motion.div>
  );
};

// AI Assistant Component
const AIShoppingAssistant = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([
    "Gaming laptops under $1000",
    "Wireless headphones for running",
    "Organic skincare products",
    "Smart home devices",
    "Fitness trackers with heart rate"
  ]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 md:p-12 border border-blue-100"
    >
      <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
        <div className="flex-1">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-blue-200">
            <Sparkles size={16} className="text-blue-500" />
            <span className="text-sm font-semibold text-blue-600">AI SHOPPING ASSISTANT</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Need Help Finding Products?
          </h3>
          <p className="text-gray-600 mb-6">
            Our AI assistant learns your preferences and suggests products you'll love. Just tell us what you're looking for!
          </p>
          
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Describe what you're looking for..."
              className="w-full px-6 py-4 pr-12 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-white/80 backdrop-blur-sm"
            />
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => setQuery(suggestion)}
                className="px-4 py-2 rounded-lg bg-white border border-gray-200 text-sm hover:border-blue-300 hover:text-blue-600 transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1">
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 border border-white/40 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                <Sparkles className="text-white" size={20} />
              </div>
              <div>
                <h4 className="font-bold text-gray-800">AI Suggestions</h4>
                <p className="text-sm text-gray-500">Based on your interests</p>
              </div>
            </div>
            
            <div className="space-y-3">
              {[
                { category: "Electronics", match: "95%" },
                { category: "Fashion", match: "88%" },
                { category: "Home & Living", match: "82%" },
                { category: "Beauty", match: "76%" }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                  <span className="font-medium text-gray-700">{item.category}</span>
                  <span className="text-sm font-semibold text-blue-600">{item.match} match</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Security & Trust Component
const SecurityFeatures = () => {
  const features = [
    {
      icon: <Shield className="text-white" size={24} />,
      title: "Bank-Level Security",
      description: "256-bit SSL encryption for all transactions",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <CreditCard className="text-white" size={24} />,
      title: "Secure Payments",
      description: "Multiple payment options with fraud protection",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Truck className="text-white" size={24} />,
      title: "Guaranteed Delivery",
      description: "Track your order with real-time updates",
      color: "from-emerald-500 to-teal-500"
    },
    {
      icon: <RotateCcw className="text-white" size={24} />,
      title: "Easy Returns",
      description: "30-day return policy, no questions asked",
      color: "from-orange-500 to-amber-500"
    },
    {
      icon: <Headphones className="text-white" size={24} />,
      title: "24/7 Support",
      description: "Live chat and phone support available",
      color: "from-indigo-500 to-blue-500"
    },
    {
      icon: <Award className="text-white" size={24} />,
      title: "Verified Sellers",
      description: "All sellers are thoroughly vetted",
      color: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {features.map((feature, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className="bg-white/95 backdrop-blur-xl border border-white/40 rounded-2xl p-6 shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/10 transition-all duration-500"
        >
          <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.color} mb-4`}>
            {feature.icon}
          </div>
          <h4 className="font-bold text-gray-800 mb-2">{feature.title}</h4>
          <p className="text-gray-600 text-sm">{feature.description}</p>
        </motion.div>
      ))}
    </div>
  );
};

// Main Home Component
const Home = () => {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const categories = [
    {
      icon: <Smartphone className="text-white" size={24} />,
      title: "Electronics",
      productCount: "12,458",
      bgColor: "bg-gradient-to-br from-blue-500 to-cyan-500"
    },
    {
      icon: <User className="text-white" size={24} />,
      title: "Fashion",
      productCount: "23,741",
      bgColor: "bg-gradient-to-br from-purple-500 to-pink-500"
    },
    {
      icon: <Package className="text-white" size={24} />,
      title: "Home & Living",
      productCount: "8,942",
      bgColor: "bg-gradient-to-br from-emerald-500 to-teal-500"
    },
    {
      icon: <Sparkles className="text-white" size={24} />,
      title: "Beauty",
      productCount: "5,623",
      bgColor: "bg-gradient-to-br from-orange-500 to-amber-500"
    },
    {
      icon: <Zap className="text-white" size={24} />,
      title: "Sports",
      productCount: "7,315",
      bgColor: "bg-gradient-to-br from-red-500 to-pink-500"
    },
    {
      icon: <Book className="text-white" size={24} />,
      title: "Books",
      productCount: "4,892",
      bgColor: "bg-gradient-to-br from-indigo-500 to-blue-500"
    }
  ];

  const featuredProducts = [
    {
      title: "Wireless Noise-Canceling Headphones",
      price: 199.99,
      originalPrice: 299.99,
      rating: 4.5,
      reviewCount: 1243,
      category: "Electronics",
      isNew: true,
      isSale: true
    },
    {
      title: "Premium Smart Watch Series 5",
      price: 349.99,
      originalPrice: null,
      rating: 4.8,
      reviewCount: 892,
      category: "Electronics",
      isNew: true,
      isSale: false
    },
    {
      title: "Organic Skincare Bundle",
      price: 89.99,
      originalPrice: 129.99,
      rating: 4.3,
      reviewCount: 567,
      category: "Beauty",
      isNew: false,
      isSale: true
    },
    {
      title: "Designer Backpack - Waterproof",
      price: 129.99,
      originalPrice: 179.99,
      rating: 4.6,
      reviewCount: 321,
      category: "Fashion",
      isNew: true,
      isSale: true
    },
    {
      title: "Smart Home Security System",
      price: 249.99,
      originalPrice: null,
      rating: 4.7,
      reviewCount: 754,
      category: "Home",
      isNew: true,
      isSale: false
    },
    {
      title: "Yoga Mat & Accessories Set",
      price: 69.99,
      originalPrice: 99.99,
      rating: 4.4,
      reviewCount: 432,
      category: "Sports",
      isNew: false,
      isSale: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-blue-50/30 text-gray-800 relative overflow-hidden">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 origin-left z-40"
        style={{ scaleX }}
      />

      {/* Three.js Background */}
      <HeroBackground />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link to="/" className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                  <ShoppingCart className="text-white" size={24} />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  ShopSmart
                </span>
              </Link>
              
              <nav className="hidden md:flex items-center gap-6">
                <Link to="/categories" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                  Categories
                </Link>
                <Link to="/deals" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                  Today's Deals
                </Link>
                <Link to="/trending" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                  Trending
                </Link>
                <Link to="/brands" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                  Brands
                </Link>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <Search size={20} />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <Heart size={20} />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors relative">
                <ShoppingCart size={20} />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </button>
              <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:shadow-lg transition-shadow">
                Sign In
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-24 pb-32">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 mb-6 px-6 py-3 rounded-full bg-white/80 backdrop-blur-xl border border-gray-200 shadow-sm"
            >
              <Sparkles size={16} className="text-blue-500" />
              <span className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text font-semibold">
                AI-POWERED SHOPPING EXPERIENCE
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight"
            >
              Discover Products
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                You'll Love
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-10"
            >
              Smart shopping powered by AI. Get personalized recommendations, secure checkout, and fast delivery—all in one place.
            </motion.p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="max-w-2xl mx-auto mb-16"
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for products, brands, or categories..."
                  className="w-full px-8 py-5 rounded-2xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none shadow-lg shadow-black/5 bg-white/80 backdrop-blur-xl text-lg"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:shadow-lg transition-shadow">
                  <Search size={20} />
                </button>
              </div>
              
              <div className="flex flex-wrap justify-center gap-3 mt-6">
                <span className="text-gray-500">Trending:</span>
                {["Wireless Earbuds", "Smart Watches", "Laptops", "Sneakers", "Home Decor", "Fitness"].map((tag, i) => (
                  <button key={i} className="px-4 py-2 rounded-full bg-white border border-gray-200 text-sm hover:border-blue-300 hover:text-blue-600 transition-colors">
                    {tag}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
            >
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  500K+
                </div>
                <div className="text-gray-600">Products Available</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  98%
                </div>
                <div className="text-gray-600">Customer Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  24h
                </div>
                <div className="text-gray-600">Fast Delivery</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  10K+
                </div>
                <div className="text-gray-600">Brands</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Shop by
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Category</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Browse through thousands of products in our curated categories
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {categories.map((category, index) => (
              <ProductCategoryCard key={index} delay={index * 0.1} {...category} />
            ))}
          </div>
        </div>
      </section>

      {/* AI Shopping Assistant */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <AIShoppingAssistant />
        </div>
      </section>

      {/* Featured Products */}
      <section className="relative py-20 px-6 bg-gradient-to-b from-white to-blue-50/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 mb-6 px-6 py-3 rounded-full bg-white/80 backdrop-blur-xl border border-gray-200 shadow-sm">
              <TrendingUp size={16} className="text-blue-500" />
              <span className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text font-semibold">
                TRENDING PRODUCTS
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Featured
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Products</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Curated selection based on customer preferences and trends
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {featuredProducts.map((product, index) => (
              <ProductCard key={index} delay={index * 0.1} {...product} />
            ))}
          </div>

          <div className="text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/products")}
              className="px-10 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-lg shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300"
            >
              View All Products
            </motion.button>
          </div>
        </div>
      </section>

      {/* Security & Trust */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 mb-6 px-6 py-3 rounded-full bg-white/80 backdrop-blur-xl border border-gray-200 shadow-sm">
              <Shield size={16} className="text-blue-500" />
              <span className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text font-semibold">
                SHOP WITH CONFIDENCE
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Safe & Secure
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Shopping</span>
            </h2>
          </motion.div>

          <SecurityFeatures />
        </div>
      </section>

      {/* Daily Deals Banner */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/10"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
            <div className="relative p-12 text-center">
              <div className="inline-flex items-center gap-2 mb-6 px-6 py-3 rounded-full bg-white/80 backdrop-blur-xl border border-gray-200 shadow-sm">
                <Tag size={16} className="text-red-500" />
                <span className="font-semibold text-red-600">FLASH SALE ENDS IN: 23:59:59</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-4">Daily Deals & Discounts</h3>
              <p className="text-gray-600 max-w-2xl mx-auto mb-8">
                Don't miss out on limited-time offers! Up to 70% off on selected items
              </p>
              <button className="px-10 py-4 rounded-xl bg-gradient-to-r from-red-600 to-pink-600 text-white font-semibold text-lg shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40 transition-all duration-300">
                Shop Deals Now
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-3xl blur-3xl opacity-10" />
            <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl p-12 md:p-16 border border-white/40 shadow-2xl shadow-black/5">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                Start Shopping Smart Today
              </h2>
              <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
                Join millions of satisfied customers who trust us for their shopping needs
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/signup")}
                  className="px-10 py-5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-lg shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300"
                >
                  Create Free Account
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/products")}
                  className="px-10 py-5 rounded-xl bg-white border border-gray-300 text-gray-800 font-semibold text-lg hover:bg-gray-50 hover:border-blue-300 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  Browse Products
                </motion.button>
              </div>
              <p className="text-sm text-gray-500 mt-8">
                🛡️ Secure checkout • 🚚 Free shipping over $50 • 🔄 30-day returns
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;