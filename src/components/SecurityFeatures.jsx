


import React from "react";
import { motion } from "framer-motion";
import { Shield, CreditCard, Truck, RotateCcw, Headphones, Award } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const SecurityFeatures = () => {
  const { theme } = useTheme();
  
  const features = [
    {
      icon: <Shield className="text-white" size={24} />,
      title: "Bank-Level Security",
      description: "256-bit SSL encryption for all transactions",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <CreditCard className="text-white" size={24} />,
      title: "Secure Payments",
      description: "Multiple payment options with fraud protection",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Truck className="text-white" size={24} />,
      title: "Guaranteed Delivery",
      description: "Track your order with real-time updates",
      color: "from-emerald-500 to-teal-500"
    },
    {
      icon: <RotateCcw className="text-white" size={24} />,
      title: "Easy Returns",
      description: "30-day return policy, no questions asked",
      color: "from-orange-500 to-amber-500"
    },
    {
      icon: <Headphones className="text-white" size={24} />,
      title: "24/7 Support",
      description: "Live chat and phone support available",
      color: "from-indigo-500 to-blue-500"
    },
    {
      icon: <Award className="text-white" size={24} />,
      title: "Verified Sellers",
      description: "All sellers are thoroughly vetted",
      color: "from-green-500 to-emerald-500"
    }
  ];

  // Theme-based styles
  const cardBg = theme === 'dark'
    ? 'bg-gray-800/95 backdrop-blur-xl border-gray-700/40'
    : 'bg-white/95 backdrop-blur-xl border-white/40';

  const cardShadow = theme === 'dark'
    ? 'shadow-lg shadow-black/10 hover:shadow-xl hover:shadow-black/20'
    : 'shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/10';

  const titleColor = theme === 'dark'
    ? 'text-gray-100'
    : 'text-gray-800';

  const descriptionColor = theme === 'dark'
    ? 'text-gray-300'
    : 'text-gray-600';

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {features.map((feature, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className={`rounded-2xl p-6 transition-all duration-500 border ${cardBg} ${cardShadow}`}
        >
          <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.color} mb-4`}>
            {feature.icon}
          </div>
          <h4 className={`font-bold mb-2 ${titleColor}`}>{feature.title}</h4>
          <p className={`text-sm ${descriptionColor}`}>{feature.description}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default SecurityFeatures;