FROM scratch

ADD alpine-minirootfs-3.21.3-aarch64.tar /

ARG BASE_VERSION
ENV APP_VERSION=test.${BASE_VERSION:-v3}

WORKDIR /usr/app

RUN apk add --no-cache nodejs npm

COPY ./package.json ./

RUN npm install

COPY ./index.js ./

EXPOSE 8080

HEALTHCHECK --interval=10s --timeout=1s \
  CMD curl -f http://localhost:8080/ || exit 1

CMD ["npm", "start"]