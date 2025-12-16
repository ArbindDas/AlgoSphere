// import { motion, AnimatePresence } from "framer-motion";

// import SecurityBadge from "./SecurityBadge";
// // OAuth Button Component
// const OAuthButton = ({ provider, icon: Icon, onClick }) => {
//   const providers = {
//     github: {
//       bg: "bg-gray-900",
//       hover: "hover:bg-gray-800",
//       text: "Continue with GitHub",
//     },
//     google: {
//       bg: "bg-white",
//       hover: "hover:bg-gray-50",
//       text: "Continue with Google",
//       border: true,
//     },
//   };

//   const config = providers[provider] || providers.github;

//   return (
//     <motion.button
//       whileHover={{ scale: 1.02, y: -2 }}
//       whileTap={{ scale: 0.98 }}
//       onClick={onClick}
//       className={`w-full py-3.5 rounded-xl ${config.bg} ${config.hover} ${
//         config.border ? "border border-gray-300" : ""
//       } ${
//         provider === "google" ? "text-gray-800" : "text-white"
//       } font-semibold transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl`}
//     >
//       <Icon size={20} />
//       {config.text}
//     </motion.button>
//   );
// };

// export default OAuthButton;

import React from "react";
import { motion } from "framer-motion";
import { Github, Chrome } from "lucide-react";

const OAuthButton = ({ provider, onClick }) => {
  const providers = {
    github: {
      Icon: Github,
      bg: "bg-gray-900",
      hover: "hover:bg-gray-800",
      text: "Continue with GitHub",
    },
    google: {
      Icon: Chrome,
      bg: "bg-white",
      hover: "hover:bg-gray-50",
      text: "Continue with Google",
      border: true,
    },
  };

  const config = providers[provider] || providers.github;
  const Icon = config.Icon;

  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        w-full py-3.5 rounded-xl 
        ${config.bg} ${config.hover}
        ${config.border ? "border border-gray-300" : ""}
        ${provider === "google" ? "text-gray-800" : "text-white"}
        font-semibold transition-all duration-300 
        flex items-center justify-center gap-3 
        shadow-lg hover:shadow-xl
      `}
    >
      <Icon size={20} />
      {config.text}
    </motion.button>
  );
};

export default OAuthButton;  // Make sure this is exported!