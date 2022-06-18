FROM ubuntu:18.04
ARG DEBIAN_FRONTEND=noninteractive
RUN apt-get -y update
RUN apt-get install ffmpeg libsm6 libxext6 -y
RUN apt-get -y install git python3 python3-pip 
ADD . /code
WORKDIR /code
RUN pip3 install --upgrade pip
RUN pip3 install -r api/requirements.txt
RUN ["chmod", "+x", "./script.sh"]
CMD ./script.sh
EXPOSE 5000
EXPOSE 8000