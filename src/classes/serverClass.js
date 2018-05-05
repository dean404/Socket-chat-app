const EventEmitter = require('events');
const net = require('net');

const con = require('./serverConnectionClass');

class Server extends EventEmitter {
	constructor() {
		super();
		this.server = net.createServer(socket => {
			let clientConnect = new con(this.server, socket);
			this.sendServerData(socket);
		});
	}

	 startServer(port){ 
		 this.server.listen(port);
	}

	sendServerData(socket) { // send message to clients
		socket.write("meme");
	}
}

module.exports = Server;