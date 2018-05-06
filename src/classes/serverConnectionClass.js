const EventEmitter = require('events');
const shortid = require('shortid');
const net = require('net');

class Data extends EventEmitter {
	constructor(server, socket) {
		super();
		this.server = server;
		this.socket = socket;
		this.clientID = shortid.generate();

		this.socket.on('data', this.onData.bind(this));
		this.socket.on('close', this.onClose.bind(this));
	}

	onData(data) { // when the server recieves data
		for (let clientID in this.server.clients) {
			let client = this.server.clients[clientID];
			if (client.clientID != this.clientID) {
				client.socket.write(data);
			}
		}
	}

	onClose() { // when a client disconnects
		console.log("client disconnected");
	}
}

module.exports = Data;