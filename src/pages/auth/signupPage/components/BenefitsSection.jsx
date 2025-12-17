

import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useTheme } from "../../../../context/ThemeContext";

const BenefitsSection = () => {
  const { theme } = useTheme();
  
  const benefits = [
    {
      icon: "🤖",
      title: "AI Personal Shopper",
      desc: "Smart recommendations based on your style",
    },
    {
      icon: "⚡",
      title: "Early Access",
      desc: "Be first to discover new products",
    },
    {
      icon: "🎯",
      title: "Exclusive Deals",
      desc: "Member-only discounts and offers",
    },
    {
      icon: "📊",
      title: "Smart Analytics",
      desc: "Track trends and optimize your shopping",
    },
  ];

  const stats = [
    { value: "30-day", label: "Free Trial" },
    { value: "No Credit Card", label: "Required" },
    { value: "256-bit", label: "Encryption" },
    { value: "24/7", label: "Support" },
  ];

  // Theme-based styles
  const badgeBg = theme === 'dark'
    ? 'bg-gray-800/80 backdrop-blur-xl border-gray-700/40'
    : 'bg-white/80 backdrop-blur-xl border-white/40';

  const titleColor = theme === 'dark'
    ? 'text-gray-100'
    : 'text-gray-800';

  const descriptionColor = theme === 'dark'
    ? 'text-gray-300'
    : 'text-gray-600';

  const benefitCardBg = theme === 'dark'
    ? 'bg-gray-800/50 hover:bg-gray-800/80 backdrop-blur-sm'
    : 'bg-white/50 hover:bg-white/80 backdrop-blur-sm';

  const benefitTitleColor = theme === 'dark'
    ? 'text-gray-100'
    : 'text-gray-800';

  const benefitDescColor = theme === 'dark'
    ? 'text-gray-400'
    : 'text-gray-600';

  const statCardBg = theme === 'dark'
    ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700'
    : 'bg-gradient-to-br from-white to-emerald-50 border-emerald-100';

  const statValueColor = theme === 'dark'
    ? 'text-emerald-400'
    : 'text-emerald-700';

  const statLabelColor = theme === 'dark'
    ? 'text-gray-400'
    : 'text-gray-600';

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="hidden lg:block"
    >
      <div className="space-y-6">
        <div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className={`inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full backdrop-blur-xl border shadow-lg ${badgeBg}`}
          >
            <Sparkles className="w-4 h-4 text-emerald-500" />
            <span className="bg-linear-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent font-bold text-sm">
              JOIN THE REVOLUTION
            </span>
          </motion.div>

          <h1 className={`text-4xl font-bold mb-4 ${titleColor}`}>
            Start Your
            <span className="block bg-linear-to-r from-emerald-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent">
              AI Shopping Journey
            </span>
          </h1>

          <p className={`mb-6 ${descriptionColor}`}>
            Get personalized recommendations, exclusive deals, and premium
            features designed to transform your shopping experience.
          </p>
        </div>

        {/* Benefits */}
        <div className="space-y-3">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className={`flex items-center gap-3 p-3 rounded-xl backdrop-blur-sm transition-colors ${benefitCardBg}`}
            >
              <div className="text-xl">{benefit.icon}</div>
              <div>
                <h4 className={`font-semibold text-sm ${benefitTitleColor}`}>
                  {benefit.title}
                </h4>
                <p className={`text-xs ${benefitDescColor}`}>{benefit.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-2 gap-3 mt-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              className={`text-center p-3 rounded-xl border ${statCardBg}`}
            >
              <div className={`text-base font-bold ${statValueColor}`}>
                {stat.value}
              </div>
              <div className={`text-xs ${statLabelColor}`}>{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default BenefitsSection;