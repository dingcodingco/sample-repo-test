/**
 * Input validation utilities
 * Provides common validation functions for user inputs
 */

/**
 * Validate email address format
 * @param {string} email - Email address to validate
 * @returns {boolean} True if valid email format
 */
const isValidEmail = (email) => {
  // Basic email regex - could be improved
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone number (US format)
 * @param {string} phone - Phone number to validate
 * @returns {boolean} True if valid US phone format
 */
const isValidPhone = (phone) => {
  // Accepts formats: 123-456-7890, (123) 456-7890, 123 456 7890, 1234567890
  const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$/;
  return phoneRegex.test(phone);
};

/**
 * Validate URL format
 * @param {string} url - URL to validate
 * @returns {boolean} True if valid URL
 */
const isValidURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch (err) {
    return false;
  }
};

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {object} Validation result with strength score and issues
 */
const validatePassword = (password) => {
  const issues = [];
  let strength = 0;

  // Check length
  if (password.length < 8) {
    issues.push('Password must be at least 8 characters');
  } else {
    strength++;
  }

  // Check for uppercase
  if (!/[A-Z]/.test(password)) {
    issues.push('Password must contain uppercase letter');
  } else {
    strength++;
  }

  // Check for lowercase
  if (!/[a-z]/.test(password)) {
    issues.push('Password must contain lowercase letter');
  } else {
    strength++;
  }

  // Check for numbers
  if (!/\d/.test(password)) {
    issues.push('Password must contain number');
  } else {
    strength++;
  }

  // Check for special characters
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    issues.push('Password must contain special character');
  } else {
    strength++;
  }

  return {
    valid: issues.length === 0,
    strength: strength,
    maxStrength: 5,
    issues: issues
  };
};

/**
 * Sanitize user input to prevent XSS
 * WARNING: This is a basic implementation
 * @param {string} input - User input to sanitize
 * @returns {string} Sanitized input
 */
const sanitizeInput = (input) => {
  // Basic HTML escaping - not sufficient for all XSS prevention
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

module.exports = {
  isValidEmail,
  isValidPhone,
  isValidURL,
  validatePassword,
  sanitizeInput
};

// Example usage
if (require.main === module) {
  console.log('Validation Examples:');
  console.log('Email valid:', isValidEmail('test@example.com'));
  console.log('Phone valid:', isValidPhone('123-456-7890'));
  console.log('URL valid:', isValidURL('https://example.com'));

  const passwordResult = validatePassword('Test123!');
  console.log('Password validation:', passwordResult);

  const dangerous = '<script>alert("XSS")</script>';
  console.log('Sanitized:', sanitizeInput(dangerous));
}