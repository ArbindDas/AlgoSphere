

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import {
  Sparkles,
  ChevronRight,
  Award,
  Globe,
  Lock,
  Zap,
  Smartphone,
  Shield,
  BarChart3,
  Cloud
} from "lucide-react";

const MegaMenu = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { theme } = useTheme();

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

  // Color mapping for dark/light modes
  const getColorClass = (color, isBg = true) => {
    const base = isBg ? 'bg' : 'text';
    const darkIntensity = theme === 'dark' ? '700' : '100';
    const lightIntensity = theme === 'dark' ? '300' : '600';
    
    const colorMap = {
      purple: `${base}-${color}-${darkIntensity} ${isBg ? `text-purple-${lightIntensity}` : ''}`,
      blue: `${base}-${color}-${darkIntensity} ${isBg ? `text-blue-${lightIntensity}` : ''}`,
      pink: `${base}-${color}-${darkIntensity} ${isBg ? `text-pink-${lightIntensity}` : ''}`,
      green: `${base}-${color}-${darkIntensity} ${isBg ? `text-green-${lightIntensity}` : ''}`,
      orange: `${base}-${color}-${darkIntensity} ${isBg ? `text-orange-${lightIntensity}` : ''}`,
      cyan: `${base}-${color}-${darkIntensity} ${isBg ? `text-cyan-${lightIntensity}` : ''}`,
    };
    
    return colorMap[color] || colorMap.purple;
  };

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
            className={`fixed top-20 left-1/2 -translate-x-1/2 w-[95vw] max-w-6xl backdrop-blur-2xl rounded-3xl border z-50 overflow-hidden ${
              theme === 'dark'
                ? 'bg-gray-900/95 border-gray-800/40 shadow-2xl shadow-black/40'
                : 'bg-white/95 border-white/40 shadow-2xl shadow-black/20'
            }`}
          >
            <div className="p-8">
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Features */}
                <div>
                  <h3 className={`text-lg font-bold mb-6 flex items-center gap-2 ${
                    theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
                  }`}>
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
                        className={`group p-4 rounded-xl transition-all cursor-pointer ${
                          theme === 'dark'
                            ? 'hover:bg-gray-800/50'
                            : 'hover:bg-gray-50/50'
                        }`}
                        onClick={() => {
                          navigate("/new");
                          onClose();
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${getColorClass(feature.color)}`}>
                            {feature.icon}
                          </div>

                          
                          <div>
                            <h4 className={`font-semibold ${
                              theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
                            }`}>
                              {feature.title}
                            </h4>
                            <p className={`text-sm ${
                              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                              {feature.desc}
                            </p>
                          </div>
                          <ChevronRight
                            size={16}
                            className={`ml-auto transition-colors ${
                              theme === 'dark'
                                ? 'text-gray-500 group-hover:text-purple-400'
                                : 'text-gray-400 group-hover:text-purple-500'
                            }`}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Use Cases */}
                <div>
                  <h3 className={`text-lg font-bold mb-6 ${
                    theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
                  }`}>
                    Popular Industries
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {useCases.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className={`p-4 rounded-xl border transition-all cursor-pointer group ${
                          theme === 'dark'
                            ? 'border-gray-700 hover:border-purple-700 hover:bg-gray-800/50'
                            : 'border-gray-200 hover:border-purple-300 hover:shadow-md'
                        }`}
                        onClick={() => {
                          navigate("/about");
                          onClose();
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{item.icon}</span>
                          <span className={`font-medium transition-colors ${
                            theme === 'dark'
                              ? 'text-gray-300 group-hover:text-purple-400'
                              : 'text-gray-800 group-hover:text-purple-600'
                          }`}>
                            {item.category}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Quick Links */}
                  <div className={`mt-8 p-4 rounded-xl border ${
                    theme === 'dark'
                      ? 'bg-gradient-to-r from-purple-900/20 to-pink-900/20 border-purple-800/30'
                      : 'bg-gradient-to-r from-purple-50 to-pink-50 border-purple-100'
                  }`}>
                    <h4 className={`font-bold mb-3 ${
                      theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
                    }`}>
                      Quick Start
                    </h4>
                    <div className="space-y-2">
                      <button
                        onClick={() => {
                          navigate("/new");
                          onClose();
                        }}
                        className={`w-full text-left p-3 rounded-lg transition-colors ${
                          theme === 'dark'
                            ? 'text-gray-300 hover:text-purple-400 hover:bg-gray-800/50'
                            : 'text-gray-700 hover:text-purple-600 hover:bg-white'
                        }`}
                      >
                        🚀 Start Free Trial
                      </button>
                      <button
                        onClick={() => {
                          navigate("/about");
                          onClose();
                        }}
                        className={`w-full text-left p-3 rounded-lg transition-colors ${
                          theme === 'dark'
                            ? 'text-gray-300 hover:text-purple-400 hover:bg-gray-800/50'
                            : 'text-gray-700 hover:text-purple-600 hover:bg-white'
                        }`}
                      >
                        📞 Schedule Demo
                      </button>
                    </div>
                  </div>
                </div>

                {/* Plans Preview */}
                <div>
                  <h3 className={`text-lg font-bold mb-6 ${
                    theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
                  }`}>
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
                        className={`p-4 rounded-xl border-2 transition-all cursor-pointer group ${
                          plan.popular
                            ? theme === 'dark'
                              ? 'border-purple-700'
                              : 'border-purple-300'
                            : theme === 'dark'
                              ? 'border-gray-700'
                              : 'border-gray-200'
                        } ${
                          theme === 'dark'
                            ? 'hover:border-purple-600 hover:bg-gray-800/30'
                            : 'hover:border-purple-400'
                        }`}
                        onClick={() => {
                          navigate("/new");
                          onClose();
                        }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h4 className={`font-bold ${
                              theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
                            }`}>
                              {plan.name}
                            </h4>
                            <p className={`text-sm ${
                              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                              {plan.desc}
                            </p>
                          </div>
                          {plan.popular && (
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                              theme === 'dark'
                                ? 'bg-purple-900/50 text-purple-300'
                                : 'bg-purple-100 text-purple-600'
                            }`}>
                              POPULAR
                            </span>
                          )}
                        </div>
                        <div className="flex items-baseline gap-2">
                          <span className={`text-2xl font-bold ${
                            theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
                          }`}>
                            {plan.price}
                          </span>
                          <span className={theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}>
                            /month
                          </span>
                        </div>
                        <div className={`mt-3 h-2 rounded-full overflow-hidden ${
                          theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'
                        }`}>
                          <div
                            className={`h-full bg-gradient-to-r ${plan.color} transition-all duration-500 group-hover:w-full`}
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
            <div className={`border-t p-6 ${
              theme === 'dark'
                ? 'bg-gradient-to-r from-gray-900/80 to-gray-800/80 border-gray-800'
                : 'bg-gradient-to-r from-gray-50 to-white border-gray-200'
            }`}>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-6">
                  <span className={`text-sm flex items-center gap-2 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    <Award size={14} className="text-purple-500" />
                    50,000+ Happy Customers
                  </span>
                  <span className={`text-sm flex items-center gap-2 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    <Globe size={14} className="text-blue-500" />
                    Global Support 24/7
                  </span>
                  <span className={`text-sm flex items-center gap-2 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    <Lock size={14} className="text-green-500" />
                    Enterprise Security
                  </span>
                </div>
                <button
                  onClick={() => {
                    navigate("/new");
                    onClose();
                  }}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all"
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

export default MegaMenu;