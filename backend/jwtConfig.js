//ToDo -> replace plainTextSecret, store it in ENV-VARIABLE,
//ToDo -> update refreshToken when expired
//ToDo -> update refreshToken when expired
//https://solidgeargroup.com/refresh-token-with-jwt-authentication-node-js
//https://solidgeargroup.com/refresh-token-with-jwt-authentication-node-js
//https://stackoverflow.com/questions/37859852/refresh-token-jsonwebtoken
//https://stackoverflow.com/questions/37859852/refresh-token-jsonwebtoken
//https://stackoverflow.com/questions/37859852/refresh-token-jsonwebtoken
//Ablauf, falls token ausgelaufen ist -> es wird ein Fehler an den Client zurückgesendet, die Fehlermeldung enthält die Info,
// dass der token abgelaufen ist
// In diesem Fall leitet der Client automatisch auf die Seite /token um und sendet den Refresh-Token und den Username mit (der Refreshtoken wurde beim login mitgesendet,
// sollte sich noch beim Client befinden -> wenn nicht vorhanden, oder gefunden -> leite auf login um)
// Server prüft, ob die gesendete Kombination aus username und refreshtoken valid ist (Werte sind in der Datenbank hinterlegt) -> sendet neuen token zurück
//-> Vergleiche
//    * https://solidgeargroup.com/refresh-token-with-jwt-authentication-node-js
//    * https://stackoverflow.com/questions/37859852/refresh-token-jsonwebtoken
//    *
//   neuer Refreshtoken wird beim login erstellt -> zurückgesendet und in DB gespeichert
module.exports =
    {
        secret: 'mySuperSecretSecretForJWTCreation',
        refreshSecret: 'esWirdEinfachNichtSicherer:D',
        tokenExpirationTime: '24h',
        refreshTokenExpirationTime: '1440h', // -> 60d
        timeToRefresh: ' ',
    };
