const dgram = require('dgram');

const Client = require('./classes/clientClass');
const UI = require('./classes/UI');

const server = dgram.createSocket({type: 'udp4', reuseAddr: true});
server.bind({port: 41234, exclusive: false});

const submitButton = document.getElementById("submitButton");

let ui = new UI(submitButton);
let serverList = {}
let currentServer;

ui.on('connect', ({port, address}) => {
	let client = new Client(parseInt(port), address);

	ui.on('message', message => {
		client.sendData(message);
		ui.createNewMessageElement(message, 'messageRight');
	});

	client.on('message', message => {
		ui.createNewMessageElement(message['textMessage'], 'messageLeft');
		ui.chatScroll();
	});
});

server.on('message', (msg, rinfo) => {
	serverList[msg] = {
		name : `${msg}`,
		address : rinfo.address,
		port : rinfo.port,
		lastSeen : new Date()
	}
});

server.on('listening', () => {
	const address = server.address();
	console.log(`server listening ${address.address}:${address.port}`);
});

function listServers() {
	let serverItems = document.getElementsByClassName("serverListItem");

	while(serverItems.length > 0) {
		serverItems[0].parentNode.removeChild(serverItems[0]);
	}
	
	for (let servers in serverList) {
		let serverTime = serverList[servers].lastSeen;

		if (new Date() > new Date(serverTime.getTime() + 5000)) {
			delete serverList[servers];
		} else {
			let address = serverList[servers].address;
			let port = serverList[servers].port;
	
			ui.createNewServerElement(servers, address, port);
		}
	}
}

setInterval(listServers, 1000);