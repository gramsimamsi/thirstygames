let app = require('./app');
let webSocket = require('ws');
let fs = require('fs');
let https = require('https');

/***************************************************************
 * Websocket Configuration
 **************************************************************/
/* ToDo Fix wss
let credentials = {
    key: fs.readFileSync('sslcert/wss/server.key', 'utf8'),
    cert: fs.readFileSync('sslcert/wss/server.cert', 'utf8')
};

let wssServer = https.createServer(credentials);

let wssPort = normalizePort(process.env.PORT || '8080');

let webSocketServer = new webSocket.Server({server: wssServer});

wssServer.listen(wssPort);

function normalizePort(val) {
    let port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}
*/

let webSocketServer = new webSocket.Server({port : 8080});

webSocketServer.on('connection', (socket) => {
    //ToDo remove
    /*socket.send(JSON.stringify(
        {
            message: 'Server is connected'
        }
    ));*/
});

module.exports = webSocketServer;