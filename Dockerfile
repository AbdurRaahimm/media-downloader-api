# Base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy files
COPY package*.json ./
RUN pnpm install

# Copy remaining app files
COPY . .

# Expose port
EXPOSE 3000

# Start server
CMD ["node", "server.js"]
