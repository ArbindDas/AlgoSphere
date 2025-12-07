import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { 
  Mail, MapPin, Phone, X, Send, CheckCircle, Clock, 
  MessageCircle, Globe, Shield, Users, Award, 
  ChevronRight, Sparkles, Star, Zap, Globe as GlobeIcon,
  Headphones, ShieldCheck, Truck, ShoppingBag, Package, CreditCard,
  Shield as ShieldIcon, Lock, RefreshCw, ThumbsUp, Store, Gift
} from 'lucide-react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import emailjs from '@emailjs/browser';

const ContactPage = () => {
  const canvasRef = useRef(null);
  const globeCanvasRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formState, setFormState] = useState({ 
    name: '', 
    email: '', 
    phone: '', 
    orderNumber: '',
    subject: 'order',
    message: '' 
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [typingText, setTypingText] = useState('');
  const phrases = ["Need Help?", "Order Questions?", "Track Your Package", "Secure Shopping!"];
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  // Typing effect for hero section
  useEffect(() => {
    if (charIndex < phrases[phraseIndex].length) {
      const timeout = setTimeout(() => {
        setTypingText(phrases[phraseIndex].substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setPhraseIndex((phraseIndex + 1) % phrases.length);
        setCharIndex(0);
        setTypingText('');
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, phraseIndex]);

  // 3D Background Effects
  useEffect(() => {
    if (!canvasRef.current || !globeCanvasRef.current) return;

    // Floating Particles
    const scene1 = new THREE.Scene();
    const camera1 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer1 = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current, 
      alpha: true, 
      antialias: true,
      powerPreference: "high-performance"
    });
    
    renderer1.setSize(window.innerWidth, window.innerHeight);
    renderer1.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    camera1.position.z = 8;

    // Create shopping-themed particles (boxes and spheres)
    const particlesCount = 600;
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 25;
      positions[i + 1] = (Math.random() - 0.5) * 25;
      positions[i + 2] = (Math.random() - 0.5) * 20;

      // Shopping theme colors (green for success, blue for trust)
      colors[i] = 0.1 + Math.random() * 0.3;     // R
      colors[i + 1] = 0.6 + Math.random() * 0.3; // G (more green)
      colors[i + 2] = 0.4 + Math.random() * 0.3; // B
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    });

    const particleSystem = new THREE.Points(particlesGeometry, particlesMaterial);
    scene1.add(particleSystem);

    // Interactive Globe with shipping routes
    const scene2 = new THREE.Scene();
    const camera2 = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    const renderer2 = new THREE.WebGLRenderer({ 
      canvas: globeCanvasRef.current, 
      alpha: true, 
      antialias: true 
    });
    
    const globeSize = Math.min(window.innerWidth * 0.3, 400);
    renderer2.setSize(globeSize, globeSize);
    camera2.position.z = 5;

    const controls = new OrbitControls(camera2, renderer2.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.5;

    // Create secure shopping globe
    const globeGeometry = new THREE.SphereGeometry(2, 64, 64);
    const globeMaterial = new THREE.MeshPhongMaterial({
      color: 0x10b981, // Emerald green for security/trust
      transparent: true,
      opacity: 0.8,
      shininess: 100,
      specular: 0xffffff
    });
    
    const globe = new THREE.Mesh(globeGeometry, globeMaterial);
    scene2.add(globe);

    // Security rings
    const ringGeometry = new THREE.TorusGeometry(2.5, 0.02, 16, 100);
    const ringMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x34d399,
      transparent: true,
      opacity: 0.6
    });
    
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = Math.PI / 2;
    scene2.add(ring);

    // Add shipping points
    const pointsCount = 15;
    const pointsGeometry = new THREE.BufferGeometry();
    const pointsPositions = new Float32Array(pointsCount * 3);

    for (let i = 0; i < pointsCount * 3; i += 3) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      const radius = 2.1;

      pointsPositions[i] = radius * Math.sin(phi) * Math.cos(theta);
      pointsPositions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pointsPositions[i + 2] = radius * Math.cos(phi);
    }

    pointsGeometry.setAttribute('position', new THREE.BufferAttribute(pointsPositions, 3));
    const pointsMaterial = new THREE.PointsMaterial({
      size: 0.12,
      color: 0xfbbf24, // Amber for shipping points
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    const points = new THREE.Points(pointsGeometry, pointsMaterial);
    scene2.add(points);

    // Lighting
    const globeAmbientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene2.add(globeAmbientLight);
    
    const globePointLight = new THREE.PointLight(0x10b981, 1, 100);
    globePointLight.position.set(5, 5, 5);
    scene2.add(globePointLight);

    // Animation
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      
      particleSystem.rotation.y += 0.001;
      particleSystem.rotation.x += 0.0005;
      
      globe.rotation.y += 0.002;
      ring.rotation.z += 0.001;
      
      controls.update();
      
      renderer1.render(scene1, camera1);
      renderer2.render(scene2, camera2);
    };
    animate();

    const handleResize = () => {
      camera1.aspect = window.innerWidth / window.innerHeight;
      camera1.updateProjectionMatrix();
      renderer1.setSize(window.innerWidth, window.innerHeight);
      
      const newGlobeSize = Math.min(window.innerWidth * 0.3, 400);
      camera2.aspect = 1;
      camera2.updateProjectionMatrix();
      renderer2.setSize(newGlobeSize, newGlobeSize);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer1.dispose();
      renderer2.dispose();
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate order support request
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      setTimeout(() => {
        setSubmitSuccess(false);
        setIsModalOpen(false);
        setFormState({ 
          name: '', 
          email: '', 
          phone: '', 
          orderNumber: '',
          subject: 'order',
          message: '' 
        });
      }, 3000);
      
    } catch (error) {
      console.error('Error:', error);
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const contactCards = [
    { 
      icon: ShoppingBag, 
      title: 'Order Support', 
      value: 'orders@shopsecure.com',
      description: 'Help with orders, tracking, and delivery',
      color: 'from-emerald-500 to-green-600',
      action: () => setIsModalOpen(true),
      stats: 'Response time: 1h',
      badge: 'Fast'
    },
    { 
      icon: Phone, 
      title: '24/7 Customer Care', 
      value: '+1 (800) 123-SHOP',
      description: 'Direct line for urgent order issues',
      color: 'from-blue-500 to-cyan-600',
      action: () => window.open('tel:+18001237467'),
      stats: 'Available now',
      badge: 'Live'
    },
    { 
      icon: MessageCircle, 
      title: 'Live Chat', 
      value: 'Chat Now',
      description: 'Instant help with your purchase',
      color: 'from-purple-500 to-pink-600',
      action: () => setIsModalOpen(true),
      stats: 'Avg wait: 1min',
      badge: 'Instant'
    },
    { 
      icon: ShieldCheck, 
      title: 'Security Help', 
      value: 'security@shopsecure.com',
      description: 'Payment security & account protection',
      color: 'from-orange-500 to-amber-500',
      action: () => setIsModalOpen(true),
      stats: '24/7 Monitoring',
      badge: 'Secure'
    }
  ];

  const faqItems = [
    {
      question: "How can I track my order?",
      answer: "Use your order number in the tracking section or chat with our support team for real-time updates.",
      icon: Package
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, Amex), PayPal, Apple Pay, and Google Pay.",
      icon: CreditCard
    },
    {
      question: "Is my payment information secure?",
      answer: "Yes! We use 256-bit SSL encryption and are PCI-DSS compliant. We never store your full card details.",
      icon: Lock
    },
    {
      question: "What is your return policy?",
      answer: "30-day hassle-free returns. Items must be unused with original packaging. Free return shipping.",
      icon: RefreshCw
    }
  ];

  const subjectOptions = [
    { value: 'order', label: 'Order Issues' },
    { value: 'shipping', label: 'Shipping & Delivery' },
    { value: 'returns', label: 'Returns & Refunds' },
    { value: 'payment', label: 'Payment Problems' },
    { value: 'account', label: 'Account Security' }
  ];

  const securityFeatures = [
    { icon: Shield, title: 'SSL Encryption', desc: 'Bank-level security' },
    { icon: Lock, title: 'PCI Compliance', desc: 'Secure payment processing' },
    { icon: ThumbsUp, title: 'Buyer Protection', desc: '30-day guarantee' },
    { icon: Store, title: 'Verified Store', desc: 'Trusted merchant' }
  ];

  return (
    <div className="relative min-h-screen bg-linear-to-br from-emerald-50 via-blue-50/30 to-amber-50/20 overflow-hidden">
      {/* Background Effects */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none opacity-20" />
      
      {/* Shopping Globe */}
      <div className="fixed right-10 bottom-10 lg:right-20 lg:bottom-20 z-0">
        <canvas ref={globeCanvasRef} className="opacity-15 hover:opacity-25 transition-opacity" />
      </div>

      {/* Floating elements */}
      <div className="fixed top-1/4 left-10 w-72 h-72 bg-emerald-300/10 rounded-full blur-3xl" />
      <div className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-blue-300/10 rounded-full blur-3xl" />

      {/* Navigation */}
      <nav className="relative z-20 bg-white/95 backdrop-blur-xl border-b border-gray-200/50 shadow-sm top-0">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-linear-to-br from-emerald-600 to-green-500 rounded-lg flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold bg-linear-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent">
              ShopSecure
            </span>
          </div>
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-linear-to-r from-emerald-600 to-green-500 text-white px-6 py-2 rounded-xl font-semibold hover:shadow-lg hover:shadow-emerald-500/30 transition-all flex items-center gap-2"
            >
              <Headphones className="w-4 h-4" />
              Need Help?
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-6 py-24 md:py-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="inline-flex items-center gap-2 bg-linear-to-r from-emerald-500/10 to-green-500/10 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-emerald-200/50">
                <ShieldCheck className="w-4 h-4" />
                100% Secure Shopping Guaranteed
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                <span className="block">Shopping Support</span>
                <span className="block bg-linear-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent">
                  {typingText}
                  <span className="animate-pulse">|</span>
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 max-w-2xl leading-relaxed">
                Your satisfaction is our priority. Get help with orders, track packages, resolve payment issues, or ask about our buyer protection. We're here 24/7 to ensure your shopping experience is smooth and secure.
              </p>

              {/* Security Features */}
              <div className="flex flex-wrap gap-4 mb-8">
                {securityFeatures.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-white/50 backdrop-blur-sm px-4 py-3 rounded-xl border border-gray-200/50">
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                      <feature.icon className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">{feature.title}</p>
                      <p className="text-xs text-gray-500">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsModalOpen(true)}
                className="bg-linear-to-r from-emerald-600 to-green-500 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl hover:shadow-emerald-500/30 transition-all inline-flex items-center gap-3"
              >
                <Headphones className="w-5 h-5" />
                Get Help Now
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </motion.div>

            {/* Contact Methods Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {contactCards.map((card, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  onClick={card.action}
                  className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all border border-gray-200/50 group cursor-pointer relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-20 h-20 bg-linear-to-br from-emerald-500/5 to-green-500/5 rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-300" />
                  
                  {card.badge && (
                    <div className="absolute top-3 right-3">
                      <span className="text-xs font-semibold bg-linear-to-r from-emerald-500 to-green-600 text-white px-2 py-1 rounded-full">
                        {card.badge}
                      </span>
                    </div>
                  )}
                  
                  <div className={`bg-linear-to-br ${card.color} w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg relative z-10`}>
                    <card.icon className="w-7 h-7 text-white" />
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-2 relative z-10">{card.title}</h3>
                  <p className="text-emerald-600 font-semibold mb-1 relative z-10">{card.value}</p>
                  <p className="text-sm text-gray-500 mb-2 relative z-10">{card.description}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs font-medium text-gray-400">{card.stats}</span>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Shopping Assurance Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-linear-to-br from-white via-emerald-50/30 to-green-50/20 rounded-3xl p-12 shadow-2xl border border-gray-200/50 backdrop-blur-sm"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-linear-to-r from-blue-500/10 to-cyan-500/10 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <Truck className="w-4 h-4" />
                  Fast & Reliable Shipping
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Your Purchase is Protected
                </h2>
                <p className="text-gray-600 text-lg mb-8">
                  We ensure every transaction is secure and every delivery is tracked. Shop with confidence knowing you're protected.
                </p>
                <div className="space-y-4">
                  {[
                    { label: 'Order Processing', time: 'Within 24 hours', icon: '⚡' },
                    { label: 'Standard Shipping', time: '3-5 business days', icon: '🚚' },
                    { label: 'Express Delivery', time: '1-2 business days', icon: '✈️' },
                    { label: 'Free Returns', time: '30-day window', icon: '🔄' }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-white/50 rounded-xl border border-gray-200/50">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{item.icon}</span>
                        <div>
                          <p className="font-semibold text-gray-900">{item.label}</p>
                          <p className="text-sm text-gray-500">{item.time}</p>
                        </div>
                      </div>
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Support Centers */}
              <div className="bg-white/80 rounded-2xl p-8 border border-gray-200/50">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Regional Support Centers</h3>
                <div className="space-y-6">
                  {[
                    { city: 'US Headquarters', address: '123 Commerce St, NY 10013', hours: '24/7 Support' },
                    { city: 'European Hub', address: '45 Business Ave, London EC2A', hours: '8AM-10PM CET' },
                    { city: 'Asia Pacific', address: '10 Marina Blvd, Singapore', hours: '24/7 Support' },
                    { city: 'Australia', address: '1 Martin Place, Sydney', hours: '24/7 Support' }
                  ].map((office, idx) => (
                    <div key={idx} className="flex items-start gap-4 p-4 hover:bg-gray-50/50 rounded-xl transition-colors">
                      <div className="w-12 h-12 bg-linear-to-br from-emerald-100 to-green-100 rounded-lg flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-emerald-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">{office.city}</h4>
                        <p className="text-sm text-gray-600">{office.address}</p>
                        <p className="text-sm text-emerald-600 mt-1 font-medium">{office.hours}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Shopping Questions Answered
            </h2>
            <p className="text-gray-600 text-lg">
              Quick help for common shopping queries
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqItems.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200/50 hover:shadow-xl transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-linear-to-br from-emerald-100 to-green-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <item.icon className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{item.question}</h3>
                    <p className="text-gray-600">{item.answer}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="bg-linear-to-r from-emerald-600 to-green-500 rounded-3xl p-12 shadow-2xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: '1M+', label: 'Happy Customers', icon: Users },
                { value: '99%', label: 'Order Accuracy', icon: CheckCircle },
                { value: '24/7', label: 'Support Available', icon: Clock },
                { value: '30-day', label: 'Return Policy', icon: Gift }
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="text-white"
                >
                  <div className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
                  <div className="flex items-center justify-center gap-2">
                    <stat.icon className="w-5 h-5" />
                    <p className="text-emerald-100">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Contact Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isSubmitting && setIsModalOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-lg z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-linear-to-br from-white via-emerald-50/30 to-green-50/20 rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-white/50 backdrop-blur-sm"
              >
                <div className="sticky top-0 bg-linear-to-r from-white via-white/95 to-white border-b border-gray-200/50 px-8 py-6 flex items-center justify-between rounded-t-3xl backdrop-blur-sm">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Shopping Support Request</h2>
                    <p className="text-gray-600 text-sm mt-1">Include your order number for faster help</p>
                  </div>
                  <button
                    onClick={() => !isSubmitting && setIsModalOpen(false)}
                    className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                    disabled={isSubmitting}
                  >
                    <X className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                <div className="p-8">
                  {submitSuccess ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12"
                    >
                      <div className="relative">
                        <div className="absolute inset-0 bg-linear-to-r from-green-400 to-emerald-500 rounded-full blur-xl opacity-20 animate-pulse" />
                        <div className="relative bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                          <CheckCircle className="w-12 h-12 text-green-600" />
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Request Submitted!</h3>
                      <p className="text-gray-600 mb-4">We'll contact you within 1 hour to help with your shopping inquiry.</p>
                      <p className="text-sm text-gray-500">Check your email for confirmation and tracking info</p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formState.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 bg-white/80 border border-gray-300/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all text-gray-900 backdrop-blur-sm"
                            placeholder="Your name"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formState.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 bg-white/80 border border-gray-300/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all text-gray-900 backdrop-blur-sm"
                            placeholder="you@example.com"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formState.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-white/80 border border-gray-300/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all text-gray-900 backdrop-blur-sm"
                            placeholder="Optional for urgent issues"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Order Number
                          </label>
                          <input
                            type="text"
                            name="orderNumber"
                            value={formState.orderNumber}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-white/80 border border-gray-300/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all text-gray-900 backdrop-blur-sm"
                            placeholder="ORD-XXXX-XXXX (if applicable)"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          What do you need help with? *
                        </label>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {subjectOptions.map((option) => (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() => setFormState({ ...formState, subject: option.value })}
                              className={`px-4 py-2 rounded-lg transition-all ${formState.subject === option.value 
                                ? 'bg-linear-to-r from-emerald-600 to-green-500 text-white shadow-md' 
                                : 'bg-white/80 text-gray-700 hover:bg-gray-100 border border-gray-300/50'}`}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Details *
                        </label>
                        <textarea
                          name="message"
                          value={formState.message}
                          onChange={handleChange}
                          required
                          rows={6}
                          className="w-full px-4 py-3 bg-white/80 border border-gray-300/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all text-gray-900 backdrop-blur-sm resize-none"
                          placeholder="Please describe your issue or question. Include order details, product information, and any error messages you received..."
                        />
                      </div>

                      <div className="flex items-center gap-3 bg-blue-50/50 p-4 rounded-xl border border-blue-200/50">
                        <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0" />
                        <p className="text-sm text-blue-700">
                          Your information is protected with 256-bit SSL encryption. We'll only use it to help with your shopping inquiry.
                        </p>
                      </div>

                      <motion.button
                        type="submit"
                        disabled={isSubmitting || !formState.name || !formState.email || !formState.message}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-linear-to-r from-emerald-600 to-green-500 text-white font-bold py-4 rounded-xl hover:shadow-xl hover:shadow-emerald-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 relative overflow-hidden group"
                      >
                        <div className="absolute inset-0 bg-linear-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5 relative z-10" />
                            <span className="relative z-10">Send Request</span>
                            <ChevronRight className="w-5 h-5 relative z-10" />
                          </>
                        )}
                      </motion.button>

                      <div className="text-center pt-4 border-t border-gray-200/50">
                        <p className="text-xs text-gray-500">
                          Need immediate help? Call our 24/7 hotline: <span className="font-semibold text-emerald-600">+1 (800) 123-SHOP</span>
                        </p>
                      </div>
                    </form>
                  )}
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Enhanced Footer */}
      <footer className="relative z-10 bg-linear-to-b from-white/90 via-white/80 to-white border-t border-gray-200/50 px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-linear-to-br from-emerald-600 to-green-500 rounded-lg flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-linear-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent">
                  ShopSecure
                </span>
              </div>
              <p className="text-gray-600 text-sm">
                Your trusted shopping destination. Secure payments, fast shipping, and exceptional customer support since 2018.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Shopping Help</h4>
              <ul className="space-y-2">
                {['Order Status', 'Shipping Info', 'Returns & Exchanges', 'Size Guide'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-600 hover:text-emerald-600 transition-colors text-sm">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Security & Privacy</h4>
              <ul className="space-y-2">
                {['Privacy Policy', 'Terms of Sale', 'Secure Shopping', 'Cookie Policy'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-600 hover:text-emerald-600 transition-colors text-sm">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Accepted Payments</h4>
              <div className="flex flex-wrap gap-2">
                {['Visa', 'MasterCard', 'Amex', 'PayPal'].map((method) => (
                  <div key={method} className="px-3 py-1 bg-gray-100 rounded-lg">
                    <span className="text-xs font-medium text-gray-600">{method}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-200/50 text-center">
            <p className="text-sm text-gray-600">
              © 2024 ShopSecure. All rights reserved. |{' '}
              <span className="text-emerald-600 font-medium">100% Secure Shopping Guarantee</span>
            </p>
            <p className="text-xs text-gray-500 mt-2">
              All transactions are protected by SSL encryption and PCI-DSS compliance
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ContactPage;