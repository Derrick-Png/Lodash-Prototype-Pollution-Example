FROM node:16

WORKDIR /usr/src/app

COPY . .

WORKDIR /usr/src/app/Client

RUN npm install

WORKDIR /usr/src/app/server

RUN npm install

WORKDIR /usr/src/app

EXPOSE 80
EXPOSE 6969
CMD ["npm", "run", "prod"]