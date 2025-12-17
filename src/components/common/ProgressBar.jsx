
import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";

const ProgressBar = ({ scaleX }) => {
  const { theme } = useTheme();

  // Theme-based gradient colors
  const gradient = theme === 'dark'
    ? 'from-purple-600 via-pink-600 to-blue-600' // Brighter colors for dark theme
    : 'from-purple-500 via-pink-500 to-blue-500'; // Original colors for light theme

  return (
    <motion.div
      className={`fixed top-0 left-0 right-0 h-1 bg-linear-to-r ${gradient} origin-left z-50`}
      style={{ scaleX }}
    />
  );
};

export default ProgressBar;