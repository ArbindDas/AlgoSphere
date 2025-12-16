import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle } from "lucide-react";

const FormStatus = ({ errors, isFormValid, acceptTerms }) => {
  return (
    <AnimatePresence>
      {Object.keys(errors).length > 0 && !errors.submit && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="p-3 rounded-lg bg-amber-50 border border-amber-200"
        >
          <p className="text-xs text-amber-700">
            Please fix the errors above before submitting
          </p>
        </motion.div>
      )}
      
      {isFormValid && acceptTerms && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="p-3 rounded-lg bg-emerald-50 border border-emerald-200"
        >
          <p className="text-xs text-emerald-700 flex items-center gap-1">
            <CheckCircle size={12} />
            All fields are valid. Ready to create your account!
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FormStatus;