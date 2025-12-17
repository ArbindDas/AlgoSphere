


import React from "react";
import { motion } from "framer-motion";
import { 
  Sparkles, 
  CheckCircle,
  ArrowRight,
  Shield,
  Smartphone,
  Eye,
  EyeOff,
  Mail,
  Lock,
  Sun,
  Moon
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginForm } from "./hooks/useLoginForm";
import { useLoginValidation } from "./utils/useLoginValidation";
import { validateLoginForm } from "./utils/loginValidation";
import authService from "../../../api/auth";
import AuthBackground from "../../../components/AuthBackground";
import OAuthButton from "../../../components/OAuthButton";
import SecurityBadge from "../../../components/SecurityBadge";
import FormStatus from "../signupPage/components/FormStatus";
import { SubmitError } from "./components/SubmitError";
import { statsData } from "./styles/LoginPage.styles";
import { useTheme } from "../../../context/ThemeContext";

// Login Page
export const LoginPage = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme(); // Get theme and toggle function
  
  // Custom hooks
  const form = useLoginForm();
  const validation = useLoginValidation(form.validationTimer);
  
  const {
    formData,
    errors,
    setErrors,
    showPassword,
    setShowPassword,
    isLoading,
    setIsLoading,
    rememberMe,
    setRememberMe,
    fieldFocus,
    hasInteracted,
    loginAttempts,
    incrementLoginAttempts,
    handleInputChange,
    handleFieldBlur,
    handleFieldFocus,
    setSubmitError,
    isFormComplete,
    isFormValid
  } = form;

  // Final form validation before submission
  const validateForm = () => {
    const filteredErrors = validateLoginForm(formData);
    
    setErrors(filteredErrors);
    form.setHasInteracted({ email: true, password: true });
    
    return Object.keys(filteredErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
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
      const response = await authService.signin(formData.email, formData.password);
      console.log("Login successful: ", response);
      setIsLoading(false);
      navigate("/dashboard");
    } catch (error) {
      setIsLoading(false);
      incrementLoginAttempts();
      
      console.error("Login error in handleSubmit:", error);
      
      let errorMessage = "Invalid email or password. Please try again.";
      
      if (error.isAxiosError) {
        if (error.response?.data?.message) {
          errorMessage = error.response.data.message;
        } else if (error.response?.data?.data?.message) {
          errorMessage = error.response.data.data.message;
        } else if (error.message) {
          errorMessage = error.message;
        }
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setSubmitError(errorMessage);
    }
  };

  const handleOAuthLogin = (provider) => {
    console.log(`Logging in with ${provider}`);
    setSubmitError(`${provider} OAuth is not yet implemented`);
  };

  const handleInputChangeWithValidation = (field, value) => {
    handleInputChange(field, value);
    validation.handleRealTimeValidation(field, value, setErrors);
  };

  // Theme-based styles
  const pageBg = theme === 'dark'
    ? 'bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800'
    : 'bg-gradient-to-br from-emerald-50 via-white to-cyan-50';

  const floatingElement1 = theme === 'dark'
    ? 'bg-emerald-900/5'
    : 'bg-emerald-300/10';

  const floatingElement2 = theme === 'dark'
    ? 'bg-cyan-900/5'
    : 'bg-cyan-300/10';

  const textColor = theme === 'dark'
    ? 'text-gray-300'
    : 'text-gray-700';

  const headingColor = theme === 'dark'
    ? 'text-white'
    : 'text-gray-900';

  const subtextColor = theme === 'dark'
    ? 'text-gray-400'
    : 'text-gray-600';

  const inputBg = theme === 'dark'
    ? 'bg-gray-900 text-white placeholder-gray-400'
    : 'bg-white text-gray-900 placeholder-gray-500 border-gray-300';

  const inputBorder = theme === 'dark'
    ? 'border-gray-600 focus:border-emerald-400 focus:ring-emerald-400'
    : 'border-gray-300 focus:border-emerald-500 focus:ring-emerald-500';

  const rememberMeCheckbox = theme === 'dark'
    ? 'text-emerald-400 bg-gray-700 border-gray-600 focus:ring-emerald-400'
    : 'text-emerald-600 bg-white border-gray-300 focus:ring-emerald-500';

  const linkColor = theme === 'dark'
    ? 'text-emerald-400 hover:text-emerald-300'
    : 'text-emerald-600 hover:text-emerald-700';

  const dividerColor = theme === 'dark'
    ? 'bg-gray-600 text-gray-400'
    : 'bg-white white';

  return (
    <div className={`min-h-screen relative overflow-hidden  pt-20 sm:pt-36 lg:pt-20 pb-15 px-4 ${pageBg}`}>
      {/* Background */}
      <AuthBackground type="login" theme={theme} />
      
      {/* Floating Elements */}
      <div className={`fixed top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl ${floatingElement1}`} />
      <div className={`fixed bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl ${floatingElement2}`} />  

      {/* Theme Toggle Button */}
      <div className="absolute top-6 right-6 z-50">
        <button
          onClick={toggleTheme}
          className={`p-3 rounded-full shadow-lg transition-all duration-300 ${
            theme === 'dark'
              ? 'bg-gray-800 text-white hover:bg-gray-700'
              : 'bg-white text-gray-800 hover:bg-gray-100'
          }`}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? (
            <Moon className="w-5 h-5" />
          ) : (
            <Sun className="w-5 h-5" />
          )}
        </button>
      </div>

      <div className="relative pt-28 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Benefits & Stats */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-8">
                <div>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring" }}
                    className={`inline-flex items-center gap-2 px-4 py-2 backdrop-blur-sm rounded-full border shadow-sm mb-6 ${
                      theme === 'dark'
                        ? 'bg-gray-800/50 border-emerald-800'
                        : 'bg-white border-emerald-200'
                    }`}
                  >
                    <Sparkles className="w-5 h-5 text-emerald-500" />
                    <span className="bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent font-bold">
                      WELCOME BACK
                    </span>
                  </motion.div>
                  
                  <h1 className={`text-5xl font-bold mb-4 leading-tight ${headingColor}`}>
                    Secure Login to Your
                    <span className="block bg-gradient-to-r from-emerald-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent">
                      AI-Powered Dashboard
                    </span>
                  </h1>
                  
                  <p className={`text-lg max-w-md ${subtextColor}`}>
                    Access personalized recommendations, smart analytics, and exclusive features tailored just for you.
                  </p>
                </div>

                <div className="space-y-4">
                  <SecurityBadge 
                    icon={Shield} 
                    text="Bank-level 256-bit encryption" 
                    delay={0.4} 
                    theme={theme}
                  />
                  <SecurityBadge 
                    icon={Smartphone} 
                    text="Two-factor authentication available" 
                    delay={0.5} 
                    theme={theme}
                  />
                  <SecurityBadge 
                    icon={Sparkles} 
                    text="AI-powered security monitoring" 
                    delay={0.6} 
                    theme={theme}
                  />
                </div>

                <div className={`flex gap-8 pt-6 border-t ${
                  theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                }`}>
                  {statsData.map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      className="text-center"
                    >
                      <div className={`text-2xl font-bold ${headingColor}`}>
                        {stat.value}
                      </div>
                      <div className={`text-sm ${subtextColor}`}>
                        {stat.label}
                      </div>
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
                <div className="relative group">
                  {/* Form Glow Effect */}
                  <div className={`absolute -inset-0.5 bg-gradient-to-r from-emerald-600 via-cyan-600 to-blue-600 rounded-2xl blur transition duration-1000 group-hover:duration-200 ${
                    theme === 'dark' ? 'opacity-20' : 'opacity-30'
                  }`} />
                  
                  {/* Form Card - SOLID WHITE in light mode */}
                  <div className={`relative p-8 rounded-2xl shadow-2xl w-full ${
                    theme === 'dark' 
                      ? 'backdrop-blur-sm bg-gray-800 border border-gray-700' 
                      : 'bg-white border border-gray-200'
                  }`}>
                    <div className="text-center mb-8">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring" }}
                        className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-emerald-600 to-cyan-600 rounded-2xl mb-4 shadow-lg"
                      >
                        <Sparkles className="w-10 h-10 text-white" />
                      </motion.div>
                      
                      <h2 className={`text-3xl font-bold mb-2 ${headingColor}`}>
                        Welcome Back! 👋
                      </h2>
                      <p className={subtextColor}>
                        Sign in to continue your journey
                      </p>
                    </div>

                    <SubmitError 
                      error={errors.submit} 
                      loginAttempts={loginAttempts} 
                      theme={theme}
                    />

                    <div className="space-y-4 mb-6">
                      <OAuthButton 
                        provider="github" 
                        onClick={() => handleOAuthLogin("github")}
                        theme={theme}
                      />
                      <OAuthButton 
                        provider="google" 
                        onClick={() => handleOAuthLogin("google")}
                        theme={theme}
                      />
                    </div>

                    <div className="flex items-center my-8">
                      <div className={`flex-1 h-px ${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-300'}`} />
                      <span className={`mx-4 text-sm font-medium ${dividerColor}`}>
                        Or continue with email
                      </span>
                      <div className={`flex-1 h-px ${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-300'}`} />
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div data-field="email">
                        <div className="relative">
                          <label htmlFor="email" className={`block text-sm font-medium mb-1 ${textColor}`}>
                            Email Address
                          </label>
                          <div className="relative">
                            <div className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                              theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                            }`}>
                              <Mail size={20} />
                            </div>
                            <input
                              id="email"
                              type="email"
                              value={formData.email}
                              onChange={(e) => handleInputChangeWithValidation('email', e.target.value)}
                              onFocus={() => handleFieldFocus('email')}
                              onBlur={() => handleFieldBlur('email')}
                              className={`w-full px-4 py-3 pl-12 rounded-lg border focus:ring-2 focus:ring-opacity-50 focus:outline-none transition-all duration-200 ${
                                hasInteracted.email && errors.email 
                                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                                  : `${inputBorder} ${hasInteracted.email && !errors.email && formData.email.length > 0 ? 'border-emerald-500' : ''}`
                              } ${theme === 'dark' ? 'bg-gray-900 text-white placeholder-gray-400' : 'bg-white text-gray-900 placeholder-gray-500'}`}
                              placeholder="Enter your email address"
                              required
                            />
                          </div>
                          {hasInteracted.email && errors.email && (
                            <p className="text-red-500 text-sm mt-1 ml-1">{errors.email}</p>
                          )}
                        </div>
                        
                        {fieldFocus.email && formData.email && !errors.email && (
                          <motion.div
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-xs text-emerald-600 dark:text-emerald-400 ml-4 mt-1 flex items-center gap-1"
                          >
                            <CheckCircle size={12} />
                            Valid email format
                          </motion.div>
                        )}
                      </div>

                      <div data-field="password">
                        <div className="relative">
                          <label htmlFor="password" className={`block text-sm font-medium mb-1 ${textColor}`}>
                            Password
                          </label>
                          <div className="relative">
                            <div className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                              theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                            }`}>
                              <Lock size={20} />
                            </div>
                            <input
                              id="password"
                              type={showPassword ? "text" : "password"}
                              value={formData.password}
                              onChange={(e) => handleInputChangeWithValidation('password', e.target.value)}
                              onFocus={() => handleFieldFocus('password')}
                              onBlur={() => handleFieldBlur('password')}
                              className={`w-full px-4 py-3 pl-12 pr-12 rounded-lg border focus:ring-2 focus:ring-opacity-50 focus:outline-none transition-all duration-200 ${
                                hasInteracted.password && errors.password 
                                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                                  : `${inputBorder} ${hasInteracted.password && !errors.password && formData.password.length > 0 ? 'border-emerald-500' : ''}`
                              } ${theme === 'dark' ? 'bg-gray-900 text-white placeholder-gray-400' : 'bg-white text-gray-900 placeholder-gray-500'}`}
                              placeholder="Enter your password"
                              required
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                                theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
                              }`}
                              aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                          </div>
                          {hasInteracted.password && errors.password && (
                            <p className="text-red-500 text-sm mt-1 ml-1">{errors.password}</p>
                          )}
                        </div>
                        
                        {formData.password && !errors.password && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className={`text-xs ml-4 mt-1 ${subtextColor}`}
                          >
                            ✓ Password looks good
                          </motion.div>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            className={`w-4 h-4 rounded focus:ring-2 ${
                              theme === 'dark'
                                ? 'text-emerald-400 bg-gray-700 border-gray-600 focus:ring-emerald-400'
                                : 'text-emerald-600 bg-white border-gray-300 focus:ring-emerald-500'
                            }`}
                          />
                          <span className={textColor}>
                            Remember me
                          </span>
                        </label>
                        
                        <Link 
                          to="/forgot-password" 
                          className={`font-medium transition-colors ${linkColor}`}
                        >
                          Forgot password?
                        </Link>
                      </div>

                      <FormStatus 
                        errors={errors} 
                        isFormValid={isFormValid} 
                        isFormComplete={isFormComplete}
                        loginAttempts={loginAttempts}
                        theme={theme}
                      />

                      <motion.button
                        type="submit"
                        disabled={isLoading || (!isFormValid && isFormComplete)}
                        whileHover={{ scale: isFormValid ? 1.02 : 1 }}
                        whileTap={{ scale: isFormValid ? 0.98 : 1 }}
                        className={`w-full py-4 px-6 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all duration-300 ${
                          isFormValid 
                            ? 'bg-gradient-to-r from-emerald-600 via-cyan-600 to-blue-600 hover:shadow-lg cursor-pointer' 
                            : 'cursor-not-allowed'
                        } ${isFormValid ? 'transform hover:-translate-y-0.5' : ''} ${
                          theme === 'dark'
                            ? (isFormValid ? 'hover:shadow-emerald-500/20' : 'bg-gray-700')
                            : (isFormValid ? 'hover:shadow-emerald-500/30' : 'bg-gray-400')
                        }`}
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

                    <div className={`text-center mt-8 pt-6 border-t ${
                      theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                    }`}>
                      <p className={subtextColor}>
                        Don't have an account?{" "}
                        <Link 
                          to="/signup" 
                          className={`font-semibold transition-colors ${linkColor}`}
                        >
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
    </div>
  );
};

export default LoginPage;