// Security Badge Component
import { motion, AnimatePresence } from "framer-motion";
const SecurityBadge = ({ icon: Icon, text, delay }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay }}
    className="flex items-center gap-3 p-3 rounded-lg bg-white/50 backdrop-blur-sm"
  >
    <div className="w-10 h-10 rounded-lg bg-linear-to-r from-emerald-500 to-cyan-500 flex items-center justify-center text-white">
      <Icon size={20} />
    </div>
    <span className="text-sm text-gray-700">{text}</span>
  </motion.div>
);



export default SecurityBadge;