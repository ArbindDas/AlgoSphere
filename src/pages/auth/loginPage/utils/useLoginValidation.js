import { useCallback } from "react";
import { validateEmail, validatePassword } from "./loginValidation";

export const useLoginValidation = (validationTimerRef) => {
  const handleRealTimeValidation = useCallback((field, value, setErrors) => {
    if (validationTimerRef.current) {
      clearTimeout(validationTimerRef.current);
    }
    
    validationTimerRef.current = setTimeout(() => {
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
      
      setErrors(prev => ({
        ...prev,
        [field]: error
      }));
      
    }, 250);
  }, [validationTimerRef]);

  return { handleRealTimeValidation };
};