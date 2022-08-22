#########################################################################################
## docker will invoke this file from ../.. dir in order to access the code
#########################################################################################
FROM node:16.16-alpine3.15 AS builder

WORKDIR /build

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build
#####################################################################################
FROM nginxinc/nginx-unprivileged:1.23-alpine-perl

ARG BUILD_VERSION=0.1

LABEL org.opencontainers.image.version=$BUILD_VERSION \
      org.opencontainers.image.authors="airenass@gmail.com" \
      name="sage-gui" \
      maintainer="airenass@gmail.com" \
      vendor="airenass@gmail.com" \
      version=$BUILD_VERSION \
      release=$BUILD_VERSION \
      summary="This image is used to host the sage-gui service" \
      description="This image is used to host the sage-gui service" 

EXPOSE 8000

COPY --from=builder /build/dist /usr/share/nginx/html
COPY build/docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY build/docker/entrypoint.sh /docker-entrypoint.d/40_entrypoint.sh

USER root

# RUN chown nginx:nginx /root/entrypoint.sh
RUN chown nginx:nginx /usr/share/nginx/html/*

USER nginx
