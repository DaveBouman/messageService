FROM node:14-alpine as build

WORKDIR /src/

COPY tsconfig.json ./tsconfig.json
COPY package.json ./package-lock.json /src/

RUN  npm ci --silent

COPY . .

USER node
CMD npm run dev