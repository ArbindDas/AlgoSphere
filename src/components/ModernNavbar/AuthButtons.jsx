

// import React from "react";
// import { motion } from "framer-motion";
// import { LogIn, UserPlus, Sun, Moon } from "lucide-react";
// import { useTheme } from "../../context/ThemeContext";

// const AuthButtons = ({ navigate }) => {
//   const { theme, toggleTheme } = useTheme();

//   return (
//     <div className="flex items-center gap-4 ml-4">
//       {/* Login Button */}
//       <motion.button
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//         onClick={() => navigate("/login")}
//         className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 font-semibold transition-all ${
//           theme === 'dark'
//             ? 'border-purple-700 text-purple-300 hover:bg-purple-900/30 hover:border-purple-600'
//             : 'border-purple-200 text-purple-600 hover:bg-purple-50 hover:border-purple-300'
//         }`}
//       >
//         <LogIn size={18} />
//         Login
//       </motion.button>

//       {/* Signup Button */}
//       <motion.button
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//         onClick={() => navigate("/signup")}
//         className={`px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold transition-all flex items-center gap-2 ${
//           theme === 'dark'
//             ? 'shadow-lg shadow-purple-900/40 hover:shadow-xl hover:shadow-purple-900/60'
//             : 'shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40'
//         } hover:scale-105 active:scale-95`}
//       >
//         <UserPlus size={18} />
//         Sign Up Free
//       </motion.button>

//       {/* Theme Toggle */}
//       <motion.button
//         whileHover={{ scale: 1.05, rotate: 15 }}
//         whileTap={{ scale: 0.95 }}
//         onClick={toggleTheme}
//         className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
//           theme === 'dark'
//             ? 'border border-gray-700 bg-gray-800/50 hover:border-purple-700 hover:bg-purple-900/30'
//             : 'border border-gray-300 hover:border-purple-300 hover:bg-purple-50/50'
//         }`}
//         aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
//       >
//         {theme === 'dark' ? (
//           <Sun size={18} className="text-yellow-300" />
//         ) : (
//           <Moon size={18} className="text-gray-600" />
//         )}
//       </motion.button>
//     </div>
//   );
// };

// export default AuthButtons;


import React from "react";
import { motion } from "framer-motion";
import { LogIn, UserPlus } from "lucide-react"; // Remove Sun, Moon imports
import { useTheme } from "../../context/ThemeContext";

const AuthButtons = ({ navigate }) => {
  const { theme } = useTheme(); // Remove toggleTheme

  return (
    <div className="flex items-center gap-4 ml-4">
      {/* Login Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate("/login")}
        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 font-semibold transition-all ${
          theme === 'dark'
            ? 'border-purple-700 text-purple-300 hover:bg-purple-900/30 hover:border-purple-600'
            : 'border-purple-200 text-purple-600 hover:bg-purple-50 hover:border-purple-300'
        }`}
      >
        <LogIn size={18} />
        Login
      </motion.button>

      {/* Signup Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate("/signup")}
        className={`px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold transition-all flex items-center gap-2 ${
          theme === 'dark'
            ? 'shadow-lg shadow-purple-900/40 hover:shadow-xl hover:shadow-purple-900/60'
            : 'shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40'
        } hover:scale-105 active:scale-95`}
      >
        <UserPlus size={18} />
        Sign Up Free
      </motion.button>

      {/* REMOVE THE THEME TOGGLE BUTTON FROM HERE */}
      {/* Keep only Login and Signup buttons */}
    </div>
  );
};  

export default AuthButtons;