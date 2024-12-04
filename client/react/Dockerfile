# Fetching the latest node image on alpine linux
FROM node:latest
# Setting up the work directory. 
# It is the folder where our application will be placed in container, not in github repository
WORKDIR /react
# Installing dependencies
COPY package*.json /react
RUN npm install
RUN npm run build
# Copying all the files in react folder
COPY . /react
# Specifies the port of client, which the container will be listening
EXPOSE 5173
# Starting our application
CMD ["npm","run","dev"]