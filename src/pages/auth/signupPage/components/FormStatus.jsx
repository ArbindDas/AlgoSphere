

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { useTheme } from "../../../../context/ThemeContext";

const FormStatus = ({ errors, isFormValid, acceptTerms }) => {
  const { theme } = useTheme();

  // Theme-based styles
  const errorBg = theme === 'dark'
    ? 'bg-amber-900/30 border-amber-800/50'
    : 'bg-amber-50 border-amber-200';

  const errorText = theme === 'dark'
    ? 'text-amber-300'
    : 'text-amber-700';

  const successBg = theme === 'dark'
    ? 'bg-emerald-900/30 border-emerald-800/50'
    : 'bg-emerald-50 border-emerald-200';

  const successText = theme === 'dark'
    ? 'text-emerald-300'
    : 'text-emerald-700';

  const iconColor = theme === 'dark'
    ? 'text-emerald-400'
    : 'text-emerald-600';

  return (
    <AnimatePresence>
      {Object.keys(errors).length > 0 && !errors.submit && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className={`p-3 rounded-lg border ${errorBg}`}
        >
          <p className={`text-xs ${errorText}`}>
            Please fix the errors above before submitting
          </p>
        </motion.div>
      )}
      
      {isFormValid && acceptTerms && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className={`p-3 rounded-lg border ${successBg}`}
        >
          <p className={`text-xs ${successText} flex items-center gap-1`}>
            <CheckCircle size={12} className={iconColor} />
            All fields are valid. Ready to create your account!
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FormStatus;