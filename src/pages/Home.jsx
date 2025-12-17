
// Home.jsx
import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { useNavigate } from "react-router-dom";
import HeroBackground from "../components/HeroBackground";
import HeroSection from "../components/sections/HeroSection";
import CategoriesSection from "../components/sections/CategoriesSection";
import FeaturedProducts from "../components/sections/FeaturedProducts";
import DailyDeals from "../components/sections/DailyDeals";
import CTASection from "../components/sections/CTASection";
import SecurityFeatures from "../components/SecurityFeatures";
import AIShoppingAssistant from "../components/AIShoppingAssistant";
import { Shield } from "lucide-react"; 

const Home = () => {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-blue-50/30 text-gray-800 relative overflow-hidden">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 origin-left z-40"
        style={{ scaleX }}
      />

      {/* Three.js Background */}
      <HeroBackground />

      {/* Hero Section */}
      <HeroSection />

      {/* Categories Section */}
      <CategoriesSection />

      {/* AI Shopping Assistant */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <AIShoppingAssistant />
        </div>
      </section>

      {/* Featured Products */}
      <FeaturedProducts />

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
      <DailyDeals />

      {/* CTA Section */}
      <CTASection />
    </div>
  );
};

export default Home;
