FROM node:0.10-onbuild

RUN apt-get update
RUN apt-get install -y mongoDB
RUN npm install -g gulp
RUN mkdir /var/work
RUN mkdir /var/work/restAPI-express-mongoose

ENTRYPOINT ["gulp"]

WORKDIR /var/work/restAPI-express-mongoose