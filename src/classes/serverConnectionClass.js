const EventEmitter = require('events');
const net = require('net');

class Data extends EventEmitter {
	constructor(server, socket) {
		super();
		this.socket = socket;
		this.server = server;
		this.socket.on('data', this.onData.bind(this));
		this.socket.on('close', this.onClose.bind(this))
	}

	onData(data) { // when the server recieves data
		console.log(data);
	}

	onClose() { // when a client disconnects
		console.log("client disconnected");
	}
}

module.exports = Data;