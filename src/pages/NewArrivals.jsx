

import React, { useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import NewArrivalsBackground from "../components/new-arrivals/NewArrivalsBackground";
import NewArrivalCard from "../components/new-arrivals/NewArrivalCard";
import CategoryFilter from "../components/new-arrivals/CategoryFilter";
import StatsSection from "../components/new-arrivals/StatsSection";
import NewsletterSignup from "../components/new-arrivals/NewsletterSignup";
import ProgressBar from "../components/common/ProgressBar";
import { Sparkles, Clock, ChevronRight } from "lucide-react";
import CountdownBanner from "../components/new-arrivals/CountdownBanner";
// import { useTheme } from "../../context/ThemeContext";
import { useTheme } from "../context/ThemeContext";

const NewArrivals = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const { theme } = useTheme();
  const [activeCategory, setActiveCategory] = useState("all");
  const [showCountdown, setShowCountdown] = useState(true);

  // Theme-based styles
  const pageBg = theme === 'dark' 
    ? 'bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800'
    : 'bg-gradient-to-b from-gray-50 via-white to-purple-50/30';

  const textColor = theme === 'dark'
    ? 'text-gray-100'
    : 'text-gray-800';

  const subtitleColor = theme === 'dark'
    ? 'text-gray-300'
    : 'text-gray-600';

  const badgeBg = theme === 'dark'
    ? 'bg-gray-800/80 border-gray-700 backdrop-blur-xl'
    : 'bg-white/80 border-gray-200 backdrop-blur-xl';

  const sectionBg = theme === 'dark'
    ? 'bg-gray-800/50'
    : 'bg-white/50';

  const categories = [
    {
      id: "electronics",
      name: "Electronics",
      color: theme === 'dark' ? "blue-400" : "blue-500",
      buttonGradient: theme === 'dark' 
        ? "bg-gradient-to-r from-blue-600 to-cyan-600" 
        : "bg-gradient-to-r from-blue-500 to-cyan-500",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      id: "home",
      name: "Home & Living",
      color: theme === 'dark' ? "emerald-400" : "green-500",
      buttonGradient: theme === 'dark'
        ? "bg-gradient-to-r from-emerald-600 to-teal-600"
        : "bg-gradient-to-r from-emerald-500 to-teal-500",
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      id: "fashion",
      name: "Fashion",
      color: theme === 'dark' ? "pink-400" : "pink-500",
      buttonGradient: theme === 'dark'
        ? "bg-gradient-to-r from-pink-600 to-rose-600"
        : "bg-gradient-to-r from-pink-500 to-rose-500",
      gradient: "from-pink-500 to-rose-500",
    },
    {
      id: "vehicles",
      name: "Vehicles",
      color: theme === 'dark' ? "orange-400" : "orange-500",
      buttonGradient: theme === 'dark'
        ? "bg-gradient-to-r from-orange-600 to-red-600"
        : "bg-gradient-to-r from-orange-500 to-red-500",
      gradient: "from-orange-500 to-red-500",
    },
    {
      id: "sports",
      name: "Sports",
      color: theme === 'dark' ? "purple-400" : "purple-500",
      buttonGradient: theme === 'dark'
        ? "bg-gradient-to-r from-purple-600 to-indigo-600"
        : "bg-gradient-to-r from-purple-500 to-indigo-500",
      gradient: "from-purple-500 to-indigo-500",
    },
  ];

  const newArrivals = [
    {
      id: 1,
      name: "Quantum X Pro Laptop",
      description:
        "AI-powered laptop with neural processor, 4K OLED touchscreen, and 20-hour battery",
      price: 1899,
      originalPrice: 2299,
      category: "Electronics",
      categoryColor: theme === 'dark' 
        ? "bg-blue-900/30 text-blue-300 border border-blue-800/50"
        : "bg-blue-100 text-blue-600",
      emoji: "💻",
      gradient: theme === 'dark' 
        ? "from-blue-600/10 to-cyan-600/10" 
        : "from-blue-500/20 to-cyan-500/20",
      buttonGradient: "bg-gradient-to-r from-blue-600 to-cyan-600",
      rating: 4.9,
      daysAgo: 1,
      isTrending: true,
    },
    {
      id: 2,
      name: "Smart Home Ecosystem Pro",
      description:
        "Complete home automation system with AI assistant and energy optimization",
      price: 1299,
      originalPrice: 1599,
      category: "Home & Living",
      categoryColor: theme === 'dark'
        ? "bg-emerald-900/30 text-emerald-300 border border-emerald-800/50"
        : "bg-emerald-100 text-emerald-600",
      emoji: "🏠",
      emojiSize: "text-8xl",
      gradient: theme === 'dark'
        ? "from-emerald-600/10 to-teal-600/10"
        : "from-emerald-500/20 to-teal-500/20",
      buttonGradient: "bg-gradient-to-r from-emerald-600 to-teal-600",
      rating: 4.8,
      daysAgo: 2,
      isTrending: true,
    },
    {
      id: 3,
      name: "Electric Hyper Scooter X1",
      description:
        "45 mph top speed, 60-mile range, foldable design with smart navigation",
      price: 899,
      category: "Vehicles",
      categoryColor: theme === 'dark'
        ? "bg-orange-900/30 text-orange-300 border border-orange-800/50"
        : "bg-orange-100 text-orange-600",
      emoji: "🛴",
      emojiSize: "text-8xl",
      gradient: theme === 'dark'
        ? "from-orange-600/10 to-red-600/10"
        : "from-orange-500/20 to-red-500/20",
      buttonGradient: "bg-gradient-to-r from-orange-600 to-red-600",
      rating: 4.7,
      daysAgo: 1,
      isTrending: true,
    },
    {
      id: 4,
      name: "AI Smartwatch Ultra",
      description:
        "Health monitoring with real-time AI insights and emergency response",
      price: 499,
      originalPrice: 599,
      category: "Electronics",
      categoryColor: theme === 'dark'
        ? "bg-blue-900/30 text-blue-300 border border-blue-800/50"
        : "bg-blue-100 text-blue-600",
      emoji: "⌚",
      gradient: theme === 'dark'
        ? "from-blue-600/10 to-indigo-600/10"
        : "from-blue-500/20 to-indigo-500/20",
      buttonGradient: "bg-gradient-to-r from-blue-600 to-indigo-600",
      rating: 4.9,
      daysAgo: 3,
    },
    {
      id: 5,
      name: "Designer Smart Backpack",
      description:
        "Anti-theft, solar charging, and built-in tracking with smart compartments",
      price: 299,
      category: "Fashion",
      categoryColor: theme === 'dark'
        ? "bg-pink-900/30 text-pink-300 border border-pink-800/50"
        : "bg-pink-100 text-pink-600",
      emoji: "🎒",
      gradient: theme === 'dark'
        ? "from-pink-600/10 to-rose-600/10"
        : "from-pink-500/20 to-rose-500/20",
      buttonGradient: "bg-gradient-to-r from-pink-600 to-rose-600",
      rating: 4.6,
      daysAgo: 4,
    },
    {
      id: 6,
      name: "Smart Fitness Mirror Pro",
      description:
        "Interactive workouts with AI personal trainer and form correction",
      price: 1499,
      originalPrice: 1999,
      category: "Sports",
      categoryColor: theme === 'dark'
        ? "bg-purple-900/30 text-purple-300 border border-purple-800/50"
        : "bg-purple-100 text-purple-600",
      emoji: "🪞",
      emojiSize: "text-8xl",
      gradient: theme === 'dark'
        ? "from-purple-600/10 to-indigo-600/10"
        : "from-purple-500/20 to-indigo-500/20",
      buttonGradient: "bg-gradient-to-r from-purple-600 to-indigo-600",
      rating: 4.8,
      daysAgo: 2,
      isTrending: true,
    },
    {
      id: 7,
      name: "Wireless Noise Cancelling Earbuds",
      description:
        "3D spatial audio with AI noise cancellation and 40-hour battery",
      price: 249,
      originalPrice: 349,
      category: "Electronics",
      categoryColor: theme === 'dark'
        ? "bg-blue-900/30 text-blue-300 border border-blue-800/50"
        : "bg-blue-100 text-blue-600",
      emoji: "🎧",
      gradient: theme === 'dark'
        ? "from-blue-600/10 to-cyan-600/10"
        : "from-blue-500/20 to-cyan-500/20",
      buttonGradient: "bg-gradient-to-r from-blue-600 to-cyan-600",
      rating: 4.7,
      daysAgo: 5,
    },
    {
      id: 8,
      name: "Smart Kitchen Assistant",
      description:
        "AI recipe suggestions, inventory tracking, and cooking guidance",
      price: 399,
      category: "Home & Living",
      categoryColor: theme === 'dark'
        ? "bg-emerald-900/30 text-emerald-300 border border-emerald-800/50"
        : "bg-emerald-100 text-emerald-600",
      emoji: "🍳",
      emojiSize: "text-8xl",
      gradient: theme === 'dark'
        ? "from-emerald-600/10 to-teal-600/10"
        : "from-emerald-500/20 to-teal-500/20",
      buttonGradient: "bg-gradient-to-r from-emerald-600 to-teal-600",
      rating: 4.5,
      daysAgo: 3,
    },
  ];

  const filteredProducts =
    activeCategory === "all"
      ? newArrivals
      : newArrivals.filter((product) =>
          product.category.toLowerCase().includes(activeCategory.toLowerCase())
        );

  const noResultsBg = theme === 'dark'
    ? 'bg-gray-800/50 text-gray-200'
    : 'bg-white/50 text-gray-800';

  const noResultsText = theme === 'dark'
    ? 'text-gray-300'
    : 'text-gray-600';

  return (
    <div className={`min-h-screen ${pageBg} ${textColor} relative overflow-hidden pt-20 sm:pt-36 lg:pt-20 pb-15 px-4`}>
      {/* Progress Bar */}
      <ProgressBar scaleX={scaleX} theme={theme} />

      {/* Three.js Background */}
      <NewArrivalsBackground theme={theme} />

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
              className={`inline-flex items-center gap-2 mb-6 px-6 py-3 rounded-full ${badgeBg} shadow-sm`}
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
              <span className={theme === 'dark' ? 'text-gray-100' : ''}>
                Discover First
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className={`text-xl md:text-2xl ${subtitleColor} max-w-3xl mx-auto leading-relaxed mb-8`}
            >
              Be the first to explore our latest products with cutting-edge
              technology and innovative design.
              <span className="font-semibold text-purple-600">
                {" "}
                Shop early for exclusive launch prices!
              </span>
            </motion.p>

            {/* Countdown Banner */}
            <CountdownBanner
              showCountdown={showCountdown}
              setShowCountdown={setShowCountdown}
              theme={theme}
            />
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-12"
          >
            <h2 className={`text-2xl font-bold ${textColor} mb-6`}>
              Filter by Category
            </h2>
            <CategoryFilter
              categories={categories}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              theme={theme}
            />
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <StatsSection theme={theme} />
          </motion.div>

          {/* New Arrivals Grid */}
          <div className="mb-20">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className={`text-3xl font-bold ${textColor}`}>
                  Latest Products
                </h2>
                <p className={`${subtitleColor} mt-2`}>
                  {filteredProducts.length} new arrivals{" "}
                  {activeCategory !== "all" &&
                    `in ${
                      categories.find((c) => c.id === activeCategory)?.name
                    }`}
                </p>
              </div>
              <div className={`flex items-center gap-2 text-purple-600 font-semibold ${theme === 'dark' ? 'text-purple-400' : ''}`}>
                <span>Sort by: Newest</span>
                <ChevronRight className="w-5 h-5" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map((product, index) => (
                <NewArrivalCard
                  key={product.id}
                  product={product}
                  index={index}
                  theme={theme}
                />
              ))}
            </div>

            {/* No results message */}
            {filteredProducts.length === 0 && (
              <div className={`text-center py-20 ${noResultsBg} rounded-2xl backdrop-blur-sm`}>
                <div className="text-6xl mb-6">🔍</div>
                <h3 className={`text-2xl font-bold mb-4 ${textColor}`}>
                  No new arrivals in this category
                </h3>
                <p className={`${noResultsText} max-w-md mx-auto`}>
                  Check back soon for new products or explore other categories.
                </p>
              </div>
            )}
          </div>

          {/* Newsletter CTA */}
          <NewsletterSignup theme={theme} />
        </div>
      </section>
    </div>
  );
};

export default NewArrivals;