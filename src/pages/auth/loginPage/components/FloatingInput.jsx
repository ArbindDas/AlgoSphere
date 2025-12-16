// FloatingInput.jsx - FIXED VERSION
import React from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

const FloatingInput = React.forwardRef(({
  label,
  type = "text",
  icon: Icon,
  error,
  isValid, // DESTRUCTURE THIS BUT DON'T PASS TO INPUT
  showToggle = false,
  onToggle,
  ...props
}, ref) => {
  // Extract isValid from props so it doesn't get passed to input
  const { ...inputProps } = props;
  
  return (
    <div className="relative">
      <div className="relative">
        {Icon && (
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
            <Icon className={`w-5 h-5 ${error ? 'text-red-500' : 'text-gray-400'}`} />
          </div>
        )}
        
        <input
          ref={ref}
          type={type}
          className={`
            w-full px-4 ${Icon ? 'pl-12' : 'pl-4'} py-4 
            bg-white/50 border rounded-2xl
            focus:outline-none focus:ring-2 focus:ring-purple-500/50
            transition-all duration-300
            ${error 
              ? 'border-red-300 focus:border-red-500' 
              : 'border-gray-300 focus:border-purple-500'
            }
            ${isValid ? 'border-emerald-300' : ''}
            peer
          `}
          placeholder=" "
          {...inputProps} // Pass all other props EXCEPT isValid
        />
        
        <label className={`
          absolute left-4 ${Icon ? 'left-12' : 'left-4'} top-1/2 -translate-y-1/2
          px-1 bg-white text-gray-500
          transition-all duration-300
          peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-gray-400
          peer-placeholder-shown:text-base peer-placeholder-shown:font-normal
          peer-focus:top-0 peer-focus:text-sm peer-focus:font-medium
          ${props.value ? 'top-0 text-sm font-medium' : ''}
          ${error ? 'text-red-600' : 'peer-focus:text-purple-600'}
          ${isValid ? 'text-emerald-600' : ''}
          pointer-events-none
        `}>
          {label}
        </label>
        
        {showToggle && (
          <button
            type="button"
            onClick={onToggle}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {type === "password" ? <Eye size={20} /> : <EyeOff size={20} />}
          </button>
        )}
      </div>
      
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-500 text-sm mt-2 ml-4"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
});

FloatingInput.displayName = "FloatingInput";

export default FloatingInput;