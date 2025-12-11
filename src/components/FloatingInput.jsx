// Floating Input Component
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

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

  return (
    <div className="relative">
      <motion.div
        initial={false}
        animate={{
          scale: isFocused ? 1.02 : 1,
          borderColor: error ? "#ef4444" : isFocused ? "#8b5cf6" : "#e5e7eb",
        }}
        className="relative bg-white/80 backdrop-blur-sm border-2 rounded-xl overflow-hidden group"
      >
        <div className="absolute left-4 top-1/2 -translate-y-1/2">
          <Icon
            size={20}
            className={
              error
                ? "text-red-500"
                : isFocused
                ? "text-purple-600"
                : "text-gray-400"
            }
          />
        </div>

        <input
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-full pl-12 pr-12 py-4 bg-transparent text-gray-800 placeholder-gray-400 focus:outline-none"
          placeholder={label}
          {...props}
        />

        {showToggle && (
          <button
            type="button"
            onClick={onToggle}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {type === "password" ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </motion.div>

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-500 text-sm mt-2 ml-4"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};


export default FloatingInput;