# Use an official Node runtime as a parent image
FROM node:20-alpine3.18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json /app

# Install app dependencies
RUN npm install
# RUN npm uninstall bcrypt
RUN npm install bcrypt

# Copy the rest of the application code to the working directory
COPY . .

# Expose port 4010
EXPOSE 3010

# Define the command to start your Node.js API
CMD ["npm", "start"]

