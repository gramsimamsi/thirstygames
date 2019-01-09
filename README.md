# ThirstyGames

## What are ThirstyGames?

### Tracking, interpreting and presenting of competititve and team-based consumption of predominantly hops-based liquids.

Actually we give you the opportunity to track the amount of alcohol which is consumed on your party.  
You can create "teams" who can compete with each other for the "My team drank more than the other team" price.

## Installation

### On Ferdora

Run `./startscript_fedora.sh` in the top directory of the application

### On Ubuntu

Run `./startscript_ubuntu.sh` in the top directory of the application

### On other devices

Run the following applications in the top directory of the application  
Mention that you have to install **docker** and **docker-compose**

##### Run the application

`sudo docker-compose up`

#### Put startup credentials into database (after you run the application)

`sudo docker exec thirstygames_wt_database_1 bash -c "
        mongo thirstyGames --eval 'db.users.save({ \"user_name\" : \"admin\", \"user_password\" : \"\$2b\$10\$S0qzD5J2WE.POZGzNH2Kou8MU/jwjhu0tRMM8rLebcuK1Gn5YRaVy\", \"user_role\" : 0 })' &&
        mongo thirstyGames --eval 'db.beverages.save({ \"beverage_name\" : \"Bier\", \"beverage_alc\" : 5.0 })' &&
        mongo thirstyGames --eval 'db.beverages.save({ \"beverage_name\" : \"Schnaps\", \"beverage_alc\" : 40.0 })' &&
        mongo thirstyGames --eval 'db.beverages.save({ \"beverage_name\" : \"Pfeffi\", \"beverage_alc\" : 18.0 })'
        "`
        
## Uninstallation

Run `./clearDockerContainer.sh` in the top directory of your application