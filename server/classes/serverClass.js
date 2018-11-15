const net = require('net');

const conn = require('./serverConnectionClass');

class Server {
	constructor() {
		this.clients = {};
		this.server = net.createServer(socket => {
			let clientConnect = new conn(this, socket);

			this.clients[clientConnect.clientID] = clientConnect;
			console.log(clientConnect.clientID + " connected");
		});
	}

	 startServer(port){ 
		 console.log("listening")
		 this.server.listen(port);
	}
}

module.exports = Server;