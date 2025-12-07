import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";
import {
  ShoppingBag,
  Sparkles,
  Menu,
  X,
  ChevronRight,
  Globe,
  Shield,
  Rocket,
  Zap,
  Users,
  CreditCard,
  BarChart3,
  Smartphone,
  Palette,
  Cloud,
  Lock,
  Award,
  LogIn,
  UserPlus
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

// Three.js Navbar Background Effect
const NavBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 10);
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });

    renderer.setSize(300, 80);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Create floating particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 100;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 8;
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: "#8b5cf6",
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    const particlesMesh = new THREE.Points(
      particlesGeometry,
      particlesMaterial
    );
    scene.add(particlesMesh);

    camera.position.z = 5;

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);

      particlesMesh.rotation.y += 0.001 + mouseX * 0.002;
      particlesMesh.rotation.x += 0.0005 + mouseY * 0.001;

      particlesMesh.position.x = mouseX * 0.5;
      particlesMesh.position.y = mouseY * 0.5;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      mountRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 -z-10" />;
};

// Mega Menu Component
const MegaMenu = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Zap size={20} />,
      title: "AI-Powered",
      desc: "Smart recommendations & automation",
      color: "purple",
    },
    {
      icon: <Globe size={20} />,
      title: "Omnichannel",
      desc: "Sell everywhere, manage centrally",
      color: "blue",
    },
    {
      icon: <Smartphone size={20} />,
      title: "Mobile-First",
      desc: "Native apps & PWA support",
      color: "pink",
    },
    {
      icon: <Shield size={20} />,
      title: "Enterprise Security",
      desc: "Bank-level protection",
      color: "green",
    },
    {
      icon: <BarChart3 size={20} />,
      title: "Advanced Analytics",
      desc: "Real-time insights & forecasts",
      color: "orange",
    },
    {
      icon: <Cloud size={20} />,
      title: "Cloud Hosting",
      desc: "99.9% uptime guarantee",
      color: "cyan",
    },
  ];

  const useCases = [
    { category: "Fashion & Apparel", icon: "👕" },
    { category: "Electronics", icon: "📱" },
    { category: "Health & Beauty", icon: "💄" },
    { category: "Home & Garden", icon: "🏠" },
    { category: "Food & Beverage", icon: "🍷" },
    { category: "Digital Products", icon: "🎮" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          />

          {/* Mega Menu */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 w-[95vw] max-w-6xl bg-white/95 backdrop-blur-2xl rounded-3xl border border-white/40 shadow-2xl shadow-black/20 z-50 overflow-hidden"
          >
            <div className="p-8">
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Features */}
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <Sparkles size={18} className="text-purple-500" />
                    Cutting-Edge Features
                  </h3>
                  <div className="space-y-4">
                    {features.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="group p-4 rounded-xl hover:bg-gray-50/50 transition-all cursor-pointer"
                        onClick={() => {
                          navigate("/new");
                          onClose();
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`p-2 rounded-lg ${feature.color === "purple" ? "bg-purple-100 text-purple-600" : feature.color === "blue" ? "bg-blue-100 text-blue-600" : feature.color === "pink" ? "bg-pink-100 text-pink-600" : feature.color === "green" ? "bg-green-100 text-green-600" : feature.color === "orange" ? "bg-orange-100 text-orange-600" : "bg-cyan-100 text-cyan-600"}`}
                          >
                            {feature.icon}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800">
                              {feature.title}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {feature.desc}
                            </p>
                          </div>
                          <ChevronRight
                            size={16}
                            className="ml-auto text-gray-400 group-hover:text-purple-500 transition-colors"
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Use Cases */}
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-6">
                    Popular Industries
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {useCases.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="p-4 rounded-xl border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all cursor-pointer group"
                        onClick={() => {
                          navigate("/about");
                          onClose();
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{item.icon}</span>
                          <span className="font-medium text-gray-800 group-hover:text-purple-600 transition-colors">
                            {item.category}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Quick Links */}
                  <div className="mt-8 p-4 rounded-xl bg-linear-to-r from-purple-50 to-pink-50 border border-purple-100">
                    <h4 className="font-bold text-gray-800 mb-3">
                      Quick Start
                    </h4>
                    <div className="space-y-2">
                      <button
                        onClick={() => {
                          navigate("/new");
                          onClose();
                        }}
                        className="w-full text-left p-3 rounded-lg hover:bg-white transition-colors text-gray-700 hover:text-purple-600"
                      >
                        🚀 Start Free Trial
                      </button>
                      <button
                        onClick={() => {
                          navigate("/about");
                          onClose();
                        }}
                        className="w-full text-left p-3 rounded-lg hover:bg-white transition-colors text-gray-700 hover:text-purple-600"
                      >
                        📞 Schedule Demo
                      </button>
                    </div>
                  </div>
                </div>

                {/* Plans Preview */}
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-6">
                    Choose Your Plan
                  </h3>
                  <div className="space-y-4">
                    {[
                      {
                        name: "Starter",
                        price: "$29",
                        desc: "For new businesses",
                        color: "from-purple-500 to-pink-500",
                      },
                      {
                        name: "Professional",
                        price: "$99",
                        desc: "Most popular",
                        color: "from-blue-500 to-cyan-500",
                        popular: true,
                      },
                      {
                        name: "Enterprise",
                        price: "Custom",
                        desc: "For large teams",
                        color: "from-emerald-500 to-teal-500",
                      },
                    ].map((plan, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`p-4 rounded-xl border-2 ${
                          plan.popular ? "border-purple-300" : "border-gray-200"
                        } hover:border-purple-400 transition-all cursor-pointer group`}
                        onClick={() => {
                          navigate("/new");
                          onClose();
                        }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h4 className="font-bold text-gray-800">
                              {plan.name}
                            </h4>
                            <p className="text-sm text-gray-600">{plan.desc}</p>
                          </div>
                          {plan.popular && (
                            <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-600 text-xs font-bold">
                              POPULAR
                            </span>
                          )}
                        </div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-bold text-gray-800">
                            {plan.price}
                          </span>
                          <span className="text-gray-500">/month</span>
                        </div>
                        <div className="mt-3 h-2 rounded-full bg-gray-200 overflow-hidden">
                          <div
                            className={`h-full bg-linear-to-r ${plan.color} transition-all duration-500 group-hover:w-full`}
                            style={{ width: plan.popular ? "80%" : "60%" }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 p-6 bg-linear-to-r from-gray-50 to-white">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-6">
                  <span className="text-sm text-gray-600 flex items-center gap-2">
                    <Award size={14} className="text-purple-500" />
                    50,000+ Happy Customers
                  </span>
                  <span className="text-sm text-gray-600 flex items-center gap-2">
                    <Globe size={14} className="text-blue-500" />
                    Global Support 24/7
                  </span>
                  <span className="text-sm text-gray-600 flex items-center gap-2">
                    <Lock size={14} className="text-green-500" />
                    Enterprise Security
                  </span>
                </div>
                <button
                  onClick={() => {
                    navigate("/new");
                    onClose();
                  }}
                  className="px-6 py-3 rounded-xl bg-linear-to-r from-purple-600 to-pink-600 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all"
                >
                  Explore Products
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Floating Action Button
const FloatingActionButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    { icon: "🚀", label: "Start Trial", color: "bg-purple-500" },
    { icon: "💬", label: "Live Chat", color: "bg-blue-500" },
    { icon: "📞", label: "Call Sales", color: "bg-green-500" },
    { icon: "📊", label: "Demo", color: "bg-pink-500" },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.3 }}
            className="absolute bottom-16 right-0 space-y-3"
          >
            {actions.map((action, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center gap-3 ${action.color} text-white px-4 py-3 rounded-xl shadow-lg hover:shadow-xl transition-shadow`}
              >
                <span className="text-xl">{action.icon}</span>
                <span className="font-semibold">{action.label}</span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-2xl bg-linear-to-r from-purple-600 to-pink-600 text-white shadow-2xl shadow-purple-500/40 flex items-center justify-center"
      >
        {isOpen ? <X size={24} /> : <Sparkles size={24} />}
      </motion.button>
    </div>
  );
};

// Main Navbar Component
const ModernNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { path: "/", label: "Home", icon: <Rocket size={18} /> },
    { path: "/about", label: "About", icon: <Users size={18} /> },
    { path: "/new", label: "New Arrivals", icon: <Sparkles size={18} /> },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Floating Elements */}
      <div className="fixed top-20 left-10 w-72 h-72 bg-purple-300/10 rounded-full blur-3xl -z-10" />
      <div className="fixed top-10 right-10 w-96 h-96 bg-pink-300/10 rounded-full blur-3xl -z-10" />

      {/* Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className={`fixed top-6 left-1/2 -translate-x-1/2 w-[95vw] max-w-6xl z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white/90 backdrop-blur-2xl shadow-2xl shadow-black/10 border border-white/40"
            : "bg-white/80 backdrop-blur-xl shadow-lg shadow-black/5 border border-white/30"
        } rounded-2xl`}
      >
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => navigate("/")}
            >
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-linear-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                  <ShoppingBag size={24} className="text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-linear-to-r from-blue-500 to-cyan-500 animate-pulse" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  CommercePro
                </h1>
                <p className="text-xs text-gray-500">AI-Powered E-commerce</p>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {/* Features Mega Menu Trigger */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative"
                onMouseEnter={() => setIsMegaMenuOpen(true)}
                onMouseLeave={() => setIsMegaMenuOpen(false)}
              >
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-gray-100/50 transition-all group">
                  <Sparkles size={16} className="text-purple-500" />
                  <span className="font-semibold text-gray-700">Features</span>
                  <ChevronRight
                    size={16}
                    className="text-gray-400 group-hover:text-purple-500 transition-transform group-hover:rotate-90"
                  />
                </button>

                {/* Active Indicator */}
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute -bottom-1 left-4 right-4 h-0.5 bg-linear-to-r from-purple-500 to-pink-500 rounded-full"
                  initial={false}
                  animate={isMegaMenuOpen ? { opacity: 1 } : { opacity: 0 }}
                />
              </motion.div>

              {/* Main Navigation Items */}
              {navItems.map((item) => (
                <motion.div
                  key={item.path}
                  whileHover={{ scale: 1.05 }}
                  className="relative"
                  onClick={() => navigate(item.path)}
                >
                  <button
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                      isActive(item.path)
                        ? "text-purple-600 bg-purple-50"
                        : "text-gray-700 hover:text-purple-600 hover:bg-gray-100/50"
                    }`}
                  >
                    {item.icon}
                    <span className="font-semibold">{item.label}</span>
                  </button>

                  {/* Active Indicator */}
                  {isActive(item.path) && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute -bottom-1 left-4 right-4 h-0.5 bg-linear-to-r from-purple-500 to-pink-500 rounded-full"
                    />
                  )}
                </motion.div>
              ))}

              {/* Auth Buttons & CTA */}
              <div className="flex items-center gap-4 ml-4">
                {/* Login Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/login")}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-purple-200 text-purple-600 font-semibold hover:bg-purple-50 transition-all"
                >
                  <LogIn size={18} />
                  Login
                </motion.button>

                {/* Signup Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/signup")}
                  className="px-6 py-2.5 rounded-xl bg-linear-to-r from-purple-600 to-pink-600 text-white font-semibold shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all flex items-center gap-2"
                >
                  <UserPlus size={18} />
                  Sign Up Free
                </motion.button>

                {/* Theme Toggle */}
                <motion.button
                  whileHover={{ rotate: 15 }}
                  className="w-10 h-10 rounded-xl border border-gray-300 flex items-center justify-center hover:border-purple-300 hover:bg-purple-50/50 transition-colors"
                >
                  <Palette size={18} className="text-gray-600" />
                </motion.button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-4 lg:hidden">
              {/* Mobile Auth Buttons */}
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/login")}
                  className="px-3 py-2 rounded-xl border border-purple-200 text-purple-600 font-semibold text-sm hover:bg-purple-50"
                >
                  Login
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/signup")}
                  className="px-3 py-2 rounded-xl bg-linear-to-r from-purple-600 to-pink-600 text-white font-semibold text-sm shadow-lg shadow-purple-500/30"
                >
                  Signup
                </motion.button>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="w-10 h-10 rounded-xl border border-gray-300 flex items-center justify-center"
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="px-6 py-4 border-t border-gray-200 space-y-2">
                {navItems.map((item) => (
                  <motion.button
                    key={item.path}
                    whileHover={{ x: 10 }}
                    onClick={() => {
                      navigate(item.path);
                      setIsMenuOpen(false);
                    }}
                    className={`flex items-center gap-3 w-full p-3 rounded-xl transition-all ${
                      isActive(item.path)
                        ? "bg-purple-50 text-purple-600"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    {item.icon}
                    <span className="font-semibold">{item.label}</span>
                    {isActive(item.path) && (
                      <div className="ml-auto w-2 h-2 rounded-full bg-linear-to-r from-purple-500 to-pink-500" />
                    )}
                  </motion.button>
                ))}

                {/* Auth Links in Mobile Menu */}
                <div className="grid grid-cols-2 gap-2 mt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    onClick={() => {
                      navigate("/login");
                      setIsMenuOpen(false);
                    }}
                    className="p-3 rounded-xl border border-purple-200 text-purple-600 font-semibold hover:bg-purple-50"
                  >
                    Login
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    onClick={() => {
                      navigate("/signup");
                      setIsMenuOpen(false);
                    }}
                    className="p-3 rounded-xl bg-linear-to-r from-purple-600 to-pink-600 text-white font-semibold"
                  >
                    Sign Up
                  </motion.button>
                </div>

                {/* Features Mobile */}
                <div className="p-4 mt-4 rounded-xl bg-linear-to-r from-purple-50 to-pink-50">
                  <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <Sparkles size={16} />
                    Key Features
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {["AI Tools", "Smart Deals", "AR/VR", "Analytics"].map(
                      (feature) => (
                        <span
                          key={feature}
                          className="px-3 py-2 rounded-lg bg-white text-sm text-center font-medium"
                        >
                          {feature}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Mega Menu */}
      <MegaMenu
        isOpen={isMegaMenuOpen}
        onClose={() => setIsMegaMenuOpen(false)}
      />

      {/* Floating Action Button */}
      <FloatingActionButton />

      {/* Three.js Background Effect */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 w-[95vw] max-w-6xl h-20 -z-10 rounded-2xl overflow-hidden">
        <NavBackground />
      </div>

      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-linear-to-r from-purple-500 via-pink-500 to-blue-500 z-50 origin-left"
        style={{
          scaleX: isScrolled
            ? 0.3 + (window.scrollY / (document.body.scrollHeight || 1000)) * 0.7
            : 0,
        }}
      />
    </>
  );
};

export default ModernNavbar;