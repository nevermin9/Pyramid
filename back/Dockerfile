FROM node:15

WORKDIR /server

COPY ./app/package.json .

RUN npm install

COPY ./app /server

EXPOSE 3000

CMD ["node", "/server/server.js"]
