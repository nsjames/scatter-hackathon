FROM ubuntu:14.04
RUN apt-get update
RUN apt-get install -y nginx
RUN apt-get install -y git

WORKDIR /www
RUN git clone https://github.com/nsjames/scatter-hackathon.git
WORKDIR /scatter-hackathon
COPY docker/default.conf /etc/nginx/sites-available/default.conf

EXPOSE 80
CMD ["nginx"]