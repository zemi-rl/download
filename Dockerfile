FROM node:18-alpine

# Install OpenSSL
RUN apk add --no-cache openssl bash

WORKDIR /app

# Copy files
COPY start.sh .
COPY server.js .
COPY package.json .
COPY main.exe .

# Install dependencies
RUN npm install

# Make start.sh executable
RUN chmod +x start.sh

# Expose port
EXPOSE 443

CMD ["./start.sh"]
