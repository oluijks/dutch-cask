# SSL

## Letsencrypt

Your certificate and chain have been saved at:

`/etc/letsencrypt/live/dutch-cask.nl/fullchain.pem`

Your key file has been saved at:

`/etc/letsencrypt/live/dutch-cask.nl/privkey.pem`

Your cert will expire on 2018-07-06.

To obtain a new or tweaked version of this certificate in the future, simply run certbot again.

To non-interactively renew _all_ of your certificates, run "certbot renew"

https://gist.github.com/cecilemuller/a26737699a7e70a7093d4dc115915de8

### Letsencrypt wildcart

Your certificate and chain have been saved at:

`/etc/letsencrypt/live/bristol3.pki.enigmabridge.com.dutch-cask.nl/fullchain.pem`

Your key file has been saved at:

`/etc/letsencrypt/live/bristol3.pki.enigmabridge.com.dutch-cask.nl/privkey.pem`

Your cert will expire on 2018-07-10.

To obtain a new or tweaked version of this certificate in the future, simply run certbot again.
To non-interactively renew _all_ of your certificates, run "certbot renew"

# Docker

## Useful Docker Commands

### Docker Localhost

* `clear && docker images && docker container ls --all && docker volume ls`
* `docker volume rm $(docker volume ls -qf dangling=true)`
* `npm run docker:up-build`
* `docker exec -t -i dutch-cask-api /bin/sh`
* `docker volume create --name=dc_dev`
* `docker volume inspect dc_dev`

### Docker Machine

* `docker-machine start` - Start VM
* `docker-machine stop` - Stop VM
* `docker-machine env` - Display Docker client setup commands

### Docker Client

* `docker <command> --help` - Get help on a specific command
* `docker pull <Name of Image>` - Pull image from Docker Hub
* `docker images` - Show all images
* `docker rmi <ImageID>` - Remove specific images
* `docker rmi $(docker images | grep "^<none>" | awk "{print $3}")` - Remove untagged images - <none>
* `docker ps -a` - Show all containers
* `docker rm <ContainerID>` -Remove specific container
* `docker rm $(docker ps -a -q)` Remove all containers
* `docker ps --format 'table {{.Names}}\t{{.Image}}\t{{.Status}}'` - Formatted list of containers
* `docker run -d --name <Container Name> -p <External Port>:<Container Port> <Your Image>` - Run a container
* `docker build -f <Your Dockerfile> -t <Tag Name> .` - Build an image from a Dockerfile
* `docker login` - Login using your Docker credentials
* `docker push <Your Image Name>` - Push an image to Docker hub

### Docker Compose

* `docker-compose build` - Build images based on docker-compose
* `docker-compose up -d` - Start in daemon mode
* `docker-compose logs` - Show logs from containers
* `docker-compose up` - Start containers based on docker-compose
* `docker-compose stop` - Stop containers
* `docker-compose down` - Stop and remove containers

###

```
Client ID:      366120639885-485969vjap38bo3nb2nf6e3jshbu9uj5.apps.googleusercontent.com
Client Secret:  YTWTtacZ98QLex8Zfq7KjZaA
```
