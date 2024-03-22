# Use an official Node runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install project dependencies
RUN npm install

# Bundle app source inside the Docker image
COPY . .

# Expose port 3000 to the outside once the container has launched
EXPOSE 3000

# Run the app using npm start (which runs react-scripts start)
CMD ["npm", "start"]
