export const validateEmail = (value) => {
  if (!value) {
    return "Email is required";
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) {
    return "Please enter a valid email address";
  }
  
  if (value.length > 100) {
    return "Email is too long";
  }
  
  if (value.includes("..") || value.includes(".@") || value.includes("@.")) {
    return "Email format is invalid";
  }
  
  if (/\s/.test(value)) {
    return "Email cannot contain spaces";
  }
  
  return "";
};

export const validatePassword = (value) => {
  if (!value) {
    return "Password is required";
  }
  
  if (value.length < 6) {
    return "Password must be at least 6 characters";
  }
  
  if (value.length > 50) {
    return "Password is too long";
  }
  
  if (/(.)\1{5,}/.test(value)) {
    return "Password contains repeating characters";
  }
  
  return "";
};

export const validateLoginForm = (formData) => {
  const newErrors = {};
  
  newErrors.email = validateEmail(formData.email);
  newErrors.password = validatePassword(formData.password);
  
  const filteredErrors = Object.fromEntries(
    Object.entries(newErrors).filter(([_, value]) => value !== "")
  );
  
  return filteredErrors;
};