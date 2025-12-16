
import React from "react";
import { motion } from "framer-motion";
import { 
  Sparkles, 
  CheckCircle,
  ArrowRight,
  Shield,
  Smartphone
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginForm } from "./hooks/useLoginForm";
import { useLoginValidation } from "./utils/useLoginValidation";
import { validateLoginForm } from "./utils/loginValidation";
import authService from "../../../api/auth";
import AuthBackground from "../../../components/AuthBackground";
import FloatingInput from "./components/FloatingInput";
import OAuthButton from "../../../components/OAuthButton";
import SecurityBadge from "../../../components/SecurityBadge";
import FormStatus from "../signupPage/components/FormStatus";
import { SubmitError } from "./components/SubmitError";
import { styles, statsData } from "./styles/LoginPage.styles";
// Login Page
export const LoginPage = () => {
  const navigate = useNavigate();
  
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

  return (
    <div className={styles.container}>
      <AuthBackground type="login" />
      
      <div className={styles.floatingElements.top} />
      <div className={styles.floatingElements.bottom} />

      <div className={styles.layout}>
        <div className={styles.grid}>
          {/* Left Side - Illustration & Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className={styles.leftSide}
          >
            <div className="space-y-8">
              <div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring" }}
                  className={styles.welcomeBadge}
                >
                  <Sparkles className="w-5 h-5 text-purple-500" />
                  <span className="bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-bold">
                    WELCOME BACK
                  </span>
                </motion.div>
                
                <h1 className={styles.title}>
                  Secure Login to Your
                  <span className="block bg-linear-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                    AI-Powered Dashboard
                  </span>
                </h1>
                
                <p className={styles.subtitle}>
                  Access personalized recommendations, smart analytics, and exclusive features tailored just for you.
                </p>
              </div>

              <div className="space-y-4">
                <SecurityBadge icon={Shield} text="Bank-level 256-bit encryption" delay={0.4} />
                <SecurityBadge icon={Smartphone} text="Two-factor authentication available" delay={0.5} />
                <SecurityBadge icon={Sparkles} text="AI-powered security monitoring" delay={0.6} />
              </div>

              <div className={styles.statsContainer}>
                {statsData.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className={styles.statItem}
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
            <div className={styles.formContainer}>
              <div className="relative">
                <div className={styles.formCard.glow} />
                
                <div className={styles.formCard.card}>
                  <div className={styles.header}>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring" }}
                      className={styles.logoContainer}
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

                  <SubmitError error={errors.submit} loginAttempts={loginAttempts} />

                  <div className="space-y-4 mb-6">
                    <OAuthButton 
                      provider="github" 
                      onClick={() => handleOAuthLogin("github")} 
                    />
                    <OAuthButton 
                      provider="google" 
                      onClick={() => handleOAuthLogin("google")} 
                    />
                  </div>

                  <div className={styles.divider}>
                    <div className={styles.dividerLine} />
                    <span className={styles.dividerText}>Or continue with email</span>
                    <div className={styles.dividerLine} />
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div data-field="email">
                      <FloatingInput
                        label="Email Address"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChangeWithValidation('email', e.target.value)}
                        onFocus={() => handleFieldFocus('email')}
                        onBlur={() => handleFieldBlur('email')}
                        error={hasInteracted.email ? errors.email : ""}
                        isValid={hasInteracted.email && !errors.email && formData.email.length > 0}
                        required
                      />
                      
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

                    <div data-field="password">
                      <FloatingInput
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={(e) => handleInputChangeWithValidation('password', e.target.value)}
                        onFocus={() => handleFieldFocus('password')}
                        onBlur={() => handleFieldBlur('password')}
                        error={hasInteracted.password ? errors.password : ""}
                        isValid={hasInteracted.password && !errors.password && formData.password.length > 0}
                        showToggle
                        onToggle={() => setShowPassword(!showPassword)}
                        required
                      />
                      
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

                    <div className="flex items-center justify-between">
                      <label className={styles.rememberMe}>
                        <input
                          type="checkbox"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          className={styles.checkbox}
                        />
                        <span className="text-gray-700">Remember me</span>
                      </label>
                      
                      <Link to="/forgot-password" className="text-purple-600 hover:text-purple-700 font-medium">
                        Forgot password?
                      </Link>
                    </div>

                    <FormStatus 
                      errors={errors} 
                      isFormValid={isFormValid} 
                      isFormComplete={isFormComplete}
                      loginAttempts={loginAttempts}
                    />

                    <motion.button
                      type="submit"
                      disabled={isLoading || (!isFormValid && isFormComplete)}
                      whileHover={{ scale: isFormValid ? 1.02 : 1 }}
                      whileTap={{ scale: isFormValid ? 0.98 : 1 }}
                      className={styles.submitButton}
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

                  <div className={styles.signupLink}>
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
};

export default LoginPage;