FROM node:carbon


WORKDIR /www
RUN git clone https://github.com/example/example.git


RUN npm install