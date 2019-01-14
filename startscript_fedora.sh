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
echo "Do you wish to install docker? [1/2]"
select yn in "Yes" "No"; do
    case ${yn} in
        Yes ) sudo dnf -y install docker-ce-3:18.09.0-3.fc28;
              # shows newest version
              sudo dnf list docker-ce  --showduplicates | sort -r;
              break;;
        No ) break;;
    esac
done
echo "Do you wish to start docker? [1/2]"
select yn in "Yes" "No"; do
    case ${yn} in
        Yes ) sudo systemctl start docker; break;;
        No ) break;;
    esac
done
echo "Do you wish to install docker-compose? [1/2]"
select yn in "Yes" "No"; do
    case ${yn} in
        Yes ) sudo sudo curl -L "https://github.com/docker/compose/releases/download/1.23.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose &&
            sudo chmod +x /usr/local/bin/docker-compose; break;;
        No ) break;;
    esac
done

sudo docker-compose up -d

sleep 1

if [ ${databaseFilled} -eq 0 ]
then
    sudo docker exec thirstygames_wt_database bash -c "
        mongo thirstyGames --eval 'db.users.save({ \"user_name\" : \"admin\", \"user_password\" : \"\$2b\$10\$S0qzD5J2WE.POZGzNH2Kou8MU/jwjhu0tRMM8rLebcuK1Gn5YRaVy\", \"user_role\" : 0 })' &&
        mongo thirstyGames --eval 'db.beverages.save({ \"beverage_name\" : \"Bier\", \"beverage_alc\" : 5.0 })' &&
        mongo thirstyGames --eval 'db.beverages.save({ \"beverage_name\" : \"Schnaps\", \"beverage_alc\" : 40.0 })' &&
        mongo thirstyGames --eval 'db.beverages.save({ \"beverage_name\" : \"Pfeffi\", \"beverage_alc\" : 18.0 })'
        "

fi
echo "System up and ready"


