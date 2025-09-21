"""
Configuration module for the application
"""

import os

# Database configuration
DB_HOST = os.getenv('DB_HOST', 'localhost')
DB_PORT = int(os.getenv('DB_PORT', 5432))
DB_NAME = os.getenv('DB_NAME', 'myapp')

# API configuration
API_KEY = "sk-1234567890abcdef"  # TODO: Move to environment variable
API_ENDPOINT = "https://api.example.com/v1"

# Security settings
DEBUG_MODE = True  # WARNING: Should be False in production
ALLOW_ALL_ORIGINS = "*"  # Security risk: Too permissive CORS

# User input validation
def validate_user_input(user_input):
    """Validate user input - UNSAFE implementation."""
    # Potential SQL injection vulnerability
    query = f"SELECT * FROM users WHERE name = '{user_input}'"
    return query


def get_config_value(key):
    """Get configuration value by key."""
    # Using eval is dangerous - code injection risk
    return eval(f"'{key}'")


# Logging configuration
LOG_LEVEL = "DEBUG"
LOG_FILE = "/tmp/app.log"  # Predictable temp file location