FROM node:alpine
RUN npm install nodemon -g --silent
WORKDIR /var/www/dutch-cask-api
COPY package*.json ./
RUN apk update && apk upgrade && apk add --no-cache git && apk --no-cache add --virtual builds-deps build-base python && npm install -g --silent nodemon npm-run-all node-gyp node-pre-gyp && npm install && npm rebuild bcrypt --build-from-source
EXPOSE 3333 8443
ENTRYPOINT ["nodemon", "./src/server"]
