#!/usr/bin/env bash

databaseFiled=1

if [[ -e data ]]
then
    echo "Do you wish to remove the old database? [1/2]"
    select yn in "Yes" "No"; do
        case ${yn} in
            Yes ) sudo rm -r data;
                  databaseFiled=0;
                  break;;
            No ) break;;
        esac
    done
else
    databaseFiled=0
fi

sudo docker-compose up -d

sleep 1

if [[ ${databaseFiled} -eq 0 ]]
then
    sudo docker exec thirstygames_wt_database bash -c "
        mongo thirstyGames --eval 'db.users.save({ \"user_name\" : \"admin\", \"user_password\" : \"\$2b\$10\$S0qzD5J2WE.POZGzNH2Kou8MU/jwjhu0tRMM8rLebcuK1Gn5YRaVy\", \"user_role\" : 0 })' &&
        mongo thirstyGames --eval 'db.beverages.save({ \"beverage_name\" : \"Bier\", \"beverage_alc\" : 5.0 })' &&
        mongo thirstyGames --eval 'db.beverages.save({ \"beverage_name\" : \"Schnaps\", \"beverage_alc\" : 40.0 })' &&
        mongo thirstyGames --eval 'db.beverages.save({ \"beverage_name\" : \"Pfeffi\", \"beverage_alc\" : 18.0 })'
        "

fi
echo "System up and ready"