/**
 * User Authentication Module
 * Test file with security issues for AI review
 */

// BAD: Weak password hashing
const crypto = require('crypto');

function hashPassword(password) {
  // BAD: MD5 is cryptographically broken
  return crypto.createHash('md5').update(password).digest('hex');
}

function verifyPassword(input, stored) {
  // BAD: Timing attack vulnerability
  return hashPassword(input) === stored;
}

function generateSession(userId) {
  // BAD: Predictable session token
  return userId + '_' + Date.now();
}

function checkAuth(req) {
  // BAD: No CSRF protection
  const token = req.headers.authorization;

  // BAD: Token stored in localStorage (XSS vulnerable)
  if (!token) {
    return false;
  }

  // BAD: No token expiry
  return token.startsWith('Bearer ');
}

// BAD: Hardcoded admin credentials
const ADMIN_USER = 'admin';
const ADMIN_PASS = 'admin123';

module.exports = {
  hashPassword,
  verifyPassword,
  generateSession,
  checkAuth,
  ADMIN_USER,
  ADMIN_PASS
};