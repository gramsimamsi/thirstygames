#!/usr/bin/env bash

databaseFilled=1

if [ -e data ]
then
    echo "Do you wish to remove the old database? [1/2]"
    select yn in "Yes" "No"; do
        case ${yn} in
            Yes ) sudo rm -r data;
                  databaseFilled=0;
                  break;;
            No ) break;;
        esac
    done
else
    databaseFilled=0
fi

sudo docker-compose up -d

sleep 1

# Amount of alcohol [g] = volume [ml] * alcohol_perecentage of drink [%] * 0.8

if [ ${databaseFilled} -eq 0 ]
then
    sudo docker exec thirstygames_wt_database bash -c "
        mongo thirstyGames --eval 'db.users.save({ \"user_name\" : \"admin\", \"user_password\" : \"\$2b\$10\$S0qzD5J2WE.POZGzNH2Kou8MU/jwjhu0tRMM8rLebcuK1Gn5YRaVy\", \"user_role\" : 0 })' &&
        mongo thirstyGames --eval 'db.beverages.save({ \"beverage_name\" : \"Bier\", \"beverage_alc\" : 20 })' &&
        mongo thirstyGames --eval 'db.beverages.save({ \"beverage_name\" : \"Schnaps\", \"beverage_alc\" : 6.4 })' &&
        mongo thirstyGames --eval 'db.beverages.save({ \"beverage_name\" : \"Pfeffi\", \"beverage_alc\" : 2.88 })'
        "

fi
echo "System up and ready"