FROM node:15

WORKDIR /client

COPY ./app/package.json ./app/package-lock.json ./

RUN npm install

COPY ./app /client

EXPOSE 8000

CMD npm run serve