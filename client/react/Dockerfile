# Build Stage
FROM node:alpine
# Setting up the work directory. 
# It is the folder where our application will be placed in container, not in github repository
WORKDIR /react
# Installing dependencies
RUN rm -rf node_modules package-lock.json 
COPY package.json /react
#RUN rm -rf node_modules package-lock.json
#RUN npm install -g @rollup/rollup-linux-x64-glibs
RUN npm i
#RUN npm install -g vite
#RUN npm install -g @vitejs/plugin-react
#RUN npm install axios
#RUN npm i
# Copying all the files in react folder
COPY . /react
RUN npm run build
# Specifies the port of client, which the container will be listening
EXPOSE 5173
# Starting our application

CMD ["npm","run","dev"]