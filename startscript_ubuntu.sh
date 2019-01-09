#!/usr/bin/env bash

sudo apt install docker-ce=3:18.09.0~ce-3~ubuntu
# shows newest docker version
# apt-cache madison docker-ce
sudo service docker start
sudo curl -L "https://github.com/docker/compose/releases/download/1.23.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
sudo docker-compose up -d
sleep 2
sudo docker exec thirstygames_wt_database_1 bash -c "
        mongo thirstyGames --eval 'db.users.save({ \"user_name\" : \"admin\", \"user_password\" : \"\$2b\$10\$S0qzD5J2WE.POZGzNH2Kou8MU/jwjhu0tRMM8rLebcuK1Gn5YRaVy\", \"user_role\" : 0 })' &&
        mongo thirstyGames --eval 'db.beverages.save({ \"beverage_name\" : \"Bier\", \"beverage_alc\" : 5.0 })' &&
        mongo thirstyGames --eval 'db.beverages.save({ \"beverage_name\" : \"Schnaps\", \"beverage_alc\" : 40.0 })' &&
        mongo thirstyGames --eval 'db.beverages.save({ \"beverage_name\" : \"Pfeffi\", \"beverage_alc\" : 18.0 })'
        "