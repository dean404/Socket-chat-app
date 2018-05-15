const net = require('net');
const EventEmitter = require('events');
const protobuf = require('protobufjs');

const messageProtobuf = require("../message.json");
let root = protobuf.Root.fromJSON(messageProtobuf);
let text = root.lookupType("baseMessage.message");

class Client extends EventEmitter {
	constructor(port) {
		super();
		this.client = net.createConnection(port);
		this.client.on('data', this.onData.bind(this));
	}
	
	onData(data) { //when the server sends data
		let message = text.decode(data);
		this.emit('message', message)
	}

	sendData(message) { // send data to server
		let  messageInstance = text.create({
			textMessage: message
		});

		let protoMessage = text.encode(messageInstance).finish();
		this.client.write(protoMessage);
	}
}

module.exports = Client;

