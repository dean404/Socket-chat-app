const dgram = require('dgram');

const Client = require('./classes/clientClass');
const UI = require('./classes/UI');

const server = dgram.createSocket({type: 'udp4', reuseAddr: true});
server.bind({port: 41234, exclusive: false});

const submitButton = document.getElementById("submitButton");

let ui = new UI(submitButton);
let serverList = {}
let counter = 0;
let client;

ui.on('connect', ({port, address, name}) => { // when a link from the server list is clicked

	ui.createTitle(name);
	let clientClone = client; // variable to store the previous connection
	client = new Client(parseInt(port), address); // create a new connection to a server

	if(counter == 0 || typeof counter === 'undefined') { // if the user hasn't previously connected to a server
		counter +=1;

		ui.on('message', message => { // messages from the current client
			if (/\S/.test(message)) {
				client.sendData(message);
				ui.createNewMessageElement(message, 'messageRight');
			} else {
				// do nothing
			}
		});

	} else {
		clientClone.client.destroy(); // destroy the previous connection
	}

	client.on('message', message => { // messages from other clients
		ui.createNewMessageElement(message['textMessage'], 'messageLeft');
		ui.chatScroll();
	});

	client.on("close", () => {
		console.log("disconnected from server");
	});
});

// when the client recieves a broadcast message
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

//function to display and remove available servers
function listServers() { 
	let serverItems = document.getElementsByClassName("serverListItem");

	while(serverItems.length > 0) {
		serverItems[0].parentNode.removeChild(serverItems[0]); // remove the available servers from the list each time the function is called
	}
	
	for (let servers in serverList) {
		let serverTime = serverList[servers].lastSeen;

		if (new Date() > new Date(serverTime.getTime() + 5000)) {
			delete serverList[servers]; // remove a server from the list if it hasn't broadcast in 5 seconds
		} else {
			let address = serverList[servers].address;
			let port = serverList[servers].port;
	
			ui.createNewServerElement(servers, address, port); // create a new element that contains the servers details and add it to the list
		}
	}
}

setInterval(listServers, 1000); // run the function every second