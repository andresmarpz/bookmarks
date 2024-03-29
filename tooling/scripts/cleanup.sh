#!/bin/bash

# If you have weird errors on the repository, run this script first.
# If you can't execute as sudo, either "chmod +x cleanup.sh" or run the commands manually.

# Delete .next and node_modules directories
rm -rf .next
rm -rf node_modules

# Clear pnpm cache           
pnpm store prune

# Install dependencies again
pnpm install
