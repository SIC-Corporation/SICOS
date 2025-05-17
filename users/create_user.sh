#!/bin/bash

USER_DIR="users"
ADMIN_FILE="$USER_DIR/admin_users.json"
REGULAR_FILE="$USER_DIR/regular_users.json"

mkdir -p "$USER_DIR"

echo "Create a new user"
read -p "Enter username: " username

# Check for empty username
if [[ -z "$username" ]]; then
  echo "Username cannot be empty."
  exit 1
fi

# Read password silently and confirm
while true; do
  read -s -p "Enter password: " password
  echo
  read -s -p "Confirm password: " password_confirm
  echo
  [[ "$password" == "$password_confirm" ]] && break
  echo "Passwords do not match, try again."
done

# Hash password
password_hash=$(echo -n "$password" | sha256sum | awk '{print $1}')

# Choose user type
echo "Choose user type:"
select user_type in "admin" "regular"; do
  [[ "$user_type" == "admin" || "$user_type" == "regular" ]] && break
  echo "Invalid option, choose 1 or 2."
done

# Select proper file
if [[ "$user_type" == "admin" ]]; then
  FILE="$ADMIN_FILE"
else
  FILE="$REGULAR_FILE"
fi

# Initialize file if not exists
if [[ ! -f "$FILE" ]]; then
  echo "[]" > "$FILE"
fi

# Check if user exists
if jq --arg u "$username" '.[] | select(.username == $u)' "$FILE" | grep -q .; then
  echo "User '$username' already exists."
  exit 1
fi

# Add new user to JSON array
tmpfile=$(mktemp)
jq --arg u "$username" --arg p "$password_hash" '. += [{"username": $u, "password_hash": $p}]' "$FILE" > "$tmpfile" && mv "$tmpfile" "$FILE"

echo "User '$username' of type '$user_type' created successfully."