# Use an official Node runtime as the base image
FROM node:lts-alpine

# Set the working directory in the container to /app
WORKDIR /app

# Install the application dependencies
COPY package*.json ./
RUN npm install
RUN npm install --only=dev
# Expose port 8080 for the Vue.js server
EXPOSE 8080 3000

# Command to start the Vue.js server
CMD ["npm", "run", "serve"]