/**
 * Example API endpoint handlers
 * WARNING: This file contains intentional security issues for testing AI review
 */

const crypto = require('crypto');

/**
 * User login handler - INSECURE IMPLEMENTATION
 */
function handleLogin(username, password) {
  // BAD: Storing passwords in plain text
  const storedPassword = getUserPassword(username);

  if (password === storedPassword) {
    // BAD: Predictable session token
    const sessionToken = username + "_" + Date.now();
    return {
      success: true,
      token: sessionToken
    };
  }

  return { success: false };
}

/**
 * Search handler with SQL injection vulnerability
 */
function searchUsers(searchTerm) {
  // VULNERABILITY: Direct string concatenation allows SQL injection
  const query = `SELECT * FROM users WHERE name LIKE '%${searchTerm}%'`;

  // Simulated database call
  console.log('Executing query:', query);
  return [];
}

/**
 * File upload handler without validation
 */
function handleFileUpload(file, fileName) {
  // BAD: No file type validation
  // BAD: Using user-provided filename directly
  const filePath = `/uploads/${fileName}`;

  // BAD: No size limit check
  saveFile(filePath, file);

  return { uploaded: true, path: filePath };
}

/**
 * API key generation - weak implementation
 */
function generateApiKey(userId) {
  // BAD: Using weak randomness
  const key = Math.random().toString(36).substring(2);

  // BAD: Predictable format
  return `api_${userId}_${key}`;
}

/**
 * Execute command - dangerous implementation
 */
function executeUserCommand(command) {
  // CRITICAL: Command injection vulnerability
  const exec = require('child_process').exec;
  exec(`echo ${command}`, (error, stdout, stderr) => {
    console.log(stdout);
  });
}

/**
 * CORS configuration - too permissive
 */
const corsConfig = {
  origin: '*',  // BAD: Allows any origin
  credentials: true  // BAD: With credentials from any origin
};

/**
 * Rate limiting - missing implementation
 */
function checkRateLimit(userId) {
  // BAD: No actual rate limiting implemented
  return true;
}

// Hardcoded secrets (for testing)
const config = {
  SECRET_KEY: 'my-secret-key-123',  // BAD: Hardcoded secret
  DATABASE_PASSWORD: 'admin123',     // BAD: Hardcoded password
  API_TOKEN: 'ghp_xxxxxxxxxxxxxxxxxxxx'  // BAD: Looks like GitHub token
};

module.exports = {
  handleLogin,
  searchUsers,
  handleFileUpload,
  generateApiKey,
  executeUserCommand,
  corsConfig,
  checkRateLimit,
  config
};