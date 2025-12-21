import { useState, useRef, useEffect, useCallback } from "react";

export const useLoginForm = (initialState = { email: "", password: "" }) => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [fieldFocus, setFieldFocus] = useState({
    email: false,
    password: false,
  });
  
  const [hasInteracted, setHasInteracted] = useState({
    email: false,
    password: false,
  });
  const [loginAttempts, setLoginAttempts] = useState(0);
  const validationTimer = useRef(null);

  const handleInputChange = useCallback((field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setHasInteracted(prev => ({ ...prev, [field]: true }));
    
    if (errors.submit) {
      setErrors(prev => ({ ...prev, submit: "" }));
    }
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  }, [errors]);

  const handleFieldBlur = useCallback((field) => {
    setFieldFocus(prev => ({ ...prev, [field]: false }));
  }, []);

  const handleFieldFocus = useCallback((field) => {
    setFieldFocus(prev => ({ ...prev, [field]: true }));
  }, []);

  const incrementLoginAttempts = useCallback(() => {
    setLoginAttempts(prev => prev + 1);
  }, []);

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  const setSubmitError = useCallback((error) => {
    setErrors(prev => ({ ...prev, submit: error }));
  }, []);

  const isFormComplete = formData.email && formData.password;
  const isFormValid = !errors.email && !errors.password && isFormComplete;

  useEffect(() => {
    return () => {
      if (validationTimer.current) {
        clearTimeout(validationTimer.current);
      }
    };
  }, []);

  return {
    formData,
    setFormData,
    errors,
    setErrors,
    showPassword,
    setShowPassword,
    isLoading,
    setIsLoading,
    rememberMe,
    setRememberMe,
    fieldFocus,
    setFieldFocus,
    hasInteracted,
    setHasInteracted,
    loginAttempts,
    incrementLoginAttempts,
    validationTimer,
    handleInputChange,
    handleFieldBlur,
    handleFieldFocus,
    clearErrors,
    setSubmitError,
    isFormComplete,
    isFormValid
  };
};