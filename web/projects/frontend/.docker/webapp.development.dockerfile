FROM nginx:alpine
COPY ./.docker/ssl.conf /etc/nginx/snippets/ssl.conf
COPY ./.docker/nginx.conf /etc/nginx/nginx.conf
EXPOSE 4200 4443
ENTRYPOINT ["nginx", "-g", "daemon off;"]
