

import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const SecurityBadge = ({ icon: Icon, text, delay }) => {
  const { theme } = useTheme();

  // Theme-based styles
  const badgeBg = theme === 'dark'
    ? 'bg-gray-800/50 backdrop-blur-sm'
    : 'bg-white/50 backdrop-blur-sm';

  const textColor = theme === 'dark'
    ? 'text-gray-300'
    : 'text-gray-700';

  const iconBg = theme === 'dark'
    ? 'bg-gradient-to-r from-emerald-600 to-cyan-600'
    : 'bg-gradient-to-r from-emerald-500 to-cyan-500';

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      className={`flex items-center gap-3 p-3 rounded-lg ${badgeBg}`}
    >
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white ${iconBg}`}>
        <Icon size={20} />
      </div>
      <span className={`text-sm ${textColor}`}>{text}</span>
    </motion.div>
  );
};

export default SecurityBadge;