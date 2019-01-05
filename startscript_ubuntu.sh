#!/usr/bin/env bash

sudo apt install docker-ce=3:18.09.0~ce-3~ubuntu
# shows newest docker version
# apt-cache madison docker-ce
sudo service docker start
sudo docker-compose up
