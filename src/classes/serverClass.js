const EventEmitter = require('events');
const net = require('net');

const con = require('./serverConnectionClass');

class Server {
	constructor() {
		this.clients = {};
		this.server = net.createServer(socket => {
			let clientConnect = new con(this, socket);

			this.clients[clientConnect.clientID] = clientConnect;
			console.log(clientConnect.clientID + " connected");
		});
	}

	 startServer(port){ 
		 this.server.listen(port);
	}
}

module.exports = Server;