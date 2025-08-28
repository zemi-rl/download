#!/bin/bash
set -e

# Create cert directory
mkdir -p /app/certs

# Decode certs from environment variables
echo "$SERVER_KEY_B64" | base64 -d > /app/certs/server.key
echo "$SERVER_CRT_B64" | base64 -d > /app/certs/server.crt
echo "$CA_CRT_B64" | base64 -d > /app/certs/ca.crt

# Start the Node.js app
node server.js
