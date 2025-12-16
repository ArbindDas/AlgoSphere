import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, CheckCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../../../api/auth";
import { useSignupValidation } from "../hooks/useSignupValidation";
import OAuthButton from "../../../../components/OAuthButton";
import FormFields from "./FormFields";
import FormStatus from "./FormStatus";
import { Github, Chrome } from "lucide-react";

const SignupForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const {
    formData,
    errors,
    fieldFocus,
    hasInteracted,
    showPassword,
    showConfirmPassword,
    passwordStrength,
    passwordRequirements,
    isFormValid,
    handleInputChange,
    handleFieldFocus,
    handleFieldBlur,
    validateForm,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
  } = useSignupValidation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm() || !acceptTerms) {
      return;
    }
    
    setIsLoading(true);
    setSubmitError("");
    
    try {
      const response = await authService.signup(
        formData.fullName,
        formData.email,
        formData.password
      );

      console.log("Signup successful:", response);
      setIsLoading(false);
      
      setTimeout(() => {
        navigate("/login");
      }, 1500);
      
    } catch (error) {
      setIsLoading(false);
      
      if (error.response?.data?.message) {
        setSubmitError(error.response.data.message);
      } else if (error.message) {
        setSubmitError(error.message);
      } else {
        setSubmitError("An error occurred during signup. Please try again.");
      }
      
      console.error("Signup error:", error);
    }
  };

  const handleOAuthSignup = (provider) => {
    console.log(`Signing up with ${provider}`);
    setSubmitError(`${provider} OAuth is not yet implemented`);
  };

  return (
    <div className="relative">
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-linear-to-br from-emerald-500 to-cyan-500 rounded-3xl blur-2xl opacity-20" />

      {/* Form Card */}
      <div className="relative bg-white/95 backdrop-blur-xl border border-white/40 rounded-3xl p-6 shadow-2xl shadow-black/10">
        {/* Header */}
        <div className="text-center mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-16 h-16 rounded-2xl bg-linear-to-br from-emerald-500 to-cyan-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/30"
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
        {submitError && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm"
          >
            {submitError}
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
          <FormFields
            formData={formData}
            errors={errors}
            fieldFocus={fieldFocus}
            hasInteracted={hasInteracted}
            showPassword={showPassword}
            showConfirmPassword={showConfirmPassword}
            passwordStrength={passwordStrength}
            passwordRequirements={passwordRequirements}
            onInputChange={handleInputChange}
            onFieldFocus={handleFieldFocus}
            onFieldBlur={handleFieldBlur}
            onTogglePassword={togglePasswordVisibility}
            onToggleConfirmPassword={toggleConfirmPasswordVisibility}
          />

          {/* Terms & Conditions */}
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
            {!acceptTerms && Object.keys(errors).length > 0 && (
              <p className="text-red-500 text-xs pl-6">
                You must accept the terms and conditions
              </p>
            )}
          </div>

          {/* Form Status */}
          <FormStatus 
            errors={errors} 
            isFormValid={isFormValid()} 
            acceptTerms={acceptTerms}
          />

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isLoading || !isFormValid() || !acceptTerms}
            whileHover={{ scale: isFormValid() && acceptTerms ? 1.02 : 1 }}
            whileTap={{ scale: isFormValid() && acceptTerms ? 0.98 : 1 }}
            className="w-full py-3 rounded-xl bg-linear-to-r from-emerald-600 to-cyan-600 text-white font-semibold shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
  );
};

export default SignupForm;