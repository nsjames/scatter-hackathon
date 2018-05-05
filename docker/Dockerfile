FROM nginx:alpine

RUN cd /project && git clone https://github.com/nsjames/scatter-hackathon.git
WORKDIR /project/scatter-hackathon
COPY docker/default.conf /etc/nginx/conf.d/default.conf
COPY . /usr/share/nginx/html/index.html