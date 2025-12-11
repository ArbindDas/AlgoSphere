
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
  AlertCircle
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import AuthBackground from "../../components/AuthBackground";
import FloatingInput from "../../components/FloatingInput"
import OAuthButton from "../../components/OAuthButton"
import SecurityBadge from "../../components/SecurityBadge";
import authService from "../../api/auth"

// Login Page
export const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  // Track field focus state for real-time validation
  const [fieldFocus, setFieldFocus] = useState({
    email: false,
    password: false,
  });
  
  // Track if user has interacted with form
  const [hasInteracted, setHasInteracted] = useState({
    email: false,
    password: false,
  });
  
  // Track login attempts for security feedback
  const [loginAttempts, setLoginAttempts] = useState(0);
  
  // Debounce timer refs
  const validationTimer = useRef(null);

  // Real-time validation functions
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
    
    // Basic password validation for login (less strict than signup)
    if (value.length < 6) {
      return "Password must be at least 6 characters";
    }
    
    if (value.length > 50) {
      return "Password is too long";
    }
    
    // Check for suspicious patterns (optional)
    if (/(.)\1{5,}/.test(value)) {
      return "Password contains repeating characters";
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
        case 'email':
          error = validateEmail(value);
          break;
        case 'password':
          error = validatePassword(value);
          break;
        default:
          break;
      }
      
      // Update errors state
      setErrors(prev => ({
        ...prev,
        [field]: error
      }));
      
    }, 250); // 250ms debounce for faster login feedback
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
      setErrors(prev => ({
        ...prev,
        submit: ""
      }));
    }
    
    // Clear other specific errors if they exist
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
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
    newErrors.email = validateEmail(formData.email);
    newErrors.password = validatePassword(formData.password);
    
    // Filter out empty errors
    const filteredErrors = Object.fromEntries(
      Object.entries(newErrors).filter(([_, value]) => value !== "")
    );
    
    setErrors(filteredErrors);
    
    // Mark all fields as interacted for UI feedback
    setHasInteracted({
      email: true,
      password: true,
    });
    
    return Object.keys(filteredErrors).length === 0;
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
    
  //   if (!validateForm()) {
  //     // Scroll to first error
  //     const firstErrorField = Object.keys(errors)[0];
  //     if (firstErrorField) {
  //       const element = document.querySelector(`[data-field="${firstErrorField}"]`);
  //       if (element) {
  //         element.scrollIntoView({ behavior: 'smooth', block: 'center' });
  //       }
  //     }
  //     return;
  //   }
    
  //   setIsLoading(true);
    
  //   try {
  //     const response = await authService.signin(
  //       formData.email,
  //       formData.password
  //     );

  //     console.log("Login successful: ", response);

  //     // Simulate API call
  //     setTimeout(() => {
  //       setIsLoading(false);
  //       navigate("/dashboard");
  //     }, 100);

  //     return response.data;
      
  //   } catch (error) {
  //     setIsLoading(false);
  //     setLoginAttempts(prev => prev + 1);
      
  //     // Handle different types of errors
  //     if (error.response?.data?.message) {
  //       setErrors({ 
  //         submit: error.response.data.message 
  //       });
  //     } else if (error.message) {
  //       setErrors({ 
  //         submit: error.message 
  //       });
  //     } else {
  //       setErrors({ 
  //         submit: "Invalid email or password. Please try again." 
  //       });
  //     }
      
  //     console.error("Login error:", error);
  //   }
  // };


  const handleSubmit = async (e) => {
  e.preventDefault();
  
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
    const response = await authService.signin(
      formData.email,
      formData.password
    );

    console.log("Login successful: ", response);

    // No need for setTimeout - navigate immediately after successful login
    setIsLoading(false);
    navigate("/dashboard");
    
  } catch (error) {
    setIsLoading(false);
    setLoginAttempts(prev => prev + 1);
    
    // Handle different types of errors
    console.error("Login error in handleSubmit:", error);
    
    // The error might be a generic Error object thrown by handleError
    // OR it might be the original axios error
    if (error.isAxiosError) {
      // This is the original axios error
      if (error.response?.data?.message) {
        setErrors({ 
          submit: error.response.data.message 
        });
      } else if (error.response?.data?.data?.message) {
        // Try nested message structure
        setErrors({ 
          submit: error.response.data.data.message 
        });
      } else {
        setErrors({ 
          submit: error.message || "Invalid email or password. Please try again." 
        });
      }
    } else {
      // This is the generic Error thrown by handleError
      setErrors({ 
        submit: error.message || "Invalid email or password. Please try again." 
      });
    }
  }
};

  const handleOAuthLogin = (provider) => {
    console.log(`Logging in with ${provider}`);
    // Implement OAuth logic here
    setErrors({
      submit: `${provider} OAuth is not yet implemented`
    });
  };
  
  // Get form completeness status
  const isFormComplete = formData.email && formData.password;
  
  // Get form validity status
  const isFormValid = !errors.email && !errors.password && isFormComplete;

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (validationTimer.current) {
        clearTimeout(validationTimer.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-white to-pink-50 relative overflow-hidden">
      {/* Background */}
      <AuthBackground type="login" />
      
      {/* Floating Elements */}
      <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-purple-300/10 rounded-full blur-3xl" />
      <div className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-pink-300/10 rounded-full blur-3xl" />

      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Illustration & Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="hidden lg:block"
          >
            <div className="space-y-8">
              <div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring" }}
                  className="inline-flex items-center gap-3 mb-6 px-6 py-3 rounded-full bg-white/80 backdrop-blur-xl border border-white/40 shadow-lg"
                >
                  <Sparkles className="w-5 h-5 text-purple-500" />
                  <span className="bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-bold">

                    WELCOME BACK
                  </span>
                </motion.div>
                
                <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
                  Secure Login to Your
                  <span className="block bg-linear-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                    AI-Powered Dashboard
                  </span>
                </h1>
                
                <p className="text-xl text-gray-600 mb-8">
                  Access personalized recommendations, smart analytics, and exclusive features tailored just for you.
                </p>
              </div>

              {/* Security Features */}
              <div className="space-y-4">
                <SecurityBadge icon={Shield} text="Bank-level 256-bit encryption" delay={0.4} />
                <SecurityBadge icon={Smartphone} text="Two-factor authentication available" delay={0.5} />
                <SecurityBadge icon={Sparkles} text="AI-powered security monitoring" delay={0.6} />
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-8">
                {[
                  { value: "50K+", label: "Active Users" },
                  { value: "99.9%", label: "Uptime" },
                  { value: "24/7", label: "Support" }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="text-center p-4 rounded-xl bg-white/50 backdrop-blur-sm"
                  >
                    <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Side - Login Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full"
          >
            <div className="max-w-md mx-auto">
              {/* Login Card */}
              <div className="relative">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-linear-to-br from-purple-500 to-pink-500 rounded-3xl blur-2xl opacity-20" />
                
                {/* Form Card */}
                <div className="relative bg-white/95 backdrop-blur-xl border border-white/40 rounded-3xl p-8 shadow-2xl shadow-black/10">
                  {/* Header */}
                  <div className="text-center mb-8">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring" }}
                      className="w-20 h-20 rounded-2xl bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/30"
                    >
                      <Sparkles className="w-10 h-10 text-white" />
                    </motion.div>
                    
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">
                      Welcome Back! 👋
                    </h2>
                    <p className="text-gray-600">
                      Sign in to continue your journey
                    </p>
                  </div>

                  {/* Submit Error Message */}
                  <AnimatePresence>
                    {errors.submit && (
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
                            <p className="text-red-600 text-sm">{errors.submit}</p>
                            
                            {/* Security notice for multiple failed attempts */}
                            {loginAttempts >= 2 && (
                              <div className="mt-2 pt-2 border-t border-red-100">
                                <p className="text-xs text-red-500">
                                  {loginAttempts >= 3 ? 
                                    "Multiple failed attempts detected. Consider resetting your password." :
                                    "Having trouble? Try resetting your password."
                                  }
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* OAuth Buttons */}
                  <div className="space-y-4 mb-6">
                    <OAuthButton provider="github" icon={Github} onClick={() => handleOAuthLogin("github")} />
                    <OAuthButton provider="google" icon={Chrome} onClick={() => handleOAuthLogin("google")} />
                  </div>

                  {/* Divider */}
                  <div className="flex items-center my-6">
                    <div className="flex-1 h-px bg-gray-300" />
                    <span className="px-4 text-gray-500 text-sm">Or continue with email</span>
                    <div className="flex-1 h-px bg-gray-300" />
                  </div>

                  {/* Login Form */}
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email Field */}
                    <div data-field="email">
                      <FloatingInput
                        label="Email Address"
                        type="email"
                        icon={Mail}
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
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
                          className="text-xs text-emerald-600 ml-4 mt-1 flex items-center gap-1"
                        >
                          <CheckCircle size={12} />
                          Valid email format
                        </motion.div>
                      )}
                    </div>

                    {/* Password Field */}
                    <div data-field="password">
                      <FloatingInput
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        icon={Lock}
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        onFocus={() => handleFieldFocus('password')}
                        onBlur={() => handleFieldBlur('password')}
                        error={hasInteracted.password ? errors.password : ""}
                        isValid={hasInteracted.password && !errors.password && formData.password.length > 0}
                        showToggle
                        onToggle={() => setShowPassword(!showPassword)}
                        required
                      />
                      
                      {/* Password strength hint */}
                      {formData.password && !errors.password && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="text-xs text-gray-500 ml-4 mt-1"
                        >
                          ✓ Password looks good
                        </motion.div>
                      )}
                    </div>

                    {/* Remember Me & Forgot Password */}
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          className="w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                        />
                        <span className="text-gray-700">Remember me</span>
                      </label>
                      
                      <Link to="/forgot-password" className="text-purple-600 hover:text-purple-700 font-medium">
                        Forgot password?
                      </Link>
                    </div>

                    {/* Form Status Indicators */}
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
                    </AnimatePresence>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={isLoading || (!isFormValid && isFormComplete)}
                      whileHover={{ scale: isFormValid ? 1.02 : 1 }}
                      whileTap={{ scale: isFormValid ? 0.98 : 1 }}
                      className="w-full py-4 rounded-xl bg-linear-to-r from-purple-600 to-pink-600 text-white font-semibold text-lg shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Signing in...
                        </>
                      ) : (
                        <>
                          Sign In
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </motion.button>
                  </form>

                  {/* Sign Up Link */}
                  <div className="text-center mt-8 pt-6 border-t border-gray-200">
                    <p className="text-gray-600">
                      Don't have an account?{" "}
                      <Link to="/signup" className="text-purple-600 hover:text-purple-700 font-semibold">
                        Create one now
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}