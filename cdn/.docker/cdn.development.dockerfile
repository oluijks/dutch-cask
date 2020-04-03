FROM node:alpine
RUN npm install nodemon -g --silent
WORKDIR /var/www/dutch-cask-cdn
EXPOSE 3000
ENTRYPOINT ["nodemon", "./bin/www"]
