
// import React, { useState, useRef, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import * as THREE from "three";
// import {
//   Mail,
//   Lock,
//   User,
//   Eye,
//   EyeOff,
//   Github,
//   Chrome,
//   Sparkles,
//   CheckCircle,
//   ArrowRight,
//   Shield,
//   Smartphone,
// } from "lucide-react";
// import { Link, useNavigate } from "react-router-dom";
// import authService from "../../api/auth";

// import AuthBackground from "../../components/AuthBackground"
// import FloatingInput from "../../components/FloatingInput";
// import OAuthButton from "../../components/OAuthButton"

// export const SignupPage = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });
//   const [errors, setErrors] = useState({});
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [acceptTerms, setAcceptTerms] = useState(false);
  
//   // Track field focus state for real-time validation
//   const [fieldFocus, setFieldFocus] = useState({
//     fullName: false,
//     email: false,
//     password: false,
//     confirmPassword: false,
//   });
  
//   // Track if user has interacted with form
//   const [hasInteracted, setHasInteracted] = useState({
//     fullName: false,
//     email: false,
//     password: false,
//     confirmPassword: false,
//   });
  
//   // Debounce timer refs
//   const validationTimer = useRef(null);

//   // Real-time validation functions
//   const validateFullName = (value) => {
//     if (!value.trim()) {
//       return "Full name is required";
//     }
//     if (value.trim().length < 2) {
//       return "Name must be at least 2 characters";
//     }
//     if (value.trim().length > 50) {
//       return "Name is too long (max 50 characters)";
//     }
//     if (!/^[a-zA-Z\s]+$/.test(value.trim())) {
//       return "Name can only contain letters and spaces";
//     }
//     return "";
//   };

//   const validateEmail = (value) => {
//     if (!value) {
//       return "Email is required";
//     }
    
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(value)) {
//       return "Please enter a valid email address";
//     }
    
//     // Additional email validation
//     if (value.length > 100) {
//       return "Email is too long";
//     }
    
//     // Check for common email issues
//     if (value.includes("..") || value.includes(".@") || value.includes("@.")) {
//       return "Email format is invalid";
//     }
    
//     // Check for spaces in email
//     if (/\s/.test(value)) {
//       return "Email cannot contain spaces";
//     }
    
//     return "";
//   };

//   const validatePassword = (value) => {
//     if (!value) {
//       return "Password is required";
//     }
//     if (value.length < 8) {
//       return "Password must be at least 8 characters";
//     }
//     if (value.length > 50) {
//       return "Password is too long (max 50 characters)";
//     }
//     if (!/[A-Z]/.test(value)) {
//       return "Password must contain an uppercase letter";
//     }
//     if (!/[a-z]/.test(value)) {
//       return "Password must contain a lowercase letter";
//     }
//     if (!/\d/.test(value)) {
//       return "Password must contain a number";
//     }
//     if (!/[!@#$%^&*]/.test(value)) {
//       return "Password must contain a special character (!@#$%^&*)";
//     }
    
//     // Check for common weak passwords
//     const weakPasswords = [
//       'password', '12345678', 'qwerty123', 'admin123',
//       'welcome123', 'letmein123', 'monkey123', 'dragon123'
//     ];
    
//     if (weakPasswords.includes(value.toLowerCase())) {
//       return "Password is too common. Choose a stronger one";
//     }
    
//     // Check for sequential characters
//     if (/(abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz)/i.test(value)) {
//       return "Avoid sequential characters (e.g., abc, 123)";
//     }
    
//     // Check for repeated characters
//     if (/(.)\1{2,}/.test(value)) {
//       return "Avoid repeating the same character multiple times";
//     }
    
//     return "";
//   };

//   const validateConfirmPassword = (value, password) => {
//     if (!value) {
//       return "Please confirm your password";
//     }
//     if (value !== password) {
//       return "Passwords do not match";
//     }
//     return "";
//   };

//   // Real-time validation handler with debouncing
//   const handleRealTimeValidation = (field, value) => {
//     // Clear existing timer
//     if (validationTimer.current) {
//       clearTimeout(validationTimer.current);
//     }
    
//     // Set new timer for debouncing
//     validationTimer.current = setTimeout(() => {
//       let error = "";
      
//       switch (field) {
//         case 'fullName':
//           error = validateFullName(value);
//           break;
//         case 'email':
//           error = validateEmail(value);
//           break;
//         case 'password':
//           error = validatePassword(value);
          
//           // Also validate confirm password if it has content
//           if (formData.confirmPassword && hasInteracted.confirmPassword) {
//             const confirmError = validateConfirmPassword(formData.confirmPassword, value);
//             if (confirmError) {
//               setErrors(prev => ({
//                 ...prev,
//                 confirmPassword: confirmError
//               }));
//             } else {
//               setErrors(prev => ({
//                 ...prev,
//                 confirmPassword: ""
//               }));
//             }
//           }
//           break;
//         case 'confirmPassword':
//           error = validateConfirmPassword(value, formData.password);
//           break;
//         default:
//           break;
//       }
      
//       // Update errors state
//       setErrors(prev => ({
//         ...prev,
//         [field]: error
//       }));
      
//     }, 300); // 300ms debounce
//   };

//   // Handle input change with real-time validation
//   const handleInputChange = (field, value) => {
//     // Update form data
//     setFormData(prev => ({
//       ...prev,
//       [field]: value
//     }));
    
//     // Mark field as interacted
//     setHasInteracted(prev => ({
//       ...prev,
//       [field]: true
//     }));
    
//     // Clear submit error when user starts typing
//     if (errors.submit) {
//       setErrors(prev => ({
//         ...prev,
//         submit: ""
//       }));
//     }
    
//     // Trigger real-time validation
//     handleRealTimeValidation(field, value);
//   };

//   // Handle field blur
//   const handleFieldBlur = (field) => {
//     setFieldFocus(prev => ({
//       ...prev,
//       [field]: false
//     }));
    
//     // Force validation on blur if field has been interacted with
//     if (hasInteracted[field]) {
//       handleRealTimeValidation(field, formData[field]);
//     }
//   };

//   // Handle field focus
//   const handleFieldFocus = (field) => {
//     setFieldFocus(prev => ({
//       ...prev,
//       [field]: true
//     }));
//   };

//   // Final form validation before submission
//   const validateForm = () => {
//     const newErrors = {};
    
//     // Validate all fields
//     newErrors.fullName = validateFullName(formData.fullName);
//     newErrors.email = validateEmail(formData.email);
//     newErrors.password = validatePassword(formData.password);
//     newErrors.confirmPassword = validateConfirmPassword(formData.confirmPassword, formData.password);
    
//     // Terms validation
//     if (!acceptTerms) {
//       newErrors.terms = "You must accept the terms and conditions";
//     }
    
//     // Filter out empty errors
//     const filteredErrors = Object.fromEntries(
//       Object.entries(newErrors).filter(([_, value]) => value !== "")
//     );
    
//     setErrors(filteredErrors);
//     return Object.keys(filteredErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Mark all fields as interacted for final validation
//     setHasInteracted({
//       fullName: true,
//       email: true,
//       password: true,
//       confirmPassword: true,
//     });
    
//     if (!validateForm()) {
//       // Scroll to first error
//       const firstErrorField = Object.keys(errors)[0];
//       if (firstErrorField) {
//         const element = document.querySelector(`[data-field="${firstErrorField}"]`);
//         if (element) {
//           element.scrollIntoView({ behavior: 'smooth', block: 'center' });
//         }
//       }
//       return;
//     }
    
//     setIsLoading(true);
    
//     try {
//       const response = await authService.signup(
//         formData.fullName,
//         formData.email,
//         formData.password
//       );

//       console.log("Signup successful:", response);

//       // Show success state briefly before navigation
//       setIsLoading(false);
      
//       setTimeout(() => {
//         navigate("/login");
//       }, 1500);
      
//     } catch (error) {
//       setIsLoading(false);
      
//       // Handle different types of errors
//       if (error.response?.data?.message) {
//         setErrors({ 
//           submit: error.response.data.message 
//         });
//       } else if (error.message) {
//         setErrors({ 
//           submit: error.message 
//         });
//       } else {
//         setErrors({ 
//           submit: "An error occurred during signup. Please try again." 
//         });
//       }
      
//       console.error("Signup error:", error);
//     }
//   };

//   const handleOAuthSignup = (provider) => {
//     console.log(`Signing up with ${provider}`);
//     // Implement OAuth logic here
//     // For now, just log and show a message
//     setErrors({ 
//       submit: `${provider} OAuth is not yet implemented` 
//     });
//   };

//   const passwordRequirements = [
//     { text: "At least 8 characters", met: formData.password.length >= 8 },
//     { text: "Contains uppercase letter", met: /[A-Z]/.test(formData.password) },
//     { text: "Contains lowercase letter", met: /[a-z]/.test(formData.password) },
//     { text: "Contains number", met: /\d/.test(formData.password) },
//     {
//       text: "Contains special character",
//       met: /[!@#$%^&*]/.test(formData.password),
//     },
//   ];

//   // Helper function to get password strength
//   const getPasswordStrength = () => {
//     const metCount = passwordRequirements.filter(req => req.met).length;
//     const totalCount = passwordRequirements.length;
//     return `${metCount}/${totalCount}`;
//   };
  
//   // Get password strength level for UI feedback
//   const getPasswordStrengthLevel = () => {
//     const metCount = passwordRequirements.filter(req => req.met).length;
//     if (metCount === 0) return { level: "Very Weak", color: "text-red-500", bg: "bg-red-500" };
//     if (metCount <= 2) return { level: "Weak", color: "text-orange-500", bg: "bg-orange-500" };
//     if (metCount === 3) return { level: "Fair", color: "text-yellow-500", bg: "bg-yellow-500" };
//     if (metCount === 4) return { level: "Good", color: "text-lime-500", bg: "bg-lime-500" };
//     return { level: "Strong", color: "text-emerald-500", bg: "bg-emerald-500" };
//   };
  
//   const strengthLevel = getPasswordStrengthLevel();

//   // Cleanup timer on unmount
//   useEffect(() => {
//     return () => {
//       if (validationTimer.current) {
//         clearTimeout(validationTimer.current);
//       }
//     };
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-cyan-50 relative overflow-hidden">
//       {/* Background */}
//       <AuthBackground type="signup" />
      
//       {/* Floating Elements */}
//       <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-emerald-300/10 rounded-full blur-3xl" />
//       <div className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-cyan-300/10 rounded-full blur-3xl" />

//       {/* Main content with navbar padding */}
//       <div className="relative pt-28 pb-20 px-4">
//         <div className="max-w-7xl mx-auto">
//           <div className="grid lg:grid-cols-2 gap-12 items-center">
//             {/* Left Side - Signup Form */}
//             <motion.div
//               initial={{ opacity: 0, x: -50 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.8 }}
//               className="w-full"
//             >
//               <div className="max-w-md mx-auto">
//                 {/* Signup Card */}
//                 <div className="relative">
//                   {/* Glow Effect */}
//                   <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-3xl blur-2xl opacity-20" />

//                   {/* Form Card */}
//                   <div className="relative bg-white/95 backdrop-blur-xl border border-white/40 rounded-3xl p-6 shadow-2xl shadow-black/10">
//                     {/* Header */}
//                     <div className="text-center mb-6">
//                       <motion.div
//                         initial={{ scale: 0 }}
//                         animate={{ scale: 1 }}
//                         transition={{ delay: 0.2, type: "spring" }}
//                         className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/30"
//                       >
//                         <Sparkles className="w-8 h-8 text-white" />
//                       </motion.div>

//                       <h2 className="text-2xl font-bold text-gray-800 mb-2">
//                         Join the Future 🚀
//                       </h2>
//                       <p className="text-gray-600 text-sm">
//                         Create your account in seconds
//                       </p>
//                     </div>

//                     {/* Error message for submit errors */}
//                     {errors.submit && (
//                       <motion.div 
//                         initial={{ opacity: 0, y: -10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm"
//                       >
//                         {errors.submit}
//                       </motion.div>
//                     )}

//                     {/* OAuth Buttons */}
//                     <div className="space-y-3 mb-4">
//                       <OAuthButton
//                         provider="github"
//                         icon={Github}
//                         onClick={() => handleOAuthSignup("github")}
//                       />
//                       <OAuthButton
//                         provider="google"
//                         icon={Chrome}
//                         onClick={() => handleOAuthSignup("google")}
//                       />
//                     </div>

//                     {/* Divider */}
//                     <div className="flex items-center my-4">
//                       <div className="flex-1 h-px bg-gray-300" />
//                       <span className="px-4 text-gray-500 text-sm">
//                         Or sign up with email
//                       </span>
//                       <div className="flex-1 h-px bg-gray-300" />
//                     </div>

//                     {/* Signup Form */}
//                     <form onSubmit={handleSubmit} className="space-y-4">
//                       {/* Full Name Field */}
//                       <div data-field="fullName">
//                         <FloatingInput
//                           label="Full Name"
//                           type="text"
//                           icon={User}
//                           value={formData.fullName}
//                           onChange={(e) =>
//                             handleInputChange('fullName', e.target.value)
//                           }
//                           onFocus={() => handleFieldFocus('fullName')}
//                           onBlur={() => handleFieldBlur('fullName')}
//                           error={hasInteracted.fullName ? errors.fullName : ""}
//                           isValid={hasInteracted.fullName && !errors.fullName && formData.fullName.length > 0}
//                           required
//                         />
//                         {/* Real-time feedback */}
//                         {fieldFocus.fullName && formData.fullName && !errors.fullName && (
//                           <motion.div
//                             initial={{ opacity: 0, y: -5 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             className="text-xs text-emerald-600 ml-4 mt-1"
//                           >
//                             ✓ Valid name
//                           </motion.div>
//                         )}
//                       </div>

//                       {/* Email Field */}
//                       <div data-field="email">
//                         <FloatingInput
//                           label="Email Address"
//                           type="email"
//                           icon={Mail}
//                           value={formData.email}
//                           onChange={(e) =>
//                             handleInputChange('email', e.target.value)
//                           }
//                           onFocus={() => handleFieldFocus('email')}
//                           onBlur={() => handleFieldBlur('email')}
//                           error={hasInteracted.email ? errors.email : ""}
//                           isValid={hasInteracted.email && !errors.email && formData.email.length > 0}
//                           required
//                         />
//                         {/* Real-time feedback */}
//                         {fieldFocus.email && formData.email && !errors.email && (
//                           <motion.div
//                             initial={{ opacity: 0, y: -5 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             className="text-xs text-emerald-600 ml-4 mt-1"
//                           >
//                             ✓ Valid email format
//                           </motion.div>
//                         )}
//                       </div>

//                       {/* Password Field */}
//                       <div data-field="password" className="space-y-3">
//                         <FloatingInput
//                           label="Password"
//                           type={showPassword ? "text" : "password"}
//                           icon={Lock}
//                           value={formData.password}
//                           onChange={(e) =>
//                             handleInputChange('password', e.target.value)
//                           }
//                           onFocus={() => handleFieldFocus('password')}
//                           onBlur={() => handleFieldBlur('password')}
//                           error={hasInteracted.password ? errors.password : ""}
//                           isValid={hasInteracted.password && !errors.password && formData.password.length > 0}
//                           showToggle
//                           onToggle={() => setShowPassword(!showPassword)}
//                           required
//                         />
                        
//                         {/* Password Strength Indicator */}
//                         {formData.password && (
//                           <motion.div
//                             initial={{ opacity: 0, height: 0 }}
//                             animate={{ opacity: 1, height: 'auto' }}
//                             className="overflow-hidden"
//                           >
//                             <div className="flex items-center justify-between mb-1">
//                               <span className="text-xs font-medium text-gray-700">
//                                 Password Strength:
//                               </span>
//                               <span className={`text-xs font-bold ${strengthLevel.color}`}>
//                                 {strengthLevel.level}
//                               </span>
//                             </div>
//                             <div className="w-full bg-gray-200 rounded-full h-1.5 mb-2">
//                               <motion.div
//                                 initial={{ width: 0 }}
//                                 animate={{ width: `${(passwordRequirements.filter(req => req.met).length / passwordRequirements.length) * 100}%` }}
//                                 className={`h-1.5 rounded-full ${strengthLevel.bg}`}
//                                 transition={{ duration: 0.3 }}
//                               />
//                             </div>
//                           </motion.div>
//                         )}

//                         {/* Password Requirements with real-time updates */}
//                         <div className="p-3 rounded-xl bg-gradient-to-br from-gray-50 to-white border border-gray-200">
//                           <div className="flex justify-between items-center mb-2">
//                             <h4 className="font-semibold text-gray-800 text-sm">
//                               Password Requirements
//                             </h4>
//                             <span className="text-xs font-medium text-emerald-600">
//                               {getPasswordStrength()}
//                             </span>
//                           </div>
//                           <div className="space-y-1">
//                             {passwordRequirements.map((req, index) => (
//                               <motion.div
//                                 key={index}
//                                 initial={false}
//                                 animate={{
//                                   opacity: formData.password ? 1 : 0.7,
//                                   scale: req.met && formData.password ? 1.02 : 1
//                                 }}
//                                 className="flex items-center gap-2"
//                               >
//                                 <motion.div
//                                   initial={false}
//                                   animate={{
//                                     scale: req.met && formData.password ? [1, 1.2, 1] : 1
//                                   }}
//                                   transition={{ duration: 0.2 }}
//                                 >
//                                   <CheckCircle
//                                     size={14}
//                                     className={
//                                       req.met && formData.password ? "text-green-500" : "text-gray-300"
//                                     }
//                                   />
//                                 </motion.div>
//                                 <span
//                                   className={`text-xs transition-colors ${
//                                     req.met && formData.password ? "text-green-600 font-medium" : "text-gray-500"
//                                   }`}
//                                 >
//                                   {req.text}
//                                 </span>
//                               </motion.div>
//                             ))}
//                           </div>
                          
//                           {/* Additional password tips */}
//                           {formData.password && (
//                             <motion.div
//                               initial={{ opacity: 0, height: 0 }}
//                               animate={{ opacity: 1, height: 'auto' }}
//                               className="mt-2 pt-2 border-t border-gray-100"
//                             >
//                               <p className="text-xs text-gray-600">
//                                 <span className="font-medium">Tip:</span> Use a mix of letters, numbers, and symbols for maximum security
//                               </p>
//                             </motion.div>
//                           )}
//                         </div>
//                       </div>

//                       {/* Confirm Password Field */}
//                       <div data-field="confirmPassword">
//                         <FloatingInput
//                           label="Confirm Password"
//                           type={showConfirmPassword ? "text" : "password"}
//                           icon={Lock}
//                           value={formData.confirmPassword}
//                           onChange={(e) =>
//                             handleInputChange('confirmPassword', e.target.value)
//                           }
//                           onFocus={() => handleFieldFocus('confirmPassword')}
//                           onBlur={() => handleFieldBlur('confirmPassword')}
//                           error={hasInteracted.confirmPassword ? errors.confirmPassword : ""}
//                           isValid={hasInteracted.confirmPassword && !errors.confirmPassword && formData.confirmPassword.length > 0}
//                           showToggle
//                           onToggle={() =>
//                             setShowConfirmPassword(!showConfirmPassword)
//                           }
//                           required
//                         />
                        
//                         {/* Real-time feedback */}
//                         {formData.confirmPassword && formData.password && !errors.confirmPassword && (
//                           <motion.div
//                             initial={{ opacity: 0, y: -5 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             className="text-xs text-emerald-600 ml-4 mt-1"
//                           >
//                             ✓ Passwords match
//                           </motion.div>
//                         )}
//                       </div>

//                       {/* Terms & Conditions with error */}
//                       <div className="space-y-1">
//                         <label className="flex items-start gap-2 cursor-pointer">
//                           <input
//                             type="checkbox"
//                             checked={acceptTerms}
//                             onChange={(e) => setAcceptTerms(e.target.checked)}
//                             className="w-4 h-4 mt-0.5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
//                           />
//                           <span className="text-gray-700 text-xs">
//                             I agree to the{" "}
//                             <Link
//                               to="/terms"
//                               className="text-emerald-600 hover:text-emerald-700 font-medium"
//                             >
//                               Terms
//                             </Link>{" "}
//                             and{" "}
//                             <Link
//                               to="/privacy"
//                               className="text-emerald-600 hover:text-emerald-700 font-medium"
//                             >
//                               Privacy
//                             </Link>
//                           </span>
//                         </label>
//                         {errors.terms && (
//                           <p className="text-red-500 text-xs pl-6">
//                             {errors.terms}
//                           </p>
//                         )}
//                       </div>

//                       {/* Form Status */}
//                       <AnimatePresence>
//                         {Object.keys(errors).length > 0 && !errors.submit && (
//                           <motion.div
//                             initial={{ opacity: 0, height: 0 }}
//                             animate={{ opacity: 1, height: 'auto' }}
//                             exit={{ opacity: 0, height: 0 }}
//                             className="p-3 rounded-lg bg-amber-50 border border-amber-200"
//                           >
//                             <p className="text-xs text-amber-700">
//                               Please fix the errors above before submitting
//                             </p>
//                           </motion.div>
//                         )}
                        
//                         {Object.values(errors).every(error => !error) && 
//                          formData.fullName && formData.email && formData.password && formData.confirmPassword && acceptTerms && (
//                           <motion.div
//                             initial={{ opacity: 0, height: 0 }}
//                             animate={{ opacity: 1, height: 'auto' }}
//                             exit={{ opacity: 0, height: 0 }}
//                             className="p-3 rounded-lg bg-emerald-50 border border-emerald-200"
//                           >
//                             <p className="text-xs text-emerald-700 flex items-center gap-1">
//                               <CheckCircle size={12} />
//                               All fields are valid. Ready to create your account!
//                             </p>
//                           </motion.div>
//                         )}
//                       </AnimatePresence>

//                       {/* Submit Button */}
//                       <motion.button
//                         type="submit"
//                         disabled={isLoading || Object.keys(errors).length > 0}
//                         whileHover={{ scale: Object.keys(errors).length === 0 ? 1.02 : 1 }}
//                         whileTap={{ scale: Object.keys(errors).length === 0 ? 0.98 : 1 }}
//                         className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-600 text-white font-semibold shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
//                       >
//                         {isLoading ? (
//                           <>
//                             <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                             <span>Creating account...</span>
//                           </>
//                         ) : (
//                           <>
//                             <span>Create Account</span>
//                             <ArrowRight className="w-4 h-4" />
//                           </>
//                         )}
//                       </motion.button>
//                     </form>

//                     {/* Login Link */}
//                     <div className="text-center mt-6 pt-4 border-t border-gray-200">
//                       <p className="text-gray-600 text-sm">
//                         Already have an account?{" "}
//                         <Link
//                           to="/login"
//                           className="text-emerald-600 hover:text-emerald-700 font-semibold"
//                         >
//                           Sign in here
//                         </Link>
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>

              
//             {/* Right Side - Benefits & Features */}
//             <motion.div
//               initial={{ opacity: 0, x: 50 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.8 }}
//               className="hidden lg:block"
//             >
//               <div className="space-y-6">
//                 <div>
//                   <motion.div
//                     initial={{ scale: 0 }}
//                     animate={{ scale: 1 }}
//                     transition={{ delay: 0.3, type: "spring" }}
//                     className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-white/80 backdrop-blur-xl border border-white/40 shadow-lg"
//                   >
//                     <Sparkles className="w-4 h-4 text-emerald-500" />
//                     <span className="bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent font-bold text-sm">
//                       JOIN THE REVOLUTION
//                     </span>
//                   </motion.div>

//                   <h1 className="text-4xl font-bold text-gray-800 mb-4">
//                     Start Your
//                     <span className="block bg-gradient-to-r from-emerald-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent">
//                       AI Shopping Journey
//                     </span>
//                   </h1>

//                   <p className="text-gray-600 mb-6">
//                     Get personalized recommendations, exclusive deals, and premium
//                     features designed to transform your shopping experience.
//                   </p>
//                 </div>

//                 {/* Benefits */}
//                 <div className="space-y-3">
//                   {[
//                     {
//                       icon: "🤖",
//                       title: "AI Personal Shopper",
//                       desc: "Smart recommendations based on your style",
//                     },
//                     {
//                       icon: "⚡",
//                       title: "Early Access",
//                       desc: "Be first to discover new products",
//                     },
//                     {
//                       icon: "🎯",
//                       title: "Exclusive Deals",
//                       desc: "Member-only discounts and offers",
//                     },
//                     {
//                       icon: "📊",
//                       title: "Smart Analytics",
//                       desc: "Track trends and optimize your shopping",
//                     },
//                   ].map((benefit, index) => (
//                     <motion.div
//                       key={index}
//                       initial={{ opacity: 0, x: -20 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       transition={{ delay: 0.4 + index * 0.1 }}
//                       className="flex items-center gap-3 p-3 rounded-xl bg-white/50 backdrop-blur-sm hover:bg-white/80 transition-colors"
//                     >
//                       <div className="text-xl">{benefit.icon}</div>
//                       <div>
//                         <h4 className="font-semibold text-gray-800 text-sm">
//                           {benefit.title}
//                         </h4>
//                         <p className="text-xs text-gray-600">{benefit.desc}</p>
//                       </div>
//                     </motion.div>
//                   ))}
//                 </div>

//                 {/* Trust Indicators */}
//                 <div className="grid grid-cols-2 gap-3 mt-6">
//                   {[
//                     { value: "30-day", label: "Free Trial" },
//                     { value: "No Credit Card", label: "Required" },
//                     { value: "256-bit", label: "Encryption" },
//                     { value: "24/7", label: "Support" },
//                   ].map((stat, index) => (
//                     <motion.div
//                       key={index}
//                       initial={{ opacity: 0, scale: 0.8 }}
//                       animate={{ opacity: 1, scale: 1 }}
//                       transition={{ delay: 0.8 + index * 0.1 }}
//                       className="text-center p-3 rounded-xl bg-gradient-to-br from-white to-emerald-50 border border-emerald-100"
//                     >
//                       <div className="text-base font-bold text-emerald-700">
//                         {stat.value}
//                       </div>
//                       <div className="text-xs text-gray-600">{stat.label}</div>
//                     </motion.div>
//                   ))}
//                 </div>
//               </div>
//             </motion.div>
                        

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignupPage;


import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  Github,
  Chrome,
  Sparkles,
  CheckCircle,
  ArrowRight,
  Shield,
  Smartphone,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../api/auth";

import AuthBackground from "../../components/AuthBackground"
import FloatingInput from "../../components/FloatingInput";
import OAuthButton from "../../components/OAuthButton"

export const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  
  // Track field focus state for real-time validation
  const [fieldFocus, setFieldFocus] = useState({
    fullName: false,
    email: false,
    password: false,
    confirmPassword: false,
  });
  
  // Track if user has interacted with form
  const [hasInteracted, setHasInteracted] = useState({
    fullName: false,
    email: false,
    password: false,
    confirmPassword: false,
  });
  
  // Debounce timer refs
  const validationTimer = useRef(null);

  // Real-time validation functions
  const validateFullName = (value) => {
    if (!value.trim()) {
      return "Full name is required";
    }
    if (value.trim().length < 2) {
      return "Name must be at least 2 characters";
    }
    if (value.trim().length > 50) {
      return "Name is too long (max 50 characters)";
    }
    if (!/^[a-zA-Z\s]+$/.test(value.trim())) {
      return "Name can only contain letters and spaces";
    }
    return "";
  };

  const validateEmail = (value) => {
    if (!value) {
      return "Email is required";
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return "Please enter a valid email address";
    }
    
    // Additional email validation
    if (value.length > 100) {
      return "Email is too long";
    }
    
    // Check for common email issues
    if (value.includes("..") || value.includes(".@") || value.includes("@.")) {
      return "Email format is invalid";
    }
    
    // Check for spaces in email
    if (/\s/.test(value)) {
      return "Email cannot contain spaces";
    }
    
    return "";
  };

  const validatePassword = (value) => {
    if (!value) {
      return "Password is required";
    }
    if (value.length < 8) {
      return "Password must be at least 8 characters";
    }
    if (value.length > 50) {
      return "Password is too long (max 50 characters)";
    }
    if (!/[A-Z]/.test(value)) {
      return "Password must contain an uppercase letter";
    }
    if (!/[a-z]/.test(value)) {
      return "Password must contain a lowercase letter";
    }
    if (!/\d/.test(value)) {
      return "Password must contain a number";
    }
    if (!/[!@#$%^&*]/.test(value)) {
      return "Password must contain a special character (!@#$%^&*)";
    }
    
    // Check for common weak passwords
    const weakPasswords = [
      'password', '12345678', 'qwerty123', 'admin123',
      'welcome123', 'letmein123', 'monkey123', 'dragon123'
    ];
    
    if (weakPasswords.includes(value.toLowerCase())) {
      return "Password is too common. Choose a stronger one";
    }
    
    // Check for sequential characters
    if (/(abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz)/i.test(value)) {
      return "Avoid sequential characters (e.g., abc, 123)";
    }
    
    // Check for repeated characters
    if (/(.)\1{2,}/.test(value)) {
      return "Avoid repeating the same character multiple times";
    }
    
    return "";
  };

  const validateConfirmPassword = (value, password) => {
    if (!value) {
      return "Please confirm your password";
    }
    if (value !== password) {
      return "Passwords do not match";
    }
    return "";
  };

  // Real-time validation handler with debouncing
  const handleRealTimeValidation = (field, value) => {
    // Clear existing timer
    if (validationTimer.current) {
      clearTimeout(validationTimer.current);
    }
    
    // Set new timer for debouncing
    validationTimer.current = setTimeout(() => {
      let error = "";
      
      switch (field) {
        case 'fullName':
          error = validateFullName(value);
          break;
        case 'email':
          error = validateEmail(value);
          break;
        case 'password':
          error = validatePassword(value);
          
          // Also validate confirm password if it has content
          if (formData.confirmPassword && hasInteracted.confirmPassword) {
            const confirmError = validateConfirmPassword(formData.confirmPassword, value);
            if (confirmError) {
              setErrors(prev => ({
                ...prev,
                confirmPassword: confirmError
              }));
            } else {
              // Remove confirmPassword from errors if it exists
              setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors.confirmPassword;
                return newErrors;
              });
            }
          }
          break;
        case 'confirmPassword':
          error = validateConfirmPassword(value, formData.password);
          break;
        default:
          break;
      }
      
      // Update errors state - remove field if no error, add if error exists
      setErrors(prev => {
        const newErrors = { ...prev };
        if (error) {
          newErrors[field] = error;
        } else {
          delete newErrors[field];
        }
        return newErrors;
      });
      
    }, 300); // 300ms debounce
  };

  // Handle input change with real-time validation
  const handleInputChange = (field, value) => {
    // Update form data
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Mark field as interacted
    setHasInteracted(prev => ({
      ...prev,
      [field]: true
    }));
    
    // Clear submit error when user starts typing
    if (errors.submit) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.submit;
        return newErrors;
      });
    }
    
    // Trigger real-time validation
    handleRealTimeValidation(field, value);
  };

  // Handle field blur
  const handleFieldBlur = (field) => {
    setFieldFocus(prev => ({
      ...prev,
      [field]: false
    }));
    
    // Force validation on blur if field has been interacted with
    if (hasInteracted[field]) {
      handleRealTimeValidation(field, formData[field]);
    }
  };

  // Handle field focus
  const handleFieldFocus = (field) => {
    setFieldFocus(prev => ({
      ...prev,
      [field]: true
    }));
  };

  // Final form validation before submission
  const validateForm = () => {
    const newErrors = {};
    
    // Validate all fields
    const fullNameError = validateFullName(formData.fullName);
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    const confirmPasswordError = validateConfirmPassword(formData.confirmPassword, formData.password);
    
    if (fullNameError) newErrors.fullName = fullNameError;
    if (emailError) newErrors.email = emailError;
    if (passwordError) newErrors.password = passwordError;
    if (confirmPasswordError) newErrors.confirmPassword = confirmPasswordError;
    
    // Terms validation
    if (!acceptTerms) {
      newErrors.terms = "You must accept the terms and conditions";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Check if form is valid for button enable/disable
  const isFormValid = () => {
    const hasNoErrors = Object.keys(errors).length === 0;
    const isFormComplete = formData.fullName && 
                          formData.email && 
                          formData.password && 
                          formData.confirmPassword && 
                          acceptTerms;
    
    return hasNoErrors && isFormComplete;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Mark all fields as interacted for final validation
    setHasInteracted({
      fullName: true,
      email: true,
      password: true,
      confirmPassword: true,
    });
    
    if (!validateForm()) {
      // Scroll to first error
      const firstErrorField = Object.keys(errors)[0];
      if (firstErrorField) {
        const element = document.querySelector(`[data-field="${firstErrorField}"]`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await authService.signup(
        formData.fullName,
        formData.email,
        formData.password
      );

      console.log("Signup successful:", response);

      // Show success state briefly before navigation
      setIsLoading(false);
      
      setTimeout(() => {
        navigate("/login");
      }, 1500);
      
    } catch (error) {
      setIsLoading(false);
      
      // Handle different types of errors
      if (error.response?.data?.message) {
        setErrors({ 
          submit: error.response.data.message 
        });
      } else if (error.message) {
        setErrors({ 
          submit: error.message 
        });
      } else {
        setErrors({ 
          submit: "An error occurred during signup. Please try again." 
        });
      }
      
      console.error("Signup error:", error);
    }
  };

  const handleOAuthSignup = (provider) => {
    console.log(`Signing up with ${provider}`);
    // Implement OAuth logic here
    // For now, just log and show a message
    setErrors({ 
      submit: `${provider} OAuth is not yet implemented` 
    });
  };

  const passwordRequirements = [
    { text: "At least 8 characters", met: formData.password.length >= 8 },
    { text: "Contains uppercase letter", met: /[A-Z]/.test(formData.password) },
    { text: "Contains lowercase letter", met: /[a-z]/.test(formData.password) },
    { text: "Contains number", met: /\d/.test(formData.password) },
    {
      text: "Contains special character",
      met: /[!@#$%^&*]/.test(formData.password),
    },
  ];

  // Helper function to get password strength
  const getPasswordStrength = () => {
    const metCount = passwordRequirements.filter(req => req.met).length;
    const totalCount = passwordRequirements.length;
    return `${metCount}/${totalCount}`;
  };
  
  // Get password strength level for UI feedback
  const getPasswordStrengthLevel = () => {
    const metCount = passwordRequirements.filter(req => req.met).length;
    if (metCount === 0) return { level: "Very Weak", color: "text-red-500", bg: "bg-red-500" };
    if (metCount <= 2) return { level: "Weak", color: "text-orange-500", bg: "bg-orange-500" };
    if (metCount === 3) return { level: "Fair", color: "text-yellow-500", bg: "bg-yellow-500" };
    if (metCount === 4) return { level: "Good", color: "text-lime-500", bg: "bg-lime-500" };
    return { level: "Strong", color: "text-emerald-500", bg: "bg-emerald-500" };
  };
  
  const strengthLevel = getPasswordStrengthLevel();

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (validationTimer.current) {
        clearTimeout(validationTimer.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-cyan-50 relative overflow-hidden">
      {/* Background */}
      <AuthBackground type="signup" />
      
      {/* Floating Elements */}
      <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-emerald-300/10 rounded-full blur-3xl" />
      <div className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-cyan-300/10 rounded-full blur-3xl" />

      {/* Main content with navbar padding */}
      <div className="relative pt-28 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Signup Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full"
            >
              <div className="max-w-md mx-auto">
                {/* Signup Card */}
                <div className="relative">
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-3xl blur-2xl opacity-20" />

                  {/* Form Card */}
                  <div className="relative bg-white/95 backdrop-blur-xl border border-white/40 rounded-3xl p-6 shadow-2xl shadow-black/10">
                    {/* Header */}
                    <div className="text-center mb-6">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring" }}
                        className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/30"
                      >
                        <Sparkles className="w-8 h-8 text-white" />
                      </motion.div>

                      <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        Join the Future 🚀
                      </h2>
                      <p className="text-gray-600 text-sm">
                        Create your account in seconds
                      </p>
                    </div>

                    {/* Error message for submit errors */}
                    {errors.submit && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm"
                      >
                        {errors.submit}
                      </motion.div>
                    )}

                    {/* OAuth Buttons */}
                    <div className="space-y-3 mb-4">
                      <OAuthButton
                        provider="github"
                        icon={Github}
                        onClick={() => handleOAuthSignup("github")}
                      />
                      <OAuthButton
                        provider="google"
                        icon={Chrome}
                        onClick={() => handleOAuthSignup("google")}
                      />
                    </div>

                    {/* Divider */}
                    <div className="flex items-center my-4">
                      <div className="flex-1 h-px bg-gray-300" />
                      <span className="px-4 text-gray-500 text-sm">
                        Or sign up with email
                      </span>
                      <div className="flex-1 h-px bg-gray-300" />
                    </div>

                    {/* Signup Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {/* Full Name Field */}
                      <div data-field="fullName">
                        <FloatingInput
                          label="Full Name"
                          type="text"
                          icon={User}
                          value={formData.fullName}
                          onChange={(e) =>
                            handleInputChange('fullName', e.target.value)
                          }
                          onFocus={() => handleFieldFocus('fullName')}
                          onBlur={() => handleFieldBlur('fullName')}
                          error={hasInteracted.fullName ? errors.fullName : ""}
                          isValid={hasInteracted.fullName && !errors.fullName && formData.fullName.length > 0}
                          required
                        />
                        {/* Real-time feedback */}
                        {fieldFocus.fullName && formData.fullName && !errors.fullName && (
                          <motion.div
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-xs text-emerald-600 ml-4 mt-1"
                          >
                            ✓ Valid name
                          </motion.div>
                        )}
                      </div>

                      {/* Email Field */}
                      <div data-field="email">
                        <FloatingInput
                          label="Email Address"
                          type="email"
                          icon={Mail}
                          value={formData.email}
                          onChange={(e) =>
                            handleInputChange('email', e.target.value)
                          }
                          onFocus={() => handleFieldFocus('email')}
                          onBlur={() => handleFieldBlur('email')}
                          error={hasInteracted.email ? errors.email : ""}
                          isValid={hasInteracted.email && !errors.email && formData.email.length > 0}
                          required
                        />
                        {/* Real-time feedback */}
                        {fieldFocus.email && formData.email && !errors.email && (
                          <motion.div
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-xs text-emerald-600 ml-4 mt-1"
                          >
                            ✓ Valid email format
                          </motion.div>
                        )}
                      </div>

                      {/* Password Field */}
                      <div data-field="password" className="space-y-3">
                        <FloatingInput
                          label="Password"
                          type={showPassword ? "text" : "password"}
                          icon={Lock}
                          value={formData.password}
                          onChange={(e) =>
                            handleInputChange('password', e.target.value)
                          }
                          onFocus={() => handleFieldFocus('password')}
                          onBlur={() => handleFieldBlur('password')}
                          error={hasInteracted.password ? errors.password : ""}
                          isValid={hasInteracted.password && !errors.password && formData.password.length > 0}
                          showToggle
                          onToggle={() => setShowPassword(!showPassword)}
                          required
                        />
                        
                        {/* Password Strength Indicator */}
                        {formData.password && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="overflow-hidden"
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs font-medium text-gray-700">
                                Password Strength:
                              </span>
                              <span className={`text-xs font-bold ${strengthLevel.color}`}>
                                {strengthLevel.level}
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-1.5 mb-2">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${(passwordRequirements.filter(req => req.met).length / passwordRequirements.length) * 100}%` }}
                                className={`h-1.5 rounded-full ${strengthLevel.bg}`}
                                transition={{ duration: 0.3 }}
                              />
                            </div>
                          </motion.div>
                        )}

                        {/* Password Requirements with real-time updates */}
                        <div className="p-3 rounded-xl bg-gradient-to-br from-gray-50 to-white border border-gray-200">
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-semibold text-gray-800 text-sm">
                              Password Requirements
                            </h4>
                            <span className="text-xs font-medium text-emerald-600">
                              {getPasswordStrength()}
                            </span>
                          </div>
                          <div className="space-y-1">
                            {passwordRequirements.map((req, index) => (
                              <motion.div
                                key={index}
                                initial={false}
                                animate={{
                                  opacity: formData.password ? 1 : 0.7,
                                  scale: req.met && formData.password ? 1.02 : 1
                                }}
                                className="flex items-center gap-2"
                              >
                                <motion.div
                                  initial={false}
                                  animate={{
                                    scale: req.met && formData.password ? [1, 1.2, 1] : 1
                                  }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <CheckCircle
                                    size={14}
                                    className={
                                      req.met && formData.password ? "text-green-500" : "text-gray-300"
                                    }
                                  />
                                </motion.div>
                                <span
                                  className={`text-xs transition-colors ${
                                    req.met && formData.password ? "text-green-600 font-medium" : "text-gray-500"
                                  }`}
                                >
                                  {req.text}
                                </span>
                              </motion.div>
                            ))}
                          </div>
                          
                          {/* Additional password tips */}
                          {formData.password && (
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
                      </div>

                      {/* Confirm Password Field */}
                      <div data-field="confirmPassword">
                        <FloatingInput
                          label="Confirm Password"
                          type={showConfirmPassword ? "text" : "password"}
                          icon={Lock}
                          value={formData.confirmPassword}
                          onChange={(e) =>
                            handleInputChange('confirmPassword', e.target.value)
                          }
                          onFocus={() => handleFieldFocus('confirmPassword')}
                          onBlur={() => handleFieldBlur('confirmPassword')}
                          error={hasInteracted.confirmPassword ? errors.confirmPassword : ""}
                          isValid={hasInteracted.confirmPassword && !errors.confirmPassword && formData.confirmPassword.length > 0}
                          showToggle
                          onToggle={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          required
                        />
                        
                        {/* Real-time feedback */}
                        {formData.confirmPassword && formData.password && !errors.confirmPassword && (
                          <motion.div
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-xs text-emerald-600 ml-4 mt-1"
                          >
                            ✓ Passwords match
                          </motion.div>
                        )}
                      </div>

                      {/* Terms & Conditions with error */}
                      <div className="space-y-1">
                        <label className="flex items-start gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={acceptTerms}
                            onChange={(e) => setAcceptTerms(e.target.checked)}
                            className="w-4 h-4 mt-0.5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                          />
                          <span className="text-gray-700 text-xs">
                            I agree to the{" "}
                            <Link
                              to="/terms"
                              className="text-emerald-600 hover:text-emerald-700 font-medium"
                            >
                              Terms
                            </Link>{" "}
                            and{" "}
                            <Link
                              to="/privacy"
                              className="text-emerald-600 hover:text-emerald-700 font-medium"
                            >
                              Privacy
                            </Link>
                          </span>
                        </label>
                        {errors.terms && (
                          <p className="text-red-500 text-xs pl-6">
                            {errors.terms}
                          </p>
                        )}
                      </div>

                      {/* Form Status */}
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
                        
                        {isFormValid() && (
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

                      {/* Submit Button - FIXED: Use isFormValid() instead of Object.keys(errors).length > 0 */}
                      <motion.button
                        type="submit"
                        disabled={isLoading || !isFormValid()}
                        whileHover={{ scale: isFormValid() ? 1.02 : 1 }}
                        whileTap={{ scale: isFormValid() ? 0.98 : 1 }}
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-600 text-white font-semibold shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isLoading ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Creating account...</span>
                          </>
                        ) : (
                          <>
                            <span>Create Account</span>
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </motion.button>
                    </form>

                    {/* Login Link */}
                    <div className="text-center mt-6 pt-4 border-t border-gray-200">
                      <p className="text-gray-600 text-sm">
                        Already have an account?{" "}
                        <Link
                          to="/login"
                          className="text-emerald-600 hover:text-emerald-700 font-semibold"
                        >
                          Sign in here
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

              
            {/* Right Side - Benefits & Features */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="hidden lg:block"
            >
              <div className="space-y-6">
                <div>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring" }}
                    className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-white/80 backdrop-blur-xl border border-white/40 shadow-lg"
                  >
                    <Sparkles className="w-4 h-4 text-emerald-500" />
                    <span className="bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent font-bold text-sm">
                      JOIN THE REVOLUTION
                    </span>
                  </motion.div>

                  <h1 className="text-4xl font-bold text-gray-800 mb-4">
                    Start Your
                    <span className="block bg-gradient-to-r from-emerald-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent">
                      AI Shopping Journey
                    </span>
                  </h1>

                  <p className="text-gray-600 mb-6">
                    Get personalized recommendations, exclusive deals, and premium
                    features designed to transform your shopping experience.
                  </p>
                </div>

                {/* Benefits */}
                <div className="space-y-3">
                  {[
                    {
                      icon: "🤖",
                      title: "AI Personal Shopper",
                      desc: "Smart recommendations based on your style",
                    },
                    {
                      icon: "⚡",
                      title: "Early Access",
                      desc: "Be first to discover new products",
                    },
                    {
                      icon: "🎯",
                      title: "Exclusive Deals",
                      desc: "Member-only discounts and offers",
                    },
                    {
                      icon: "📊",
                      title: "Smart Analytics",
                      desc: "Track trends and optimize your shopping",
                    },
                  ].map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="flex items-center gap-3 p-3 rounded-xl bg-white/50 backdrop-blur-sm hover:bg-white/80 transition-colors"
                    >
                      <div className="text-xl">{benefit.icon}</div>
                      <div>
                        <h4 className="font-semibold text-gray-800 text-sm">
                          {benefit.title}
                        </h4>
                        <p className="text-xs text-gray-600">{benefit.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Trust Indicators */}
                <div className="grid grid-cols-2 gap-3 mt-6">
                  {[
                    { value: "30-day", label: "Free Trial" },
                    { value: "No Credit Card", label: "Required" },
                    { value: "256-bit", label: "Encryption" },
                    { value: "24/7", label: "Support" },
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      className="text-center p-3 rounded-xl bg-gradient-to-br from-white to-emerald-50 border border-emerald-100"
                    >
                      <div className="text-base font-bold text-emerald-700">
                        {stat.value}
                      </div>
                      <div className="text-xs text-gray-600">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
                        

          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;