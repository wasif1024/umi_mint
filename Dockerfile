# FROM node:10-alpine
# RUN mkdir -p /usr/src/app
# WORKDIR /usr/src/app
# ARG NODE_ENV=production
# ENV NODE_ENV=${NODE_ENV}
# COPY ./package*.json ./
# COPY ./node_modules ./node_modules
# COPY ./dist ./dist
# CMD ["node", "./dist/app.js"]

FROM node:14-alpine
RUN apk add --no-cache git
RUN git --version
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
COPY ./package*.json ./
RUN npm update
RUN npm i -g node-pre-gyp --fallback-to-build --update-binary
RUN npm install --unsafe-perm --allow-root

COPY ./dist ./dist
CMD ["node", "./dist/app.js"]