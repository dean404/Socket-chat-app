const dgram = require('dgram');
const broadcastMessage = Buffer.from("hello im here");
const client = dgram.createSocket('udp4');

function sendBroadcast() {
	client.bind( ()=>{
		client.setBroadcast(true);
		client.send(broadcastMessage, 41234, '172.20.95.255', err => {
			console.log(broadcastMessage);
			client.close();
		});
	});
}

sendBroadcast();