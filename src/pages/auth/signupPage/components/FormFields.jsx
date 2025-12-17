


import React from "react";
import { motion } from "framer-motion";
import FloatingInput from "../../../../components/FloatingInput";
import PasswordStrengthIndicator from "./PasswordStrengthIndicator";
import { User, Mail, Lock } from "lucide-react";
import { useTheme } from "../../../../context/ThemeContext";

const FormFields = ({
  formData,
  errors,
  fieldFocus,
  hasInteracted,
  showPassword,
  showConfirmPassword,
  passwordStrength,
  passwordRequirements,
  onInputChange,
  onFieldFocus,
  onFieldBlur,
  onTogglePassword,
  onToggleConfirmPassword,
}) => {
  const { theme } = useTheme();

  // Theme-based styles
  const successTextColor = theme === 'dark'
    ? 'text-emerald-400'
    : 'text-emerald-600';

  const feedbackBg = theme === 'dark'
    ? 'bg-gray-800/50 text-gray-200'
    : 'bg-white/50 text-gray-800';

  return (
    <>
      {/* Full Name Field */}
      <div data-field="fullName">
        <FloatingInput
          label="Full Name"
          type="text"
          icon={User}
          value={formData.fullName}
          onChange={(e) => onInputChange('fullName', e.target.value)}
          onFocus={() => onFieldFocus('fullName')}
          onBlur={() => onFieldBlur('fullName')}
          error={hasInteracted.fullName ? errors.fullName : ""}
          isValid={hasInteracted.fullName && !errors.fullName && formData.fullName.length > 0}
          required
          theme={theme}
        />
        {/* Real-time feedback */}
        {fieldFocus.fullName && formData.fullName && !errors.fullName && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-xs ml-4 mt-1 ${successTextColor}`}
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
          onChange={(e) => onInputChange('email', e.target.value)}
          onFocus={() => onFieldFocus('email')}
          onBlur={() => onFieldBlur('email')}
          error={hasInteracted.email ? errors.email : ""}
          isValid={hasInteracted.email && !errors.email && formData.email.length > 0}
          required
          theme={theme}
        />
        {/* Real-time feedback */}
        {fieldFocus.email && formData.email && !errors.email && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-xs ml-4 mt-1 ${successTextColor}`}
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
          onChange={(e) => onInputChange('password', e.target.value)}
          onFocus={() => onFieldFocus('password')}
          onBlur={() => onFieldBlur('password')}
          error={hasInteracted.password ? errors.password : ""}
          isValid={hasInteracted.password && !errors.password && formData.password.length > 0}
          showToggle
          onToggle={onTogglePassword}
          required
          theme={theme}
        />
        
        <PasswordStrengthIndicator 
          password={formData.password}
          strength={passwordStrength}
          requirements={passwordRequirements}
          theme={theme}
        />
      </div>

      {/* Confirm Password Field */}
      <div data-field="confirmPassword">
        <FloatingInput
          label="Confirm Password"
          type={showConfirmPassword ? "text" : "password"}
          icon={Lock}
          value={formData.confirmPassword}
          onChange={(e) => onInputChange('confirmPassword', e.target.value)}
          onFocus={() => onFieldFocus('confirmPassword')}
          onBlur={() => onFieldBlur('confirmPassword')}
          error={hasInteracted.confirmPassword ? errors.confirmPassword : ""}
          isValid={hasInteracted.confirmPassword && !errors.confirmPassword && formData.confirmPassword.length > 0}
          showToggle
          onToggle={onToggleConfirmPassword}
          required
          theme={theme}
        />
        
        {/* Real-time feedback */}
        {formData.confirmPassword && formData.password && !errors.confirmPassword && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-xs ml-4 mt-1 ${successTextColor}`}
          >
            ✓ Passwords match
          </motion.div>
        )}
      </div>
    </>
  );
};

export default FormFields;