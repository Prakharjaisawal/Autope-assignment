# Base image
FROM node:18

# Create app directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy your backend code
COPY . .

# Expose the backend port (change if your backend uses another port)
EXPOSE 5000

# Start the app
CMD ["npm", "run", "dev"]
