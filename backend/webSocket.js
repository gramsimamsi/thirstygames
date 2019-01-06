let webSocket = require('ws');

/***************************************************************
 * Websocket Configuration
 **************************************************************/

let webSocketServer = new webSocket.Server({port: 8080});

webSocketServer.on('connection', (socket) => {
    //ToDo remove
    /*socket.send(JSON.stringify(
        {
            message: 'Server is listening'
        }
    ));*/
});

module.exports = webSocketServer;