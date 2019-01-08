#!/usr/bin/env bash

sudo dnf -y install docker-ce-3:18.09.0-3.fc28
# shows newest version
# sudo dnf list docker-ce  --showduplicates | sort -r
sudo systemctl start docker
sudo docker-compose up
sudo npm install async
sudo node populatedb "mongodb://database/thirstyGames"