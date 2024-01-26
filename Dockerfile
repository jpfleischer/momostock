# Use an official Node runtime as the base image
FROM node:lts-alpine

# Set the working directory in the container to /app
WORKDIR /app

# Install the application dependencies
COPY package*.json ./
# RUN npm install

# Install global dependencies
RUN npm i -g concurrently
RUN npm i -g @vue/cli
RUN npm i -g nodemon

RUN npm install --include dev
# Expose port 8080 for the Vue.js server
EXPOSE 8080 3000

# Command to start the Vue.js server
CMD ["npm", "run", "serve"]