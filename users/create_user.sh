#!/bin/bash

echo "=== SICOS User Creation Script ==="

# Prompt for username
read -p "Enter new username: " username

# Check if username is empty
if [ -z "$username" ]; then
    echo "Username cannot be empty. Exiting."
    exit 1
fi

# Check if user already exists
if id "$username" &>/dev/null; then
    echo "User '$username' already exists. Exiting."
    exit 1
fi

# Prompt for password (input hidden)
read -s -p "Enter password for $username: " password
echo
read -s -p "Confirm password: " password_confirm
echo

# Check if passwords match
if [ "$password" != "$password_confirm" ]; then
    echo "Passwords do not match. Exiting."
    exit 1
fi

# Create the user with a home directory
sudo useradd -m "$username"

# Set the password for the user
echo "$username:$password" | sudo chpasswd

echo "User '$username' created successfully!"
