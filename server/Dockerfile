# Build Stage
FROM node:22-slim
# Setting up the work directory. 
# It is the folder where our application will be placed in container, not in github repository
WORKDIR /server
# Copy package.json and package-lock.json to the working directory
COPY package*.json /server
# Install dependencies
RUN npm install
# Copies the entire application code to the working directory.
COPY . /server
# Specifies the port of server, which the container will be listening.
EXPOSE 8080
# Specifies the command to run when the container starts (node server.js).
CMD ["node","server.js"]