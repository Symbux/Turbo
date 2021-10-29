# https://nodejs.org/en/docs/guides/nodejs-docker-webapp/

FROM node:16
WORKDIR /usr/src/app
COPY package.json .
COPY yarn.lock .
RUN yarn
COPY . .
EXPOSE 3000
CMD ["yarn", "start"]
