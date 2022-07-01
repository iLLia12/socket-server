FROM node:16-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --only=production

COPY . .

EXPOSE 6001

CMD [ "node", "index.js" ]
