
import React from "react";
import { motion } from "framer-motion";
import { Github, Chrome } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const OAuthButton = ({ provider, onClick }) => {
  const { theme } = useTheme();
  
  const providers = {
    github: {
      Icon: Github,
      light: {
        bg: "bg-gray-900",
        hover: "hover:bg-gray-800",
        text: "text-white"
      },
      dark: {
        bg: "bg-gray-800",
        hover: "hover:bg-gray-700",
        text: "text-white"
      },
      text: "Continue with GitHub",
    },
    google: {
      Icon: Chrome,
      light: {
        bg: "bg-white",
        hover: "hover:bg-gray-50",
        text: "text-gray-800",
        border: "border border-gray-300"
      },
      dark: {
        bg: "bg-gray-700",
        hover: "hover:bg-gray-600",
        text: "text-white",
        border: "border border-gray-600"
      },
      text: "Continue with Google",
    },
  };

  const config = providers[provider] || providers.github;
  const Icon = config.Icon;
  
  // Get theme-specific styles
  const themeStyles = theme === 'dark' ? config.dark : config.light;
  
  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        w-full py-3.5 rounded-xl 
        ${themeStyles.bg} ${themeStyles.hover} ${themeStyles.text}
        ${themeStyles.border || ''}
        font-semibold transition-all duration-300 
        flex items-center justify-center gap-3 
        shadow-lg hover:shadow-xl
      `}
    >
      <Icon size={20} />
      {config.text}
    </motion.button>
  );
};

export default OAuthButton;