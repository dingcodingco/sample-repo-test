/**
 * Sample JavaScript utility functions
 * Created using GitHub CLI
 */

// String utilities
const capitalize = (str) => {
  if (!str) return '';
  if (typeof str !== 'string') {
    throw new TypeError('Input must be a string');
  }
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const reverseString = (str) => {
  if (typeof str !== 'string') {
    throw new TypeError('Input must be a string');
  }
  return str.split('').reverse().join('');
};

// Array utilities
const removeDuplicates = (arr) => {
  if (!Array.isArray(arr)) {
    throw new TypeError('Input must be an array');
  }
  return [...new Set(arr)];
};

const shuffle = (arr) => {
  if (!Array.isArray(arr)) {
    throw new TypeError('Input must be an array');
  }
  const newArr = [...arr];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

// Math utilities
const isPrime = (num) => {
  if (typeof num !== 'number' || !Number.isInteger(num)) {
    throw new TypeError('Input must be an integer');
  }
  if (num <= 1) return false;
  if (num <= 3) return true;
  if (num % 2 === 0 || num % 3 === 0) return false;

  for (let i = 5; i * i <= num; i += 6) {
    if (num % i === 0 || num % (i + 2) === 0) return false;
  }
  return true;
};

const factorial = (n) => {
  if (typeof n !== 'number' || !Number.isInteger(n)) {
    throw new TypeError('Input must be an integer');
  }
  if (n < 0) {
    throw new RangeError('Input must be non-negative');
  }
  if (n > 170) {
    throw new RangeError('Input too large - will cause overflow');
  }
  if (n === 0 || n === 1) return 1;
  return n * factorial(n - 1);
};

// Date utilities
const formatDate = (date = new Date()) => {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    throw new TypeError('Input must be a valid Date object');
  }
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Export all utilities
module.exports = {
  capitalize,
  reverseString,
  removeDuplicates,
  shuffle,
  isPrime,
  factorial,
  formatDate
};

// Example usage
if (require.main === module) {
  console.log('='.repeat(50));
  console.log('JavaScript Utility Functions Demo');
  console.log('='.repeat(50));

  console.log('\nString utilities:');
  console.log('capitalize("hello world"):', capitalize('hello world'));
  console.log('reverseString("GitHub"):', reverseString('GitHub'));

  console.log('\nArray utilities:');
  console.log('removeDuplicates([1, 2, 2, 3, 3, 4]):', removeDuplicates([1, 2, 2, 3, 3, 4]));
  console.log('shuffle([1, 2, 3, 4, 5]):', shuffle([1, 2, 3, 4, 5]));

  console.log('\nMath utilities:');
  console.log('isPrime(17):', isPrime(17));
  console.log('factorial(5):', factorial(5));

  console.log('\nDate utilities:');
  console.log('formatDate():', formatDate());
}