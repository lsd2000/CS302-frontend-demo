#docker build -t shaodong2000/frontend:1.0 ./
#docker run -p 3000:3000 shaodong2000/frontend:1.0

FROM node:lts-alpine
# install simple http server for serving static content
RUN npm install -g http-server
# make the 'app' folder the current working directory
WORKDIR /usr
# copy 'package.json' to install dependencies
COPY package*.json ./
# install dependencies
RUN npm install
# copy files and folders to the current working directory (i.e. 'app' folder)
COPY . .
# build app for production with minification
RUN npm run build
EXPOSE 5003
CMD [ "npm", "run", "serve" ]