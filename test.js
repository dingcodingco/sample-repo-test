/**
 * Simple test runner for our utility functions
 */

const utils = require('./src/utils');
const validators = require('./src/validators');

// Test counter
let passed = 0;
let failed = 0;

// Simple assertion helper
function assert(condition, message) {
  if (condition) {
    console.log('✅', message);
    passed++;
  } else {
    console.log('❌', message);
    failed++;
  }
}

// Test utils.js functions
console.log('\n📝 Testing utils.js functions\n');

assert(utils.capitalize('hello') === 'Hello', 'capitalize: should capitalize first letter');
assert(utils.reverseString('abc') === 'cba', 'reverseString: should reverse string');
assert(JSON.stringify(utils.removeDuplicates([1, 2, 2, 3])) === '[1,2,3]', 'removeDuplicates: should remove duplicates');
assert(utils.isPrime(7) === true, 'isPrime: 7 should be prime');
assert(utils.isPrime(4) === false, 'isPrime: 4 should not be prime');
assert(utils.factorial(5) === 120, 'factorial: 5! should be 120');

// Test validators.js functions
console.log('\n📝 Testing validators.js functions\n');

assert(validators.isValidEmail('test@example.com') === true, 'isValidEmail: valid email should pass');
assert(validators.isValidEmail('invalid-email') === false, 'isValidEmail: invalid email should fail');
assert(validators.isValidPhone('123-456-7890') === true, 'isValidPhone: valid phone should pass');
assert(validators.isValidURL('https://example.com') === true, 'isValidURL: valid URL should pass');
assert(validators.isValidURL('not-a-url') === false, 'isValidURL: invalid URL should fail');

const passwordResult = validators.validatePassword('Test123!@#');
assert(passwordResult.valid === true, 'validatePassword: strong password should be valid');
assert(passwordResult.strength === 5, 'validatePassword: should calculate correct strength');

const weakPassword = validators.validatePassword('weak');
assert(weakPassword.valid === false, 'validatePassword: weak password should be invalid');

// Summary
console.log('\n📊 Test Results:');
console.log(`Passed: ${passed}`);
console.log(`Failed: ${failed}`);
console.log(`Total: ${passed + failed}`);

if (failed === 0) {
  console.log('\n🎉 All tests passed!');
  process.exit(0);
} else {
  console.log(`\n⚠️ ${failed} test(s) failed`);
  process.exit(1);
}