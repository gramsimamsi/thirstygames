#!/usr/bin/env bash

sudo docker stop $(sudo docker ps -aq) &&
sudo docker container prune &&
sudo docker image prune -a