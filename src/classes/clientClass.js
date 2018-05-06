const net = require('net');

class Client {
	constructor(port) {
		this.client = net.createConnection(port);
		this.client.on('data', this.onData.bind(this));
	}
	onData(data) { //when the server sends data
		let message = data.toString('utf8');
		console.log(message);
	}
	sendData() { // send data to server
		this.client.write("message");
	}
}

module.exports = Client;

