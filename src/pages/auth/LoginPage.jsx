import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";
import { 
  Mail, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  Github, 
  Chrome, 
  Sparkles, 
  CheckCircle,
  ArrowRight,
  Shield,
  Smartphone
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

// Three.js Background for Auth Pages
const AuthBackground = ({ type = "login" }) => {
  const mountRef = useRef(null);

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

    // Create floating geometric shapes
    const geometries = [
      new THREE.OctahedronGeometry(1, 0),
      new THREE.DodecahedronGeometry(1, 0),
      new THREE.IcosahedronGeometry(1, 0),
      new THREE.TorusKnotGeometry(1, 0.3, 100, 16)
    ];

    const colors = type === "login" 
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
        opacity: 0.6
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
        rotationSpeed: Math.random() * 0.01 + 0.005
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
      const hue = type === "login" ? 0.7 + Math.random() * 0.2 : 0.3 + Math.random() * 0.2;
      color.setHSL(hue, 0.8, 0.6 + Math.random() * 0.3);
      colorArray[i] = color.r;
      colorArray[i + 1] = color.g;
      colorArray[i + 2] = color.b;
    }

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute("color", new THREE.BufferAttribute(colorArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.03,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
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

    const pointLight = new THREE.PointLight(type === "login" ? 0x8b5cf6 : 0x10b981, 0.5, 50);
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

// Floating Input Component
const FloatingInput = ({ 
  label, 
  type = "text", 
  icon: Icon, 
  value, 
  onChange, 
  error, 
  showToggle = false,
  onToggle,
  ...props 
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative">
      <motion.div
        initial={false}
        animate={{
          scale: isFocused ? 1.02 : 1,
          borderColor: error ? "#ef4444" : isFocused ? "#8b5cf6" : "#e5e7eb"
        }}
        className="relative bg-white/80 backdrop-blur-sm border-2 rounded-xl overflow-hidden group"
      >
        <div className="absolute left-4 top-1/2 -translate-y-1/2">
          <Icon size={20} className={error ? "text-red-500" : isFocused ? "text-purple-600" : "text-gray-400"} />
        </div>
        
        <input
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-full pl-12 pr-12 py-4 bg-transparent text-gray-800 placeholder-gray-400 focus:outline-none"
          placeholder={label}
          {...props}
        />
        
        {showToggle && (
          <button
            type="button"
            onClick={onToggle}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {type === "password" ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </motion.div>
      
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-500 text-sm mt-2 ml-4"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};

// OAuth Button Component
const OAuthButton = ({ provider, icon: Icon, onClick }) => {
  const providers = {
    github: { bg: "bg-gray-900", hover: "hover:bg-gray-800", text: "Continue with GitHub" },
    google: { bg: "bg-white", hover: "hover:bg-gray-50", text: "Continue with Google", border: true },
    microsoft: { bg: "bg-blue-600", hover: "hover:bg-blue-700", text: "Continue with Microsoft" }
  };

  const config = providers[provider];

  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`w-full py-3.5 rounded-xl ${config.bg} ${config.hover} ${
        config.border ? "border border-gray-300" : ""
      } text-${provider === "google" ? "gray-800" : "white"} font-semibold transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl`}
    >
      <Icon size={20} />
      {config.text}
    </motion.button>
  );
};

// Security Badge Component
const SecurityBadge = ({ icon: Icon, text, delay }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay }}
    className="flex items-center gap-3 p-3 rounded-lg bg-white/50 backdrop-blur-sm"
  >
    <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white">
      <Icon size={20} />
    </div>
    <span className="text-sm text-gray-700">{text}</span>
  </motion.div>
);

// Login Page
export const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigate("/dashboard");
    }, 1500);
  };

  const handleOAuthLogin = (provider) => {
    console.log(`Logging in with ${provider}`);
    // Implement OAuth logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 relative overflow-hidden">
      {/* Background */}
      <AuthBackground type="login" />
      
      {/* Floating Elements */}
      <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-purple-300/10 rounded-full blur-3xl" />
      <div className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-pink-300/10 rounded-full blur-3xl" />

      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Illustration & Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="hidden lg:block"
          >
            <div className="space-y-8">
              <div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring" }}
                  className="inline-flex items-center gap-3 mb-6 px-6 py-3 rounded-full bg-white/80 backdrop-blur-xl border border-white/40 shadow-lg"
                >
                  <Sparkles className="w-5 h-5 text-purple-500" />
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-bold">
                    WELCOME BACK
                  </span>
                </motion.div>
                
                <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
                  Secure Login to Your
                  <span className="block bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                    AI-Powered Dashboard
                  </span>
                </h1>
                
                <p className="text-xl text-gray-600 mb-8">
                  Access personalized recommendations, smart analytics, and exclusive features tailored just for you.
                </p>
              </div>

              {/* Security Features */}
              <div className="space-y-4">
                <SecurityBadge icon={Shield} text="Bank-level 256-bit encryption" delay={0.4} />
                <SecurityBadge icon={Smartphone} text="Two-factor authentication available" delay={0.5} />
                <SecurityBadge icon={Sparkles} text="AI-powered security monitoring" delay={0.6} />
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-8">
                {[
                  { value: "50K+", label: "Active Users" },
                  { value: "99.9%", label: "Uptime" },
                  { value: "24/7", label: "Support" }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="text-center p-4 rounded-xl bg-white/50 backdrop-blur-sm"
                  >
                    <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Side - Login Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full"
          >
            <div className="max-w-md mx-auto">
              {/* Login Card */}
              <div className="relative">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl blur-2xl opacity-20" />
                
                {/* Form Card */}
                <div className="relative bg-white/95 backdrop-blur-xl border border-white/40 rounded-3xl p-8 shadow-2xl shadow-black/10">
                  {/* Header */}
                  <div className="text-center mb-8">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring" }}
                      className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/30"
                    >
                      <Sparkles className="w-10 h-10 text-white" />
                    </motion.div>
                    
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">
                      Welcome Back! 👋
                    </h2>
                    <p className="text-gray-600">
                      Sign in to continue your journey
                    </p>
                  </div>

                  {/* OAuth Buttons */}
                  <div className="space-y-4 mb-6">
                    <OAuthButton provider="github" icon={Github} onClick={() => handleOAuthLogin("github")} />
                    <OAuthButton provider="google" icon={Chrome} onClick={() => handleOAuthLogin("google")} />
                  </div>

                  {/* Divider */}
                  <div className="flex items-center my-6">
                    <div className="flex-1 h-px bg-gray-300" />
                    <span className="px-4 text-gray-500 text-sm">Or continue with email</span>
                    <div className="flex-1 h-px bg-gray-300" />
                  </div>

                  {/* Login Form */}
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <FloatingInput
                      label="Email Address"
                      type="email"
                      icon={Mail}
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      error={errors.email}
                      required
                    />

                    <FloatingInput
                      label="Password"
                      type={showPassword ? "text" : "password"}
                      icon={Lock}
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      error={errors.password}
                      showToggle
                      onToggle={() => setShowPassword(!showPassword)}
                      required
                    />

                    {/* Remember Me & Forgot Password */}
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          className="w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                        />
                        <span className="text-gray-700">Remember me</span>
                      </label>
                      
                      <Link to="/forgot-password" className="text-purple-600 hover:text-purple-700 font-medium">
                        Forgot password?
                      </Link>
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={isLoading}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold text-lg shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Signing in...
                        </>
                      ) : (
                        <>
                          Sign In
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </motion.button>
                  </form>

                  {/* Sign Up Link */}
                  <div className="text-center mt-8 pt-6 border-t border-gray-200">
                    <p className="text-gray-600">
                      Don't have an account?{" "}
                      <Link to="/signup" className="text-purple-600 hover:text-purple-700 font-semibold">
                        Create one now
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}