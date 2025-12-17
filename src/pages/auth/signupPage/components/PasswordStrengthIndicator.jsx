
import React from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { useTheme } from "../../../../context/ThemeContext";

const PasswordStrengthIndicator = ({ 
  password, 
  strength, 
  requirements,
  theme: propTheme // Accept theme as prop for flexibility
}) => {
  const contextTheme = useTheme();
  const theme = propTheme || contextTheme.theme; // Use prop if provided, otherwise use context
  
  if (!password) return null;

  // Theme-based styles
  const strengthLabelColor = theme === 'dark'
    ? 'text-gray-300'
    : 'text-gray-700';

  const strengthBarBg = theme === 'dark'
    ? 'bg-gray-700'
    : 'bg-gray-200';

  const requirementsCardBg = theme === 'dark'
    ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700'
    : 'bg-gradient-to-br from-gray-50 to-white border-gray-200';

  const requirementsTitleColor = theme === 'dark'
    ? 'text-gray-100'
    : 'text-gray-800';

  const requirementsCountColor = theme === 'dark'
    ? 'text-emerald-400'
    : 'text-emerald-600';

  const unmetIconColor = theme === 'dark'
    ? 'text-gray-600'
    : 'text-gray-300';

  const unmetTextColor = theme === 'dark'
    ? 'text-gray-400'
    : 'text-gray-500';

  const metIconColor = theme === 'dark'
    ? 'text-green-400'
    : 'text-green-500';

  const metTextColor = theme === 'dark'
    ? 'text-green-300 font-medium'
    : 'text-green-600 font-medium';

  const tipBorderColor = theme === 'dark'
    ? 'border-gray-700'
    : 'border-gray-100';

  const tipTextColor = theme === 'dark'
    ? 'text-gray-300'
    : 'text-gray-600';

  const tipAccentColor = theme === 'dark'
    ? 'text-gray-100'
    : 'text-gray-800';

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      className="overflow-hidden"
    >
      {/* Strength Bar */}
      <div className="flex items-center justify-between mb-1">
        <span className={`text-xs font-medium ${strengthLabelColor}`}>
          Password Strength:
        </span>
        <span className={`text-xs font-bold ${strength.color}`}>
          {strength.level}
        </span>
      </div>
      <div className={`w-full rounded-full h-1.5 mb-2 ${strengthBarBg}`}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${strength.percentage}%` }}
          className={`h-1.5 rounded-full ${strength.bg}`}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Password Requirements */}
      <div className={`p-3 rounded-xl border ${requirementsCardBg}`}>
        <div className="flex justify-between items-center mb-2">
          <h4 className={`font-semibold text-sm ${requirementsTitleColor}`}>
            Password Requirements
          </h4>
          <span className={`text-xs font-medium ${requirementsCountColor}`}>
            {strength.metCount}/{requirements.length}
          </span>
        </div>
        <div className="space-y-1">
          {requirements.map((req, index) => (
            <motion.div
              key={index}
              initial={false}
              animate={{
                opacity: password ? 1 : 0.7,
                scale: req.met && password ? 1.02 : 1
              }}
              className="flex items-center gap-2"
            >
              <motion.div
                initial={false}
                animate={{
                  scale: req.met && password ? [1, 1.2, 1] : 1
                }}
                transition={{ duration: 0.2 }}
              >
                <CheckCircle
                  size={14}
                  className={
                    req.met && password ? metIconColor : unmetIconColor
                  }
                />
              </motion.div>
              <span
                className={`text-xs transition-colors ${
                  req.met && password ? metTextColor : unmetTextColor
                }`}
              >
                {req.text}
              </span>
            </motion.div>
          ))}
        </div>
        
        {/* Additional password tips */}
        {password && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className={`mt-2 pt-2 border-t ${tipBorderColor}`}
          >
            <p className={`text-xs ${tipTextColor}`}>
              <span className={`font-medium ${tipAccentColor}`}>Tip:</span> Use a mix of letters, numbers, and symbols for maximum security
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default PasswordStrengthIndicator;