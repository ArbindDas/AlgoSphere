import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, CheckCircle } from "lucide-react";

export const FormStatus = ({ errors, isFormValid, isFormComplete, loginAttempts = 0 }) => {
  return (
    <AnimatePresence>
      {/* Error Summary */}
      {Object.keys(errors).length > 0 && !errors.submit && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="p-3 rounded-lg bg-amber-50 border border-amber-200"
        >
          <p className="text-xs text-amber-700 flex items-center gap-1">
            <AlertCircle size={12} />
            Please fix the errors above before signing in
          </p>
        </motion.div>
      )}
      
      {/* Ready State */}
      {isFormValid && !errors.submit && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="p-3 rounded-lg bg-emerald-50 border border-emerald-200"
        >
          <p className="text-xs text-emerald-700 flex items-center gap-1">
            <CheckCircle size={12} />
            All fields are valid. Ready to sign in!
          </p>
        </motion.div>
      )}
      
      {/* Incomplete Form Hint */}
      {!isFormComplete && Object.keys(errors).length === 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="p-3 rounded-lg bg-blue-50 border border-blue-200"
        >
          <p className="text-xs text-blue-700">
            Fill in your email and password to continue
          </p>
        </motion.div>
      )}
      
      {/* Security notice for multiple failed attempts */}
      {loginAttempts >= 2 && errors.submit && (
        <div className="mt-2 pt-2 border-t border-red-100">
          <p className="text-xs text-red-500">
            {loginAttempts >= 3 ? 
              "Multiple failed attempts detected. Consider resetting your password." :
              "Having trouble? Try resetting your password."
            }
          </p>
        </div>
      )}
    </AnimatePresence>
  );
};
