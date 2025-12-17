

import { motion } from "framer-motion";
import { Tag } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const DailyDeals = ({ theme: propTheme }) => {
  // Use context if available, otherwise use prop
  const themeContext = useTheme();
  const theme = propTheme || (themeContext?.theme || 'light');

  return (
    <>
      {/* Daily Deals Banner */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className={`relative rounded-3xl overflow-hidden shadow-2xl ${
              theme === 'dark' ? 'shadow-black/20' : 'shadow-black/10'
            }`}
          >
            {/* Background gradient */}
            <div className={`absolute inset-0 bg-gradient-to-r ${
              theme === 'dark'
                ? 'from-blue-700/10 to-purple-700/10'
                : 'from-blue-600/10 to-purple-600/10'
            }`} />

            <div className="relative p-12 text-center">
              {/* Flash sale badge */}
              <div className={`inline-flex items-center gap-2 mb-6 px-6 py-3 rounded-full backdrop-blur-xl border shadow-sm ${
                theme === 'dark'
                  ? 'bg-gray-800/80 border-gray-700'
                  : 'bg-white/80 border-gray-200'
              }`}>
                <Tag size={16} className="text-red-500" />
                <span className="font-semibold text-red-600">
                  FLASH SALE ENDS IN: 23:59:59
                </span>
              </div>

              {/* Title */}
              <h3 className={`text-3xl font-bold mb-4 ${
                theme === 'dark' ? 'text-gray-100' : 'text-gray-800'
              }`}>
                Daily Deals & Discounts
              </h3>

              {/* Description */}
              <p className={`max-w-2xl mx-auto mb-8 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Don't miss out on limited-time offers! Up to 70% off on selected items
              </p>

              {/* CTA Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-10 py-4 rounded-xl bg-gradient-to-r from-red-600 to-pink-600 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 ${
                  theme === 'dark'
                    ? 'shadow-red-900/40 hover:shadow-red-900/60'
                    : 'shadow-red-500/30 hover:shadow-red-500/40'
                }`}
              >
                Shop Deals Now
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default DailyDeals;