FROM node:19-alpine3.16 AS server-build
WORKDIR /usr/src/server
COPY package*.json ./
RUN npm install -g nodemon
RUN npm install
COPY . .
EXPOSE 8030
CMD [ "node", "server.js" ]
