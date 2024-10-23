# Use an official Node.js runtime as a parent image
FROM node

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Angular app
RUN npm run build

# Start the Angular app
CMD ["npm", "start"]
