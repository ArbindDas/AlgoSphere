
export const validateEmail = (value) => {
  // ============================================
  // PHASE 1: INITIAL CHECKS
  // ============================================
  
  if (!value) {
    return "Email address is required";
  }
  
  const trimmedValue = value.trim();
  
  // Check for whitespace issues
  if (trimmedValue !== value) {
    return "Email cannot have leading or trailing spaces";
  }
  
  // Check for internal whitespace
  if (/\s/.test(trimmedValue)) {
    return "Email cannot contain spaces";
  }
  
  // Length validation
  if (trimmedValue.length > 254) {
    return "Email exceeds maximum length of 254 characters (RFC 5321)";
  }
  
  if (trimmedValue.length < 6) {
    return "Email is too short (minimum format: a@b.co)";
  }
  
  // ============================================
  // PHASE 2: STRUCTURAL VALIDATION
  // ============================================
  
  // Check for exactly one @ symbol
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
  
  // Check for empty parts
  if (!localPart) {
    return "Email cannot start with @";
  }
  
  if (!domainPart) {
    return "Email must have a domain after @";
  }
  
  // ============================================
  // PHASE 3: LOCAL PART VALIDATION (before @)
  // ============================================
  
  if (localPart.length > 64) {
    return "Username part (before @) cannot exceed 64 characters";
  }
  
  // Check for invalid starting/ending characters
  if (/^[.\-_]/.test(localPart)) {
    return "Username cannot start with a dot, dash, or underscore";
  }
  
  if (/[.\-_]$/.test(localPart)) {
    return "Username cannot end with a dot, dash, or underscore";
  }
  
  // Check for consecutive special characters
  if (/[.\-_]{2,}/.test(localPart)) {
    return "Username cannot have consecutive dots, dashes, or underscores";
  }
  
  // Comprehensive local part validation
  // Allows: letters, numbers, and common special chars (. - _ + !)
  const localPartRegex = /^[a-zA-Z0-9]+([.\-_+][a-zA-Z0-9]+)*$/;
  if (!localPartRegex.test(localPart)) {
    return "Username contains invalid characters (allowed: letters, numbers, dots, dashes, underscores, plus signs)";
  }
  
  // ============================================
  // PHASE 4: DOMAIN VALIDATION (after @)
  // ============================================
  
  const domainLower = domainPart.toLowerCase();
  
  // Domain length check
  if (domainLower.length > 253) {
    return "Domain name exceeds maximum length of 253 characters";
  }
  
  if (domainLower.length < 4) {
    return "Domain is too short (minimum: a.co)";
  }
  
  // Check for dots in domain
  if (!domainLower.includes('.')) {
    return "Domain must contain at least one dot (e.g., example.com)";
  }
  
  // Check domain structure
  if (domainLower.startsWith('.') || domainLower.endsWith('.')) {
    return "Domain cannot start or end with a dot";
  }
  
  if (domainLower.startsWith('-') || domainLower.endsWith('-')) {
    return "Domain cannot start or end with a dash";
  }
  
  if (/\.\./.test(domainLower)) {
    return "Domain cannot have consecutive dots";
  }
  
  if (/--/.test(domainLower)) {
    return "Domain cannot have consecutive dashes";
  }
  
  // Validate domain format (labels separated by dots)
  const domainLabels = domainLower.split('.');
  
  if (domainLabels.length < 2) {
    return "Domain must have at least two parts (e.g., example.com)";
  }
  
  // Check each domain label
  for (let i = 0; i < domainLabels.length; i++) {
    const label = domainLabels[i];
    const isLastLabel = i === domainLabels.length - 1;
    
    if (label.length === 0) {
      return "Domain contains empty label between dots";
    }
    
    if (label.length > 63) {
      return `Domain label "${label}" exceeds maximum length of 63 characters`;
    }
    
    // TLD (last label) must be at least 2 characters and only letters
    if (isLastLabel) {
      if (label.length < 2) {
        return "Top-level domain (TLD) must be at least 2 characters (e.g., .com, .co)";
      }
      
      if (!/^[a-z]{2,}$/.test(label)) {
        return `Invalid TLD "${label}" - must contain only letters and be at least 2 characters`;
      }
    } else {
      // Non-TLD labels: allow letters, numbers, and hyphens (but not at start/end)
      if (label.startsWith('-') || label.endsWith('-')) {
        return `Domain label "${label}" cannot start or end with a dash`;
      }
      
      if (!/^[a-z0-9-]+$/.test(label)) {
        return `Domain label "${label}" contains invalid characters (only letters, numbers, and dashes allowed)`;
      }
    }
  }
  
  // ============================================
  // PHASE 5: COMMON TYPO DETECTION
  // ============================================
  
  const commonTypos = {
    // Gmail typos
    'gmai.com': 'gmail.com',
    'gmal.com': 'gmail.com',
    'gmial.com': 'gmail.com',
    'gmaill.com': 'gmail.com',
    'gmail.co': 'gmail.com',
    'gmail.comm': 'gmail.com',
    'gmail.commm': 'gmail.com',
    'gmail.con': 'gmail.com',
    'gmail.coom': 'gmail.com',
    'gmil.com': 'gmail.com',
    'gail.com': 'gmail.com',
    
    // Yahoo typos
    'yaho.com': 'yahoo.com',
    'yahooo.com': 'yahoo.com',
    'yahoo.co': 'yahoo.com',
    'yahoo.comm': 'yahoo.com',
    'yahho.com': 'yahoo.com',
    
    // Outlook/Hotmail typos
    'hotmal.com': 'hotmail.com',
    'hotmial.com': 'hotmail.com',
    'hotmail.co': 'hotmail.com',
    'hotmail.comm': 'hotmail.com',
    'outlook.co': 'outlook.com',
    'outlook.comm': 'outlook.com',
    'outlok.com': 'outlook.com',
    
    // Other common providers
    'icloud.co': 'icloud.com',
    'icloud.comm': 'icloud.com',
    'aol.co': 'aol.com',
    'protonmail.co': 'protonmail.com',
  };
  
  if (commonTypos[domainLower]) {
    return `Did you mean "${localPart}@${commonTypos[domainLower]}"? Domain appears to be misspelled.`;
  }
  
  // ============================================
  // PHASE 6: PROVIDER-SPECIFIC VALIDATION
  // ============================================
  
  const googleDomains = ['gmail.com', 'googlemail.com'];
  const isGoogleEmail = googleDomains.includes(domainLower);
  
  if (isGoogleEmail) {
    const localLower = localPart.toLowerCase();
    
    // Gmail-specific rules
    if (localLower.length < 6) {
      return "Gmail username must be at least 6 characters long";
    }
    
    if (localLower.length > 30) {
      return "Gmail username cannot exceed 30 characters";
    }
    
    // Gmail only allows letters, numbers, and dots
    if (!/^[a-z0-9.]+$/.test(localLower)) {
      return "Gmail username can only contain letters (a-z), numbers (0-9), and dots (.)";
    }
    
    // Must contain at least one letter
    if (!/[a-z]/.test(localLower)) {
      return "Gmail username must contain at least one letter";
    }
    
    // Cannot be only numbers (even with dots)
    if (/^[0-9.]+$/.test(localLower)) {
      return "Gmail username cannot consist only of numbers and dots";
    }
    
    // Dot-specific rules
    if (localLower.startsWith('.') || localLower.endsWith('.')) {
      return "Gmail username cannot start or end with a dot";
    }
    
    if (/\.\./.test(localLower)) {
      return "Gmail username cannot have consecutive dots";
    }
  }
  
  // ============================================
  // PHASE 7: SUSPICIOUS PATTERN DETECTION
  // ============================================
  
  // Check for common test/fake patterns
  const suspiciousPatterns = [
    { pattern: /^test@/i, message: "Email appears to be a test address" },
    { pattern: /^fake@/i, message: "Email appears to be a fake address" },
    { pattern: /^noreply@/i, message: "Email appears to be a no-reply address" },
    { pattern: /^admin@/i, message: "Using admin@ emails is not recommended for personal accounts" },
    { pattern: /@example\./i, message: "example.com is a reserved domain for documentation" },
    { pattern: /@test\./i, message: "test domains are typically not valid for registration" },
    { pattern: /^[a-z]{1}@/i, message: "Single character usernames are unusual and may not be accepted" },
  ];
  
  for (const { pattern, message } of suspiciousPatterns) {
    if (pattern.test(trimmedValue)) {
      return message;
    }
  }
  
  // ============================================
  // PHASE 8: FINAL RFC-COMPLIANT REGEX CHECK
  // ============================================
  
  // Comprehensive RFC 5322 compliant regex (simplified for practical use)
  const rfcCompliantRegex = /^[a-zA-Z0-9]([a-zA-Z0-9._+-]{0,62}[a-zA-Z0-9])?@[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;
  
  if (!rfcCompliantRegex.test(trimmedValue)) {
    return "Email format is invalid according to email standards (RFC 5322)";
  }
  
  // All validation passed
  return "";
};

// ============================================
// USAGE EXAMPLES
// ============================================

// Test the validator
const testEmails = [
  "dasarbind269@gmail.commm",  // Should fail: typo in domain
  "dasarbind269@gmail.com",     // Should pass
  "test..user@example.com",     // Should fail: consecutive dots
  "user@example",               // Should fail: no TLD
  ".user@example.com",          // Should fail: starts with dot
  "user@.example.com",          // Should fail: domain starts with dot
  "a@b.co",                     // Should pass: minimal valid
  "user+tag@domain.com",        // Should pass: plus addressing
];

console.log("Email Validation Tests:");
testEmails.forEach(email => {
  const error = validateEmail(email);
  console.log(`${email}: ${error || "✓ VALID"}`);
});



// ============================================
// PRODUCTION-GRADE PASSWORD VALIDATOR
// ============================================

/**
 * Validates password with strict security requirements
 * @param {string} value - Password to validate
 * @param {Object} options - Validation options
 * @returns {string} - Error message or empty string if valid
 */
export const validatePassword = (value, options = {}) => {
  const config = {
    minLength: 8,
    maxLength: 128,
    requireUppercase: true,
    requireLowercase: true,
    requireNumber: true,
    requireSpecialChar: true,
    preventCommonPasswords: true,
    preventSequences: true,
    preventRepeating: true,
    ...options
  };
  
  // ============================================
  // PHASE 1: BASIC VALIDATION
  // ============================================
  
  if (!value) {
    return "Password is required";
  }
  
  // Type check
  if (typeof value !== 'string') {
    return "Password must be a text value";
  }
  
  // Trim check - passwords should not have leading/trailing spaces
  if (value !== value.trim()) {
    return "Password cannot have leading or trailing spaces";
  }
  
  // Length validation
  if (value.length < config.minLength) {
    return `Password must be at least ${config.minLength} characters long`;
  }
  
  if (value.length > config.maxLength) {
    return `Password cannot exceed ${config.maxLength} characters`;
  }
  
  // ============================================
  // PHASE 2: CHARACTER REQUIREMENT VALIDATION
  // ============================================
  
  const validationResults = {
    hasUpperCase: /[A-Z]/.test(value),
    hasLowerCase: /[a-z]/.test(value),
    hasNumber: /\d/.test(value),
    hasSpecialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]/.test(value)
  };
  
  const missingRequirements = [];
  
  if (config.requireUppercase && !validationResults.hasUpperCase) {
    missingRequirements.push("one uppercase letter (A-Z)");
  }
  
  if (config.requireLowercase && !validationResults.hasLowerCase) {
    missingRequirements.push("one lowercase letter (a-z)");
  }
  
  if (config.requireNumber && !validationResults.hasNumber) {
    missingRequirements.push("one number (0-9)");
  }
  
  if (config.requireSpecialChar && !validationResults.hasSpecialChar) {
    missingRequirements.push("one special character (!@#$%^&*...)");
  }
  
  if (missingRequirements.length > 0) {
    if (missingRequirements.length === 1) {
      return `Password must contain at least ${missingRequirements[0]}`;
    } else if (missingRequirements.length === 2) {
      return `Password must contain at least ${missingRequirements[0]} and ${missingRequirements[1]}`;
    } else {
      const last = missingRequirements.pop();
      return `Password must contain at least ${missingRequirements.join(", ")}, and ${last}`;
    }
  }
  
  // ============================================
  // PHASE 3: PATTERN SECURITY CHECKS
  // ============================================
  
  // Check for repeating characters (5+ same characters in a row)
  if (config.preventRepeating) {
    const repeatingMatch = value.match(/(.)\1{4,}/);
    if (repeatingMatch) {
      return `Password contains too many repeating characters ("${repeatingMatch[0]}")`;
    }
  }
  
  // Check for sequential patterns
  if (config.preventSequences) {
    // Alphabet sequences (forward and backward)
    const alphabetSequences = [
      'abc', 'bcd', 'cde', 'def', 'efg', 'fgh', 'ghi', 'hij', 'ijk', 
      'jkl', 'klm', 'lmn', 'mno', 'nop', 'opq', 'pqr', 'qrs', 'rst', 
      'stu', 'tuv', 'uvw', 'vwx', 'wxy', 'xyz',
      'cba', 'dcb', 'edc', 'fed', 'gfe', 'hgf', 'ihg', 'jih', 'kji',
      'lkj', 'mlk', 'nml', 'onm', 'pon', 'qpo', 'rqp', 'srq', 'tsr',
      'uts', 'vut', 'wvu', 'xwv', 'yxw', 'zyx'
    ];
    
    // Number sequences (forward and backward)
    const numberSequences = [
      '012', '123', '234', '345', '456', '567', '678', '789',
      '210', '321', '432', '543', '654', '765', '876', '987'
    ];
    
    // Keyboard patterns (common QWERTY patterns)
    const keyboardPatterns = [
      'qwe', 'wer', 'ert', 'rty', 'tyu', 'yui', 'uio', 'iop',
      'asd', 'sdf', 'dfg', 'fgh', 'ghj', 'hjk', 'jkl',
      'zxc', 'xcv', 'cvb', 'vbn', 'bnm',
      'qaz', 'wsx', 'edc', 'rfv', 'tgb', 'yhn', 'ujm', 'ik,'
    ];
    
    const allSequences = [...alphabetSequences, ...numberSequences, ...keyboardPatterns];
    const lowerValue = value.toLowerCase();
    
    for (const sequence of allSequences) {
      if (lowerValue.includes(sequence)) {
        return `Password contains a predictable sequence ("${sequence}")`;
      }
    }
  }
  
  // ============================================
  // PHASE 4: COMMON PASSWORD CHECKS
  // ============================================
  
  if (config.preventCommonPasswords) {
    // Extended list of most common passwords
    const commonPasswords = [
      // Top passwords
      'password', 'password1', 'password123', 'password12', 'pass1234',
      '12345678', '123456789', '1234567890', '12345678910',
      
      // Keyboard patterns
      'qwerty', 'qwerty123', 'qwertyuiop', 'qwer1234',
      'asdfgh', 'asdfghjkl', 'zxcvbnm',
      
      // Common words with numbers
      'welcome1', 'welcome123', 'welcome12',
      'admin123', 'admin1234', 'administrator',
      'letmein1', 'letmein123',
      'monkey123', 'dragon123',
      
      // Date patterns
      '01011990', '01011980', '01011970',
      
      // Simple variations
      'passw0rd', 'p@ssword', 'p@ssw0rd',
      '!password', '@password', '#password',
      'password!', 'password@', 'password#',
      
      // Other common
      'iloveyou', 'sunshine', 'princess', 'football',
      'master123', 'welcome@123', 'admin@123'
    ];
    
    const lowerValue = value.toLowerCase();
    const valueWithoutSpecial = value.replace(/[^a-z0-9]/gi, '').toLowerCase();
    
    // Check exact match
    if (commonPasswords.includes(lowerValue)) {
      return "This password is too common and easily guessable";
    }
    
    // Check if it's a common password with special characters added
    if (commonPasswords.includes(valueWithoutSpecial)) {
      return "This password is too common (just adding symbols doesn't make it secure)";
    }
    
    // Check if starts/ends with common password
    for (const common of commonPasswords) {
      if (lowerValue.startsWith(common) || lowerValue.endsWith(common)) {
        return "Password is based on a common pattern";
      }
    }
  }
  
  // ============================================
  // PHASE 5: CONTEXTUAL SECURITY CHECKS
  // ============================================
  
  // Check for date patterns (years, dates)
  const currentYear = new Date().getFullYear();
  const recentYears = Array.from(
    { length: 10 }, 
    (_, i) => currentYear - i
  );
  
  for (const year of recentYears) {
    if (value.includes(String(year))) {
      return `Password should not contain recent years (found ${year})`;
    }
  }
  
  // Check for simple date patterns
  const datePatterns = [
    /\d{2}\/\d{2}\/\d{2,4}/, // MM/DD/YYYY or similar
    /\d{2}-\d{2}-\d{2,4}/,   // MM-DD-YYYY or similar
    /\d{8}/                   // DDMMYYYY or YYYYMMDD
  ];
  
  for (const pattern of datePatterns) {
    if (pattern.test(value)) {
      return "Password should not contain date patterns";
    }
  }
  
  // ============================================
  // PHASE 6: CHARACTER DIVERSITY CHECK
  // ============================================
  
  // Check character diversity (ensure not using same character type too much)
  const charCounts = {
    uppercase: (value.match(/[A-Z]/g) || []).length,
    lowercase: (value.match(/[a-z]/g) || []).length,
    numbers: (value.match(/\d/g) || []).length,
    special: (value.match(/[^a-zA-Z0-9]/g) || []).length
  };
  
  const totalChars = value.length;
  const uniqueChars = new Set(value).size;
  
  // Check if password has enough character diversity
  if (uniqueChars < Math.min(6, totalChars * 0.5)) {
    return "Password lacks character diversity (too many repeated characters)";
  }
  
  // Warn if password is mostly one type
  const maxSingleTypePercentage = 0.8;
  for (const [type, count] of Object.entries(charCounts)) {
    if (count / totalChars > maxSingleTypePercentage) {
      const typeNames = {
        uppercase: 'uppercase letters',
        lowercase: 'lowercase letters',
        numbers: 'numbers',
        special: 'special characters'
      };
      return `Password is mostly ${typeNames[type]} - use a better mix of character types`;
    }
  }
  
  // ============================================
  // PHASE 7: DICTIONARY WORD DETECTION
  // ============================================
  
  // Check for simple dictionary words (expanded list)
  const commonWords = [
    'love', 'hate', 'happy', 'summer', 'winter', 'spring', 'autumn',
    'hello', 'world', 'computer', 'internet', 'mobile', 'phone',
    'secret', 'private', 'secure', 'safe', 'strong', 'weak',
    'account', 'login', 'user', 'person', 'people', 'family',
    'friend', 'mother', 'father', 'sister', 'brother',
    'company', 'business', 'work', 'office', 'home'
  ];
  
  const lowerValue = value.toLowerCase();
  for (const word of commonWords) {
    if (lowerValue.includes(word) && word.length >= 4) {
      return `Password contains a common word ("${word}") - use random characters instead`;
    }
  }
  
  // ============================================
  // PHASE 8: STRENGTH CALCULATION
  // ============================================
  
  // Calculate password strength score (0-100)
  let strengthScore = 0;
  
  // Length bonus
  strengthScore += Math.min(value.length * 2, 30);
  
  // Character type bonuses
  if (validationResults.hasUpperCase) strengthScore += 15;
  if (validationResults.hasLowerCase) strengthScore += 15;
  if (validationResults.hasNumber) strengthScore += 15;
  if (validationResults.hasSpecialChar) strengthScore += 15;
  
  // Diversity bonus
  strengthScore += Math.min(uniqueChars * 2, 10);
  
  // Minimum strength threshold
  if (strengthScore < 60) {
    return "Password is too weak - consider using a longer password with more variety";
  }
  
  // ============================================
  // ALL CHECKS PASSED
  // ============================================
  
  return "";
};

/**
 * Get password strength level and feedback
 * @param {string} password - Password to evaluate
 * @returns {Object} - { strength: 'weak'|'medium'|'strong'|'very-strong', score: number, feedback: string }
 */
export const getPasswordStrength = (password) => {
  if (!password) {
    return { strength: 'none', score: 0, feedback: 'Enter a password' };
  }
  
  let score = 0;
  const feedback = [];
  
  // Length scoring
  if (password.length >= 8) score += 20;
  if (password.length >= 12) score += 15;
  if (password.length >= 16) score += 10;
  if (password.length >= 20) score += 5;
  
  // Character variety
  if (/[a-z]/.test(password)) score += 15;
  if (/[A-Z]/.test(password)) score += 15;
  if (/\d/.test(password)) score += 15;
  if (/[^a-zA-Z0-9]/.test(password)) score += 15;
  
  // Bonus for good diversity
  const uniqueChars = new Set(password).size;
  score += Math.min(uniqueChars, 15);
  
  // Determine strength level
  let strength;
  if (score < 30) {
    strength = 'weak';
    feedback.push('Very weak - add more characters and variety');
  } else if (score < 50) {
    strength = 'medium';
    feedback.push('Medium strength - consider adding more character types');
  } else if (score < 75) {
    strength = 'strong';
    feedback.push('Strong password');
  } else {
    strength = 'very-strong';
    feedback.push('Excellent password strength');
  }
  
  return { strength, score: Math.min(score, 100), feedback: feedback.join(', ') };
};

/**
 * Validates login form data
 * @param {Object} formData - { email: string, password: string }
 * @returns {Object} - Object with field names as keys and error messages as values (only fields with errors)
 */
export const validateLoginForm = (formData) => {
  const newErrors = {};
  
  newErrors.email = validateEmail(formData.email);
  newErrors.password = validatePassword(formData.password);
  
  const filteredErrors = Object.fromEntries(
    Object.entries(newErrors).filter(([_, value]) => value !== "")
  );
  
  return filteredErrors;
};

/**
 * Validates registration form with password confirmation
 * @param {Object} formData - { email: string, password: string, confirmPassword: string }
 * @returns {Object} - Object with field names as keys and error messages as values (only fields with errors)
 */
export const validateRegistrationForm = (formData) => {
  const newErrors = {};
  
  newErrors.email = validateEmail(formData.email);
  newErrors.password = validatePassword(formData.password);
  
  // Validate password confirmation
  if (!formData.confirmPassword) {
    newErrors.confirmPassword = "Please confirm your password";
  } else if (formData.password && formData.password !== formData.confirmPassword) {
    newErrors.confirmPassword = "Passwords do not match";
  } else {
    newErrors.confirmPassword = "";
  }
  
  const filteredErrors = Object.fromEntries(
    Object.entries(newErrors).filter(([_, value]) => value !== "")
  );
  
  return filteredErrors;
};

// ============================================
// USAGE EXAMPLES
// ============================================

const testPasswords = [
  "weak",              // Too short, missing requirements
  "password123",       // Common password
  "Password1",         // Too short
  "Password1!",        // Good but minimal
  "P@ssw0rd123",       // Common with substitutions
  "MyP@ssw0rd!",       // Good
  "Tr0ub4dor&3",       // Strong
  "correct horse battery staple", // Long but no special chars
  "C0rr3ct!H0rs3",     // Very strong
];

console.log("\n=== Password Validation Tests ===\n");
testPasswords.forEach(password => {
  const error = validatePassword(password);
  const strength = getPasswordStrength(password);
  
  console.log(`Password: "${password}"`);
  console.log(`Status: ${error || "✓ VALID"}`);
  console.log(`Strength: ${strength.strength.toUpperCase()} (${strength.score}/100)`);
  console.log(`Feedback: ${strength.feedback}`);
  console.log("---");
});