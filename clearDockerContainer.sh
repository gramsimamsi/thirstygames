#!/usr/bin/env bash

sudo docker stop thirstygames_wt_backend  &&
sudo docker stop thirstygames_wt_frontend  &&
sudo docker stop thirstygames_wt_database  &&
sudo docker container prune &&
sudo docker image prune -a
sudo rm -r data