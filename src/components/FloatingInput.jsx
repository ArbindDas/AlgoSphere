

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const FloatingInput = ({
  label,
  type = "text",
  icon: Icon,
  value,
  onChange,
  error,
  showToggle = false,
  onToggle,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const { theme } = useTheme();

  // Theme-based styles
  const inputBg = theme === 'dark'
    ? 'bg-gray-800/80 backdrop-blur-sm'
    : 'bg-white/80 backdrop-blur-sm';

  const inputBorder = theme === 'dark'
    ? 'border-gray-700'
    : 'border-gray-200';

  const focusBorderColor = error 
    ? '#ef4444' 
    : isFocused 
      ? '#8b5cf6' 
      : theme === 'dark' ? '#4b5563' : '#e5e7eb';

  const iconColor = error
    ? 'text-red-500'
    : isFocused
      ? 'text-purple-600'
      : theme === 'dark' ? 'text-gray-500' : 'text-gray-400';

  const inputTextColor = theme === 'dark'
    ? 'text-gray-100'
    : 'text-gray-800';

  const placeholderColor = theme === 'dark'
    ? 'placeholder-gray-500'
    : 'placeholder-gray-400';

  const toggleButtonColor = theme === 'dark'
    ? 'text-gray-500 hover:text-gray-300'
    : 'text-gray-400 hover:text-gray-600';

  const errorTextColor = theme === 'dark'
    ? 'text-red-400'
    : 'text-red-500';

  return (
    <div className="relative">
      <motion.div
        initial={false}
        animate={{
          scale: isFocused ? 1.02 : 1,
          borderColor: focusBorderColor,
        }}
        className={`relative ${inputBg} border-2 rounded-xl overflow-hidden group ${inputBorder}`}
      >
        <div className="absolute left-4 top-1/2 -translate-y-1/2">
          <Icon
            size={20}
            className={iconColor}
          />
        </div>

        <input
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`w-full pl-12 pr-12 py-4 bg-transparent focus:outline-none ${inputTextColor} ${placeholderColor}`}
          placeholder={label}
          {...props}
        />

        {showToggle && (
          <button
            type="button"
            onClick={onToggle}
            className={`absolute right-4 top-1/2 -translate-y-1/2 ${toggleButtonColor}`}
          >
            {type === "password" ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </motion.div>

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-sm mt-2 ml-4 ${errorTextColor}`}
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};

export default FloatingInput;