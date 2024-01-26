# Use an official Node runtime as the base image
FROM node:lts-alpine

# Set the working directory in the container to /app
WORKDIR /app

# Copy package*.json into the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Install global dependencies
RUN npm i -g concurrently
RUN npm i -g @vue/cli-service
RUN npm i -g nodemon
RUN npm install express
RUN npm i -g @vue/cli-plugin-babel

# Copy the rest of the application into the working directory
COPY . .

# Expose port 8080 for the Vue.js server
EXPOSE 8080 3000

# Command to start the Vue.js server
CMD ["npm", "run", "serve"]