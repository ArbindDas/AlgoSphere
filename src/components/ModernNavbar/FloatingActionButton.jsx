import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles } from "lucide-react";

const FloatingActionButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    { icon: "🚀", label: "Start Trial", color: "bg-purple-500" },
    { icon: "💬", label: "Live Chat", color: "bg-blue-500" },
    { icon: "📞", label: "Call Sales", color: "bg-green-500" },
    { icon: "📊", label: "Demo", color: "bg-pink-500" },
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
                className={`flex items-center gap-3 ${action.color} text-white px-4 py-3 rounded-xl shadow-lg hover:shadow-xl transition-shadow`}
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
        className="w-14 h-14 rounded-2xl bg-linear-to-r from-purple-600 to-pink-600 text-white shadow-2xl shadow-purple-500/40 flex items-center justify-center"
      >
        {isOpen ? <X size={24} /> : <Sparkles size={24} />}
      </motion.button>
    </div>
  );
};

export default FloatingActionButton;