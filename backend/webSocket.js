let webSocket = require('ws');

//ToDo remove this whole file, when wss is working properly
let webSocketServer = new webSocket.Server({port : 8080});

module.exports = webSocketServer;

