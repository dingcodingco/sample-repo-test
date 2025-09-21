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

    # Simple statistics
    numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    avg = sum(numbers) / len(numbers)
    print(f"\nAverage of {numbers}: {avg}")


if __name__ == "__main__":
    main()