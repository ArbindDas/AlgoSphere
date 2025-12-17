// components/common/ProgressBar.jsx
import React from "react";
import { motion } from "framer-motion";

const ProgressBar = ({ scaleX }) => {
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 origin-left z-50"
      style={{ scaleX }}
    />
  );
};

export default ProgressBar;