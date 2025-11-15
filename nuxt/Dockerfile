FROM node:alpine as build

ENV APP_ROOT /web

WORKDIR ${APP_ROOT}
ADD . ${APP_ROOT}

RUN npm install

RUN npm run build
CMD node .output/server/index.mjs