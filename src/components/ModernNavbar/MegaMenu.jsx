import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
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
                            className={`p-2 rounded-lg ${
                              feature.color === "purple"
                                ? "bg-purple-100 text-purple-600"
                                : feature.color === "blue"
                                ? "bg-blue-100 text-blue-600"
                                : feature.color === "pink"
                                ? "bg-pink-100 text-pink-600"
                                : feature.color === "green"
                                ? "bg-green-100 text-green-600"
                                : feature.color === "orange"
                                ? "bg-orange-100 text-orange-600"
                                : "bg-cyan-100 text-cyan-600"
                            }`}
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

export default MegaMenu;