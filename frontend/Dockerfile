# Use an official Node.js runtime as a parent image
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container
COPY . .

# Install any needed dependencies
RUN npm install

# Make the app available on port 3000
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
