export const validateFullName = (value) => {
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

export const validateConfirmPassword = (value, password) => {
  if (!value) {
    return "Please confirm your password";
  }
  if (value !== password) {
    return "Passwords do not match";
  }
  return "";
};

export const getPasswordStrength = (password) => {
  const requirements = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[a-z]/.test(password),
    /\d/.test(password),
    /[!@#$%^&*]/.test(password),
  ];
  
  const metCount = requirements.filter(Boolean).length;
  const percentage = (metCount / requirements.length) * 100;
  
  let level, color, bg;
  
  if (metCount === 0) {
    level = "Very Weak";
    color = "text-red-500";
    bg = "bg-red-500";
  } else if (metCount <= 2) {
    level = "Weak";
    color = "text-orange-500";
    bg = "bg-orange-500";
  } else if (metCount === 3) {
    level = "Fair";
    color = "text-yellow-500";
    bg = "bg-yellow-500";
  } else if (metCount === 4) {
    level = "Good";
    color = "text-lime-500";
    bg = "bg-lime-500";
  } else {
    level = "Strong";
    color = "text-emerald-500";
    bg = "bg-emerald-500";
  }
  
  return {
    level,
    color,
    bg,
    percentage,
    metCount,
  };
};