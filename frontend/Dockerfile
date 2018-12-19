# Buildstage for the nginx angular container
FROM node:10.14.2-alpine as node

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run-script build

# build the angular frontend on an nginx
FROM nginx:1.15.7-alpine

COPY --from=node /usr/src/app/dist /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 4200

CMD [ "nginx", "-g", "daemon off;" ]

