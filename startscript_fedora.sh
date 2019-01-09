#!/usr/bin/env bash

sudo rm -r data
sudo dnf -y install docker-ce-3:18.09.0-3.fc28
# shows newest version
# sudo dnf list docker-ce  --showduplicates | sort -r
sudo systemctl start docker
#sudo curl -L "https://github.com/docker/compose/releases/download/1.23.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
#sudo chmod +x /usr/local/bin/docker-compose
sudo docker-compose up -d
sleep 2
sudo docker exec thirstygames_wt_database_1 bash -c "
        mongo thirstyGames --eval 'db.users.save({ \"user_name\" : \"admin\", \"user_password\" : \"\$2b\$10\$S0qzD5J2WE.POZGzNH2Kou8MU/jwjhu0tRMM8rLebcuK1Gn5YRaVy\", \"user_role\" : 0 })' &&
        mongo thirstyGames --eval 'db.beverages.save({ \"beverage_name\" : \"Bier\", \"beverage_alc\" : 5.0 })' &&
        mongo thirstyGames --eval 'db.beverages.save({ \"beverage_name\" : \"Schnaps\", \"beverage_alc\" : 40.0 })' &&
        mongo thirstyGames --eval 'db.beverages.save({ \"beverage_name\" : \"Pfeffi\", \"beverage_alc\" : 18.0 })'
        "