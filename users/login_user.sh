#!/bin/bash

USER_DIR="users"
ADMIN_FILE="$USER_DIR/admin_users.json"
REGULAR_FILE="$USER_DIR/regular_users.json"

echo "Login"
read -p "Enter username: " username
read -s -p "Enter password: " password
echo

# Hash the entered password
password_hash=$(echo -n "$password" | sha256sum | awk '{print $1}')

# Function to check user in a given file
check_user() {
  local file=$1
  jq --arg u "$username" --arg p "$password_hash" '.[] | select(.username == $u and .password_hash == $p)' "$file"
}

# First check admin users
if check_user "$ADMIN_FILE" | grep -q .; then
  echo "Welcome Admin, $username!"
  exit 0
fi

# Then check regular users
if check_user "$REGULAR_FILE" | grep -q .; then
  echo "Welcome User, $username!"
  exit 0
fi

echo "Login failed: invalid username or password."
exit 1