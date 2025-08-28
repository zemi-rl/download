#!/bin/bash
set -e

echo "[INFO] Setting up certificates..."

# Create certs directory
mkdir -p /app/certs

# Decode certs from env variables
echo "$SERVER_KEY_B64" | base64 -d > /app/certs/server.key
echo "$SERVER_CRT_B64" | base64 -d > /app/certs/server.crt
echo "$CA_CRT_B64" | base64 -d > /app/certs/ca.crt

chmod 600 /app/certs/server.key /app/certs/server.crt /app/certs/ca.crt

echo "[INFO] Starting server..."
node server.js
