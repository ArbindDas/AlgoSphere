import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle } from "lucide-react";

export const SubmitError = ({ error, loginAttempts = 0 }) => {
  if (!error) return null;
  
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        className="mb-6 p-4 rounded-xl bg-linear-to-r from-red-50 to-orange-50 border border-red-100"
      >
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
          <div>
            <h4 className="font-semibold text-red-700 text-sm mb-1">
              Login Failed
            </h4>
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
