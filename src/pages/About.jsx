import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import * as THREE from "three";

// Three.js Background Component with light theme colors
const ThreeBackground = () => {
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
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    // Create particle system with light theme colors
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 800;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 50;
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      color: "#9333ea", // Lighter purple for light theme
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    const particlesMesh = new THREE.Points(
      particlesGeometry,
      particlesMaterial
    );
    scene.add(particlesMesh);

    camera.position.z = 15;

    const animate = () => {
      requestAnimationFrame(animate);
      particlesMesh.rotation.y += 0.0005;
      particlesMesh.rotation.x += 0.0002;
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
  }, []);

  return <div ref={mountRef} className="fixed inset-0 -z-10" />;
};

// Parallax Section Component
const ParallaxSection = ({ children, offset = 50 }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);
  const springY = useSpring(y, { stiffness: 100, damping: 30 });

  return (
    <motion.div ref={ref} style={{ y: springY }}>
      {children}
    </motion.div>
  );
};

// Glassmorphic Card Component for light theme
const GlassCard = ({ children, className = "", delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.4, 0.25, 1] }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className={`relative group ${className}`}
    >
      <div className="absolute inset-0 bg-linear-to-br from-purple-100/80 to-pink-100/80 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
      <div className="relative bg-white/90 backdrop-blur-xl border border-gray-200/80 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
        {children}
      </div>
    </motion.div>
  );
};

// Stat Counter Component
const StatCounter = ({ end, label, suffix = "", duration = 2 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }, [isVisible, end, duration]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-5xl md:text-6xl font-bold bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
        {count}
        {suffix}
      </div>
      <div className="text-gray-600 text-lg">{label}</div>
    </div>
  );
};

// Feature Card Component
const FeatureCard = ({ icon, title, description, delay = 0 }) => {
  return (
    <GlassCard delay={delay}>
      <div className="p-8 md:p-10">
        <div className="w-16 h-16 rounded-xl bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-6 text-3xl text-white shadow-lg shadow-purple-200">
          {icon}
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-4">{title}</h3>
        <p className="text-gray-600 leading-relaxed text-lg">{description}</p>
      </div>
    </GlassCard>
  );
};

// Category Card Component
const CategoryCard = ({ name, icon, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="group cursor-pointer"
    >
      <div className="relative">
        <div className="absolute inset-0 bg-linear-to-br from-purple-200 to-pink-200 rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-all duration-500" />
        <div className="relative bg-white border border-gray-200 rounded-2xl p-8 hover:border-purple-300 transition-all duration-500 shadow-lg hover:shadow-xl">
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center text-4xl text-white shadow-lg">
            {icon}
          </div>
          <h3 className="text-xl font-bold text-gray-800 text-center mb-2">
            {name}
          </h3>
          <div className="flex justify-center mt-4">
            <span className="text-sm text-purple-600 font-medium hover:text-purple-700 transition-colors">
              Explore Products →
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Security Badge Component
const SecurityBadge = ({ title, description, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center shrink-0">
          <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <div>
          <h4 className="text-lg font-bold text-gray-800 mb-2">{title}</h4>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

// Main About Component - Light Theme
const About = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="min-h-screen 
     from-gray-50 via-white to-gray-50 text-gray-800 relative overflow-hidden">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-linear-to-r from-purple-500 to-pink-500 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Three.js Background */}
      <ThreeBackground />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 py-20">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-block mb-6 px-6 py-2 rounded-full bg-white/80 backdrop-blur-xl border border-gray-300 shadow-sm"
            >
              <span className="text-purple-600 font-medium">WELCOME TO SMART SHOP</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight"
            >
              Shop Smarter,
              <br />
              <span className="bg-linear-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
                Live Better
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            >
              Your trusted destination for AI-powered shopping recommendations, 
              100% secure payments, and a seamless buying experience
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-3 gap-8 md:gap-16 max-w-4xl mx-auto mt-20"
            >
              <StatCounter end={500} suffix="K+" label="Happy Customers" />
              <StatCounter end={100} suffix="K+" label="Products" />
              <StatCounter end={99} suffix="%" label="Secure Transactions" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <div className="inline-block mb-6 px-6 py-2 rounded-full bg-white/80 backdrop-blur-xl border border-gray-300 shadow-sm">
              <span className="text-purple-600 font-medium">SHOP BY CATEGORY</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
              Discover Amazing Products
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              AI-powered recommendations help you find exactly what you need
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <CategoryCard
              name="Electronics"
              icon="📱"
              delay={0}
            />
            <CategoryCard
              name="Fashion"
              icon="👕"
              delay={0.1}
            />
            <CategoryCard
              name="Home & Living"
              icon="🏠"
              delay={0.2}
            />
            <CategoryCard
              name="Beauty"
              icon="💄"
              delay={0.3}
            />
            <CategoryCard
              name="Fitness"
              icon="💪"
              delay={0.4}
            />
            <CategoryCard
              name="Books"
              icon="📚"
              delay={0.5}
            />
            <CategoryCard
              name="Toys & Games"
              icon="🎮"
              delay={0.6}
            />
            <CategoryCard
              name="Groceries"
              icon="🛒"
              delay={0.7}
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-32 px-6 bg-linear-to-b from-transparent via-purple-50/50 to-transparent">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <div className="inline-block mb-6 px-6 py-2 rounded-full bg-white/80 backdrop-blur-xl border border-gray-300 shadow-sm">
              <span className="text-purple-600 font-medium">WHY CHOOSE US</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
              Your Safe & Smart Shopping Partner
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We prioritize your security and satisfaction above everything else
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon="🤖"
              title="AI Shopping Assistant"
              description="Our intelligent AI learns your preferences to suggest products you'll love, making shopping effortless and personalized."
              delay={0}
            />
            <FeatureCard
              icon="🔒"
              title="100% Secure Payments"
              description="Shop with confidence using bank-grade encryption, secure payment gateways, and buyer protection on every transaction."
              delay={0.1}
            />
            <FeatureCard
              icon="🚚"
              title="Fast & Free Shipping"
              description="Enjoy free shipping on orders above $50 and guaranteed delivery times with real-time tracking for all shipments."
              delay={0.2}
            />
            <FeatureCard
              icon="💬"
              title="24/7 Customer Support"
              description="Our support team is always ready to help via chat, phone, or email. Average response time: under 5 minutes."
              delay={0.3}
            />
            <FeatureCard
              icon="↩️"
              title="Easy Returns"
              description="Not satisfied? Return any item within 30 days for a full refund. Simple, hassle-free returns process."
              delay={0.4}
            />
            <FeatureCard
              icon="⭐"
              title="Verified Reviews"
              description="Read authentic reviews from verified buyers to make informed decisions about products before purchasing."
              delay={0.5}
            />
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ParallaxSection offset={30}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-block mb-6 px-6 py-2 rounded-full bg-white/80 backdrop-blur-xl border border-gray-300 shadow-sm">
                  <span className="text-purple-600 font-medium">
                    YOUR SECURITY IS OUR PRIORITY
                  </span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight text-gray-800">
                  Shop With Complete
                  <span className="bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    {" "}
                    Peace of Mind
                  </span>
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  We understand that online security is your biggest concern. 
                  That's why we've implemented multiple layers of protection to 
                  ensure your shopping experience is completely safe.
                </p>
                
                <div className="space-y-4 mb-8">
                  <SecurityBadge
                    title="SSL Encryption"
                    description="All data transmitted is secured with 256-bit SSL encryption"
                  />
                  <SecurityBadge
                    title="PCI DSS Compliant"
                    description="Fully compliant with Payment Card Industry Data Security Standards"
                  />
                  <SecurityBadge
                    title="Fraud Protection"
                    description="Advanced fraud detection systems monitor all transactions"
                  />
                  <SecurityBadge
                    title="Privacy First"
                    description="We never share your personal information with third parties"
                  />
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-xl bg-linear-to-r from-purple-600 to-pink-600 text-white font-semibold shadow-lg shadow-purple-200 hover:shadow-xl hover:shadow-purple-300 transition-all duration-300"
                >
                  Shop Securely Now
                </motion.button>
              </motion.div>
            </ParallaxSection>

            <ParallaxSection offset={-30}>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-linear-to-br from-purple-200 to-pink-200 rounded-3xl blur-3xl opacity-50" />
                <div className="relative aspect-square rounded-3xl bg-white border border-gray-200 overflow-hidden shadow-xl">
                  <div className="absolute inset-0 bg-linear-to-br from-purple-100/40 to-pink-100/40" />
                  <div className="p-10 h-full flex flex-col justify-center">
                    <div className="text-center mb-8">
                      <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-linear-to-br from-green-500 to-emerald-500 flex items-center justify-center text-4xl text-white shadow-lg">
                        🔒
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">
                        Protected Shopping Experience
                      </h3>
                    </div>
                    <div className="space-y-4">
                      {[
                        "Secure payment processing",
                        "Encrypted personal data",
                        "Regular security audits",
                        "Two-factor authentication",
                        "Secure account recovery",
                        "24/7 security monitoring"
                      ].map((item, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                            <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="text-gray-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </ParallaxSection>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <div className="inline-block mb-6 px-6 py-2 rounded-full bg-white/80 backdrop-blur-xl border border-gray-300 shadow-sm">
              <span className="text-purple-600 font-medium">HAPPY CUSTOMERS</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
              Loved by Shoppers Worldwide
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See what our customers have to say about their shopping experience
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <GlassCard>
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                    SJ
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold text-gray-800">Sarah Johnson</h4>
                    <p className="text-purple-600 text-sm">Verified Buyer</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "The AI recommendations are spot on! Found products I didn't even know I needed. Shopping has never been this easy and secure."
                </p>
                <div className="flex mt-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </GlassCard>

            <GlassCard delay={0.1}>
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                    MR
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold text-gray-800">Michael Rodriguez</h4>
                    <p className="text-purple-600 text-sm">Premium Member</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "As someone concerned about online security, I appreciate their transparent security measures. My payment information has never felt safer."
                </p>
                <div className="flex mt-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </GlassCard>

            <GlassCard delay={0.2}>
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                    EP
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold text-gray-800">Emma Patel</h4>
                    <p className="text-purple-600 text-sm">Frequent Shopper</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "The 30-day return policy gives me confidence to try new products. Customer service is responsive and actually helpful!"
                </p>
                <div className="flex mt-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <GlassCard>
            <div className="p-12 md:p-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
                Ready to Shop Smart?
              </h2>
              <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
                Join 500,000+ happy customers who trust us for safe, smart, and satisfying shopping
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-5 rounded-xl bg-linear-to-r from-purple-600 to-pink-600 text-white font-semibold text-lg shadow-lg shadow-purple-200 hover:shadow-xl hover:shadow-purple-300 transition-all duration-300"
                >
                  Start Shopping Now
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-5 rounded-xl bg-white border border-gray-300 text-gray-800 font-semibold text-lg hover:bg-gray-50 hover:border-purple-300 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  Explore Categories
                </motion.button>
              </div>
              <p className="mt-8 text-sm text-gray-500">
                <svg className="w-5 h-5 inline-block mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                No credit card required to browse • 100% secure • 30-day returns
              </p>
            </div>
          </GlassCard>
        </div>
      </section>
    </div>
  );
};

export default About;