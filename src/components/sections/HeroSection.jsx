
import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Search } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const HeroSection = () => {
  const { theme } = useTheme();

  // Theme-based styles
  const sectionBg = theme === 'dark' 
    ? 'bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800'
    : 'bg-gradient-to-b from-white to-blue-50/30';

  const badgeBg = theme === 'dark'
    ? 'bg-gray-800/80 border-gray-700 backdrop-blur-xl'
    : 'bg-white/80 border-gray-200 backdrop-blur-xl';

  const titleColor = theme === 'dark'
    ? 'text-gray-100'
    : 'text-gray-900';

  const subtitleColor = theme === 'dark'
    ? 'text-gray-300'
    : 'text-gray-600';

  const searchBg = theme === 'dark'
    ? 'bg-gray-800/80 border-gray-700'
    : 'bg-white/80 border-gray-300';

  const searchInputBg = theme === 'dark'
    ? 'bg-gray-800 text-gray-100 placeholder-gray-400'
    : 'bg-white text-gray-900 placeholder-gray-500';

  const searchFocus = theme === 'dark'
    ? 'focus:border-blue-500 focus:ring-blue-500/30'
    : 'focus:border-blue-500 focus:ring-blue-200';

  const trendingTagBg = theme === 'dark'
    ? 'bg-gray-800 border-gray-700 text-gray-300 hover:border-blue-500 hover:text-blue-400'
    : 'bg-white border-gray-200 text-gray-700 hover:border-blue-300 hover:text-blue-600';

  const statsText = theme === 'dark'
    ? 'text-gray-400'
    : 'text-gray-600';

  return (
    <section className={`relative min-h-screen flex items-center justify-center px-6 pt-24 pb-32 ${sectionBg}`}>
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
            className={`inline-flex items-center gap-2 mb-6 px-6 py-3 rounded-full ${badgeBg} shadow-sm`}
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
            className={`text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight ${titleColor}`}
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
            className={`text-xl md:text-2xl ${subtitleColor} max-w-3xl mx-auto leading-relaxed mb-10`}
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
                className={`w-full px-8 py-5 rounded-2xl border ${searchBg} ${searchInputBg} ${searchFocus} focus:ring-2 outline-none shadow-lg shadow-black/5 text-lg transition-colors`}
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:shadow-lg transition-shadow hover:shadow-blue-500/30">
                <Search size={20} />
              </button>
            </div>
            
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              <span className={statsText}>Trending:</span>
              {["Wireless Earbuds", "Smart Watches", "Laptops", "Sneakers", "Home Decor", "Fitness"].map((tag, i) => (
                <button 
                  key={i} 
                  className={`px-4 py-2 rounded-full border text-sm transition-colors ${trendingTagBg}`}
                >
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
              <div className={statsText}>Products Available</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                98%
              </div>
              <div className={statsText}>Customer Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                24h
              </div>
              <div className={statsText}>Fast Delivery</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                10K+
              </div>
              <div className={statsText}>Brands</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;