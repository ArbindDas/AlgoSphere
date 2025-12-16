import React from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const PasswordStrengthIndicator = ({ 
  password, 
  strength, 
  requirements 
}) => {
  if (!password) return null;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      className="overflow-hidden"
    >
      {/* Strength Bar */}
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-medium text-gray-700">
          Password Strength:
        </span>
        <span className={`text-xs font-bold ${strength.color}`}>
          {strength.level}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-1.5 mb-2">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${strength.percentage}%` }}
          className={`h-1.5 rounded-full ${strength.bg}`}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Password Requirements */}
      <div className="p-3 rounded-xl bg-linear-to-br from-gray-50 to-white border border-gray-200">
        <div className="flex justify-between items-center mb-2">
          <h4 className="font-semibold text-gray-800 text-sm">
            Password Requirements
          </h4>
          <span className="text-xs font-medium text-emerald-600">
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
                    req.met && password ? "text-green-500" : "text-gray-300"
                  }
                />
              </motion.div>
              <span
                className={`text-xs transition-colors ${
                  req.met && password ? "text-green-600 font-medium" : "text-gray-500"
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
            className="mt-2 pt-2 border-t border-gray-100"
          >
            <p className="text-xs text-gray-600">
              <span className="font-medium">Tip:</span> Use a mix of letters, numbers, and symbols for maximum security
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default PasswordStrengthIndicator;