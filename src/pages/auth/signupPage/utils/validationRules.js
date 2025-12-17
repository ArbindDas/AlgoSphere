

// ============================================
// FULL NAME VALIDATOR - PRODUCTION GRADE
// ============================================

export const validateFullName = (value) => {
  // Phase 1: Basic checks
  if (!value) {
    return "Full name is required";
  }
  
  const trimmedValue = value.trim();
  
  if (trimmedValue !== value) {
    return "Name cannot have leading or trailing spaces";
  }
  
  if (trimmedValue.length < 2) {
    return "Name must be at least 2 characters long";
  }
  
  if (trimmedValue.length > 100) {
    return "Name is too long (max 100 characters)";
  }
  
  // Phase 2: Character validation
  // Allow letters, spaces, hyphens, apostrophes (for names like O'Brien, Mary-Jane)
  if (!/^[a-zA-Z\s'-]+$/.test(trimmedValue)) {
    return "Name can only contain letters, spaces, hyphens, and apostrophes";
  }
  
  // Phase 3: Pattern validation
  if (/\s{2,}/.test(trimmedValue)) {
    return "Name cannot have multiple consecutive spaces";
  }
  
  if (/[-']{2,}/.test(trimmedValue)) {
    return "Name cannot have consecutive hyphens or apostrophes";
  }
  
  if (/^[\s'-]/.test(trimmedValue) || /[\s'-]$/.test(trimmedValue)) {
    return "Name cannot start or end with spaces, hyphens, or apostrophes";
  }
  
  // Phase 4: Word count validation (should have at least first and last name)
  const words = trimmedValue.split(/\s+/).filter(word => word.length > 0);
  
  if (words.length < 2) {
    return "Please enter both first and last name";
  }
  
  if (words.length > 5) {
    return "Name cannot have more than 5 parts";
  }
  
  // Phase 5: Individual word validation
  for (const word of words) {
    if (word.length < 2) {
      return "Each name part must be at least 2 characters long";
    }
    
    // Check for repeated characters (like "aaa" or "bbb")
    if (/(.)\1{2,}/.test(word)) {
      return "Name contains too many repeated characters";
    }
  }
  
  // Phase 6: Suspicious pattern detection
  const suspiciousPatterns = [
    { pattern: /^[0-9]+$/, message: "Name cannot be only numbers" },
    { pattern: /test|fake|dummy|example|sample/i, message: "Please enter a real name" },
    { pattern: /^[a-z]+$/i, message: "Please capitalize the first letter of each name" },
    { pattern: /^[A-Z]+$/, message: "Name cannot be all uppercase" },
    { pattern: /asdf|qwer|zxcv|hjkl/i, message: "Please enter a valid name" },
  ];
  
  for (const { pattern, message } of suspiciousPatterns) {
    if (pattern.test(trimmedValue)) {
      return message;
    }
  }
  
  return "";
};

// ============================================
// EMAIL VALIDATOR - PRODUCTION GRADE
// ============================================

export const validateEmail = (value) => {
  // Phase 1: Basic validation
  if (!value) {
    return "Email is required";
  }
  
  const trimmedValue = value.trim();
  
  if (trimmedValue !== value) {
    return "Email cannot have leading or trailing spaces";
  }
  
  if (trimmedValue.length > 254) {
    return "Email exceeds maximum length of 254 characters";
  }
  
  if (trimmedValue.length < 6) {
    return "Email is too short (minimum: a@b.co)";
  }
  
  if (/\s/.test(trimmedValue)) {
    return "Email cannot contain spaces";
  }
  
  // Phase 2: Structure validation
  const atCount = (trimmedValue.match(/@/g) || []).length;
  if (atCount === 0) {
    return "Email must contain an @ symbol";
  }
  if (atCount > 1) {
    return "Email cannot contain multiple @ symbols";
  }
  
  const atIndex = trimmedValue.indexOf('@');
  const localPart = trimmedValue.slice(0, atIndex);
  const domainPart = trimmedValue.slice(atIndex + 1);
  
  if (!localPart) {
    return "Email cannot start with @";
  }
  
  if (!domainPart) {
    return "Email must have a domain after @";
  }
  
  // Phase 3: Local part validation
  if (localPart.length > 64) {
    return "Email username part cannot exceed 64 characters";
  }
  
  if (/^[.\-_]/.test(localPart) || /[.\-_]$/.test(localPart)) {
    return "Email username cannot start or end with dots, dashes, or underscores";
  }
  
  if (/[.\-_]{2,}/.test(localPart)) {
    return "Email username cannot have consecutive special characters";
  }
  
  if (!/^[a-zA-Z0-9.\-_+]+$/.test(localPart)) {
    return "Email username contains invalid characters";
  }
  
  // Phase 4: Domain validation
  const domainLower = domainPart.toLowerCase();
  
  if (!domainLower.includes('.')) {
    return "Email domain must contain at least one dot";
  }
  
  if (domainLower.startsWith('.') || domainLower.endsWith('.')) {
    return "Email domain cannot start or end with a dot";
  }
  
  if (/\.\./.test(domainLower)) {
    return "Email domain cannot have consecutive dots";
  }
  
  if (domainLower.startsWith('-') || domainLower.endsWith('-')) {
    return "Email domain cannot start or end with a dash";
  }
  
  const domainLabels = domainLower.split('.');
  
  if (domainLabels.length < 2) {
    return "Email domain must have at least two parts (e.g., example.com)";
  }
  
  // Check TLD
  const tld = domainLabels[domainLabels.length - 1];
  if (tld.length < 2) {
    return "Email domain extension must be at least 2 characters";
  }
  
  if (!/^[a-z]{2,}$/.test(tld)) {
    return "Email domain extension can only contain letters";
  }
  
  // Check each domain label
  for (let i = 0; i < domainLabels.length; i++) {
    const label = domainLabels[i];
    
    if (label.length === 0) {
      return "Email domain has empty parts between dots";
    }
    
    if (label.length > 63) {
      return `Email domain part "${label}" is too long (max 63 characters)`;
    }
    
    if (label.startsWith('-') || label.endsWith('-')) {
      return `Email domain part "${label}" cannot start or end with a dash`;
    }
    
    if (i < domainLabels.length - 1 && !/^[a-z0-9-]+$/.test(label)) {
      return `Email domain part "${label}" contains invalid characters`;
    }
  }
  
  // Phase 5: Common typo detection
  const commonTypos = {
    'gmai.com': 'gmail.com',
    'gmal.com': 'gmail.com',
    'gmial.com': 'gmail.com',
    'gmail.co': 'gmail.com',
    'gmail.comm': 'gmail.com',
    'gmail.con': 'gmail.com',
    'yaho.com': 'yahoo.com',
    'yahoo.co': 'yahoo.com',
    'yahoo.comm': 'yahoo.com',
    'hotmal.com': 'hotmail.com',
    'hotmail.co': 'hotmail.com',
    'outlook.co': 'outlook.com',
    'outlook.comm': 'outlook.com',
  };
  
  if (commonTypos[domainLower]) {
    return `Did you mean "${localPart}@${commonTypos[domainLower]}"?`;
  }
  
  // Phase 6: Provider-specific validation
  const googleDomains = ['gmail.com', 'googlemail.com'];
  if (googleDomains.includes(domainLower)) {
    const localLower = localPart.toLowerCase();
    
    if (localLower.length < 6) {
      return "Gmail username must be at least 6 characters";
    }
    
    if (localLower.length > 30) {
      return "Gmail username cannot exceed 30 characters";
    }
    
    if (!/^[a-z0-9.]+$/.test(localLower)) {
      return "Gmail username can only contain letters, numbers, and dots";
    }
    
    if (!/[a-z]/.test(localLower)) {
      return "Gmail username must contain at least one letter";
    }
    
    if (/^[0-9.]+$/.test(localLower)) {
      return "Gmail username cannot be only numbers and dots";
    }
    
    if (localLower.startsWith('.') || localLower.endsWith('.')) {
      return "Gmail username cannot start or end with a dot";
    }
    
    if (/\.\./.test(localLower)) {
      return "Gmail username cannot have consecutive dots";
    }
  }
  
  // Phase 7: Suspicious pattern detection
  if (/^test@/i.test(trimmedValue)) {
    return "Please use a real email address, not a test email";
  }
  
  if (/@example\./i.test(trimmedValue)) {
    return "Please use a real email address, not an example domain";
  }
  
  // Phase 8: Final RFC-compliant check
  const emailRegex = /^[a-zA-Z0-9]([a-zA-Z0-9._+-]{0,62}[a-zA-Z0-9])?@[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;
  
  if (!emailRegex.test(trimmedValue)) {
    return "Please enter a valid email address";
  }
  
  return "";
};

// ============================================
// PASSWORD VALIDATOR - PRODUCTION GRADE
// ============================================

export const validatePassword = (value) => {
  // Phase 1: Basic validation
  if (!value) {
    return "Password is required";
  }
  
  if (value !== value.trim()) {
    return "Password cannot have leading or trailing spaces";
  }
  
  if (value.length < 8) {
    return "Password must be at least 8 characters long";
  }
  
  if (value.length > 128) {
    return "Password cannot exceed 128 characters";
  }
  
  // Phase 2: Character requirements
  const checks = {
    hasUpperCase: /[A-Z]/.test(value),
    hasLowerCase: /[a-z]/.test(value),
    hasNumber: /\d/.test(value),
    hasSpecialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]/.test(value),
  };
  
  if (!checks.hasUpperCase) {
    return "Password must contain at least one uppercase letter (A-Z)";
  }
  
  if (!checks.hasLowerCase) {
    return "Password must contain at least one lowercase letter (a-z)";
  }
  
  if (!checks.hasNumber) {
    return "Password must contain at least one number (0-9)";
  }
  
  if (!checks.hasSpecialChar) {
    return "Password must contain at least one special character (!@#$%^&*...)";
  }
  
  // Phase 3: Pattern security checks
  if (/(.)\1{4,}/.test(value)) {
    return "Password has too many repeating characters";
  }
  
  // Check for sequences
  const sequences = [
    'abc', 'bcd', 'cde', 'def', 'efg', 'fgh', 'ghi', 'hij', 'ijk',
    'jkl', 'klm', 'lmn', 'mno', 'nop', 'opq', 'pqr', 'qrs', 'rst',
    'stu', 'tuv', 'uvw', 'vwx', 'wxy', 'xyz',
    '012', '123', '234', '345', '456', '567', '678', '789',
    'qwe', 'wer', 'ert', 'rty', 'tyu', 'yui', 'uio', 'iop',
    'asd', 'sdf', 'dfg', 'fgh', 'ghj', 'hjk', 'jkl',
    'zxc', 'xcv', 'cvb', 'vbn', 'bnm',
  ];
  
  const lowerValue = value.toLowerCase();
  for (const seq of sequences) {
    if (lowerValue.includes(seq)) {
      return `Password contains a predictable sequence ("${seq}")`;
    }
  }
  
  // Phase 4: Common password check
  const commonPasswords = [
    'password', 'password1', 'password123', 'password12',
    '12345678', '123456789', '1234567890',
    'qwerty', 'qwerty123', 'qwertyuiop',
    'admin123', 'admin1234',
    'welcome1', 'welcome123',
    'letmein1', 'letmein123',
    'monkey123', 'dragon123',
    'passw0rd', 'p@ssword', 'p@ssw0rd',
  ];
  
  const valueWithoutSpecial = value.replace(/[^a-z0-9]/gi, '').toLowerCase();
  
  if (commonPasswords.includes(lowerValue)) {
    return "This password is too common and easily guessable";
  }
  
  if (commonPasswords.includes(valueWithoutSpecial)) {
    return "This password is too common (adding symbols doesn't make it secure)";
  }
  
  // Phase 5: Year/date detection
  const currentYear = new Date().getFullYear();
  for (let i = 0; i < 10; i++) {
    if (value.includes(String(currentYear - i))) {
      return `Password should not contain recent years (${currentYear - i})`;
    }
  }
  
  if (/\d{8}/.test(value)) {
    return "Password should not contain date patterns";
  }
  
  // Phase 6: Character diversity
  const uniqueChars = new Set(value).size;
  if (uniqueChars < Math.min(6, value.length * 0.5)) {
    return "Password lacks character diversity";
  }
  
  // Phase 7: Dictionary word detection
  const commonWords = [
    'love', 'hate', 'happy', 'summer', 'winter', 'hello', 'world',
    'computer', 'internet', 'secret', 'secure', 'account', 'login',
  ];
  
  for (const word of commonWords) {
    if (lowerValue.includes(word) && word.length >= 4) {
      return `Password contains a common word ("${word}")`;
    }
  }
  
  return "";
};

// ============================================
// CONFIRM PASSWORD VALIDATOR
// ============================================

export const validateConfirmPassword = (value, password) => {
  if (!value) {
    return "Please confirm your password";
  }
  
  if (value !== password) {
    return "Passwords do not match";
  }
  
  return "";
};

// ============================================
// PASSWORD STRENGTH CALCULATOR
// (Keeping exact same output format for compatibility)
// ============================================

export const getPasswordStrength = (password) => {
  if (!password) {
    return {
      level: "Very Weak",
      color: "text-red-500",
      bg: "bg-red-500",
      percentage: 0,
      metCount: 0,
    };
  }
  
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