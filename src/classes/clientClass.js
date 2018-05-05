const net = require('net');

class Client {
	constructor(port) {
		this.client = net.createConnection(port);
		this.client.on('data', this.onData.bind(this));
	}
	onData(data) { //when the server sends data
		console.log(data);
	}
	sendData() { // send data to server
		this.client.write("message");
	}
}

module.exports = Client;

