FROM node:10.14.2-alpine

WORKDIR /usr/src/app

COPY package*.json ./

# get stuff for bcrypt on alpine
RUN apk update
RUN mkdir /app
WORKDIR /app
RUN apk --no-cache add --virtual builds-deps build-base python
RUN npm config set python /usr/bin/python
RUN npm i -g npm

RUN npm install

RUN npm rebuild bcrypt --build-from-source
RUN apk del builds-deps

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]