

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const FloatingActionButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useTheme();

  const actions = [
    { icon: "🚀", label: "Start Trial", color: "from-purple-600 to-pink-600" },
    { icon: "💬", label: "Live Chat", color: "from-blue-600 to-cyan-600" },
    { icon: "📞", label: "Call Sales", color: "from-green-600 to-emerald-600" },
    { icon: "📊", label: "Demo", color: "from-pink-600 to-rose-600" },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.3 }}
            className="absolute bottom-16 right-0 space-y-3"
          >
            {actions.map((action, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center gap-3 bg-gradient-to-r ${action.color} text-white px-4 py-3 rounded-xl ${
                  theme === 'dark'
                    ? 'shadow-lg shadow-black/40'
                    : 'shadow-lg shadow-purple-500/30'
                } hover:shadow-xl transition-shadow`}
              >
                <span className="text-xl">{action.icon}</span>
                <span className="font-semibold">{action.label}</span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white flex items-center justify-center ${
          theme === 'dark'
            ? 'shadow-2xl shadow-purple-900/50 border border-purple-500/20'
            : 'shadow-2xl shadow-purple-500/40 border border-white/20'
        }`}
      >
        {isOpen ? <X size={24} /> : <Sparkles size={24} />}
      </motion.button>
    </div>
  );
};

export default FloatingActionButton;