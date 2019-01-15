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
    sudo docker exec thirstygames_wt_database bash -c "mongo thirstyGames --eval 'db.users.save({ \"user_name\" : \"admin\", \"user_password\" : \"\$2b\$10\$S0qzD5J2WE.POZGzNH2Kou8MU/jwjhu0tRMM8rLebcuK1Gn5YRaVy\", \"user_role\" : 0 })'"
    sudo docker exec thirstygames_wt_database bash -c "mongo thirstyGames --eval 'db.users.save({ \"user_name\" : \"springer\", \"user_password\" : \"\$2b\$10\$u8T1.hO5gUpKCOF6OQRXveCEZ92NGzlMTyjATd2QpsbPtf8AZ.7o2\", \"user_role\" : 3 })'"

    drinksValid=0
    while [ $drinksValid -eq 0 ]
    do
        read -p "How many drinks do you want to offer at your party? " numberOfDrinks
        if ! [[ $numberOfDrinks =~ ^[0-9] ]]
        then
            echo "Error: The strength must be a number!"
        else
            drinksValid=1
        fi
    done

    let numberOfDrinks-=1

    for i in $(seq 0 $numberOfDrinks)
    do
        nameValid=0
        while [ $nameValid -eq 0 ]
        do
            read -p "Enter name of drink ${i}: " nameOfDrink[$i]
            if [[ ${nameOfDrink[$i]} =~ ^[0-9]+$ ]]
            then
                echo "Error: The name mustn't be a number!"
            elif [ -z ${nameOfDrink[$i]} ]
            then
                echo "Error: The name mustn't be empty!"
            else
                nameValid=1
            fi
        done

        strengthValid=0
        while [ $strengthValid -eq 0 ]
        do
            read -p "Enter the alcoholic strength of your drink [%]: " strengthOfDrink[$i]
            if ! [[ ${strengthOfDrink[$i]} =~ ^[0-9] ]]
            then
                echo "Error: The strength must be a number!"
            elif [ ${strengthOfDrink[$i]} -gt 100 ]
            then
                echo "Error: The strength can't be higher than 100%"
            else
                strengthValid=1
            fi
        done

        chargeValid=0
        while [ $chargeValid -eq 0 ]
        do
            read -p "Enter the charge of a unit [ml] : " chargeOfDrink[$i]
            if ! [[ ${chargeOfDrink[$i]} =~ ^[0-9] ]]
            then
                echo "Error: The strength must be a number!"
            else
                chargeValid=1
            fi
        done

        if [ ${strengthOfDrink[$i]} -lt 10 ]
        then
            strength[$i]=$(echo "${chargeOfDrink[$i]}*.0${strengthOfDrink[$i]}*0.8" | bc)
        else
            strength[$i]=$(echo "${chargeOfDrink[$i]}*.${strengthOfDrink[$i]}*0.8" | bc)
        fi

        sudo docker exec thirstygames_wt_database bash -c "mongo thirstyGames --eval 'db.beverages.save({ \"beverage_name\" : \"${nameOfDrink[$i]}\", \"beverage_alc\" : ${strength[$i]}})'"

    done
fi
echo "System up and ready"


