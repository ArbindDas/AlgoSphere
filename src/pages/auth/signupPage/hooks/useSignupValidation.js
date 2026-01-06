import { useState, useRef, useEffect, useCallback } from "react";
import {
  validateFullName,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  getPasswordStrength,
} from "../utils/validationRules";

export const useSignupValidation = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  
  const [errors, setErrors] = useState({});
  const [fieldFocus, setFieldFocus] = useState({
    fullName: false,
    email: false,
    password: false,
    confirmPassword: false,
  });
  
  const [hasInteracted, setHasInteracted] = useState({
    fullName: false,
    email: false,
    password: false,
    confirmPassword: false,
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const validationTimer = useRef(null);

  // Calculate password strength
  const passwordStrength = getPasswordStrength(formData.password);
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

  // Real-time validation handler with debouncing
  const handleRealTimeValidation = useCallback((field, value) => {
    if (validationTimer.current) {
      clearTimeout(validationTimer.current);
    }
    
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
          
          if (formData.confirmPassword && hasInteracted.confirmPassword) {
            const confirmError = validateConfirmPassword(formData.confirmPassword, value);
            if (confirmError) {
              setErrors(prev => ({
                ...prev,
                confirmPassword: confirmError
              }));
            } else {
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
      
      setErrors(prev => {
        const newErrors = { ...prev };
        if (error) {
          newErrors[field] = error;
        } else {
          delete newErrors[field];
        }
        return newErrors;
      });
      
    }, 300);
  }, [formData.confirmPassword, hasInteracted.confirmPassword]);

  // Handle input change
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    setHasInteracted(prev => ({
      ...prev,
      [field]: true
    }));
    
    if (errors.submit) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.submit;
        return newErrors;
      });
    }
    
    handleRealTimeValidation(field, value);
  };

  // Handle field blur
  const handleFieldBlur = (field) => {
    setFieldFocus(prev => ({
      ...prev,
      [field]: false
    }));
    
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

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  // Toggle confirm password visibility
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(prev => !prev);
  };

  // Validate entire form
  const validateForm = () => {
    const newErrors = {};
    
    const fullNameError = validateFullName(formData.fullName);
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    const confirmPasswordError = validateConfirmPassword(formData.confirmPassword, formData.password);
    
    if (fullNameError) newErrors.fullName = fullNameError;
    if (emailError) newErrors.email = emailError;
    if (passwordError) newErrors.password = passwordError;
    if (confirmPasswordError) newErrors.confirmPassword = confirmPasswordError;
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Check if form is valid 
  const isFormValid = () => {
  const hasNoErrors = Object.keys(errors).length === 0;
  const isFormComplete = formData.fullName && 
                        formData.email && 
                        formData.password && 
                        formData.confirmPassword;
  
  return hasNoErrors && isFormComplete;
};


// Add reset function to your hook
const resetForm = useCallback(() => {
  setFormData({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  
  setErrors({});
  setHasInteracted({
    fullName: false,
    email: false,
    password: false,
    confirmPassword: false,
  });
  setFieldFocus({
    fullName: false,
    email: false,
    password: false,
    confirmPassword: false,
  });
  setShowPassword(false);
  setShowConfirmPassword(false);
}, []);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (validationTimer.current) {
        clearTimeout(validationTimer.current);
      }
    };
  }, []);

  return {
    formData,
    errors,
    fieldFocus,
    hasInteracted,
    showPassword,
    showConfirmPassword,
    passwordStrength,
    passwordRequirements,
    isFormValid: isFormValid,
    handleInputChange,
    handleFieldFocus,
    handleFieldBlur,
    validateForm,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
     resetForm,
  };
};