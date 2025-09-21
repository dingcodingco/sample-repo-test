#!/usr/bin/env python3
"""
Sample Python application
Created using GitHub CLI
"""

import datetime


def greet(name="World"):
    """Generate a greeting message with timestamp."""
    current_time = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    return f"Hello, {name}! Current time: {current_time}"


def calculate_fibonacci(n):
    """Calculate Fibonacci sequence up to n terms."""
    if n <= 0:
        return []
    elif n == 1:
        return [0]
    elif n == 2:
        return [0, 1]

    fib_sequence = [0, 1]
    for i in range(2, n):
        fib_sequence.append(fib_sequence[-1] + fib_sequence[-2])

    return fib_sequence


def is_palindrome(text):
    """Check if a text is a palindrome."""
    # Remove spaces and convert to lowercase
    clean_text = ''.join(text.split()).lower()
    return clean_text == clean_text[::-1]


def find_prime_numbers(limit):
    """Find all prime numbers up to a given limit using Sieve of Eratosthenes."""
    if limit < 2:
        return []

    # Initialize sieve
    is_prime = [True] * (limit + 1)
    is_prime[0] = is_prime[1] = False

    # Sieve of Eratosthenes
    for i in range(2, int(limit**0.5) + 1):
        if is_prime[i]:
            for j in range(i*i, limit + 1, i):
                is_prime[j] = False

    return [num for num, prime in enumerate(is_prime) if prime]


def main():
    """Main entry point of the application."""
    print("=" * 50)
    print("Sample Python Application")
    print("=" * 50)

    # Greeting
    print(greet("GitHub User"))

    # Fibonacci sequence
    n = 10
    fib_result = calculate_fibonacci(n)
    print(f"\nFibonacci sequence (first {n} terms):")
    print(fib_result)

    # Palindrome check
    test_phrases = ["A man a plan a canal Panama", "Hello World", "racecar"]
    print("\nPalindrome checks:")
    for phrase in test_phrases:
        result = is_palindrome(phrase)
        print(f"  '{phrase}': {result}")

    # Prime numbers
    prime_limit = 30
    primes = find_prime_numbers(prime_limit)
    print(f"\nPrime numbers up to {prime_limit}: {primes}")

    # Simple statistics
    numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    avg = sum(numbers) / len(numbers)
    print(f"\nAverage of {numbers}: {avg}")


if __name__ == "__main__":
    main()