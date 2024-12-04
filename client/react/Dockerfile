# Fetching the latest node image on alpine linux
FROM node:22-slim
# Setting up the work directory. 
# It is the folder where our application will be placed in container, not in github repository
WORKDIR /react
# Installing dependencies
COPY package.json /react
RUN npm install
RUN npm install -g vite
RUN npm install -g @vitejs/plugin-react
RUN npm install axios
# Copying all the files in react folder
COPY . /react
RUN npm run build
# Specifies the port of client, which the container will be listening
EXPOSE 5173
# Starting our application
CMD ["npm","run","dev"]