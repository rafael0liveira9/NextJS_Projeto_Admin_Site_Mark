FROM node:18-alpine

RUN apk --no-cache add build-base
RUN apk add python3

WORKDIR app
COPY . .

COPY package.json .

RUN npm install
EXPOSE 80
CMD npm run build && npm run start
