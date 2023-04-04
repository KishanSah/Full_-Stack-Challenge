 #Specify the base image
FROM node:alpine

# Set the working directory
WORKDIR /index

# Copy package.json and package-lock.json
COPY package*.json /index

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY  . .

# Expose port 4000
EXPOSE 4000

# Start the application
CMD ["npm", "start"]
