const dgram = require('dgram');
class Broadcast {
	static async createSocket(port, name) {
		let client = dgram.createSocket('udp4');
		// client.send()
		await new Promise((resolve, reject) => {
			client.bind({
				port: port,
				exclusive: false
			}, (err) => {
				if (err) {
					reject(err);
				}
				resolve();
			});
		});

		client.setBroadcast(true);
		return new Broadcast(client, name);
	}

	constructor(client, name) {
		this.client = client;
		this.name = name;
	}

	broadcast() {
		this.client.send(Buffer.from(this.name), 41234, '255.255.255.255');
	}
}

module.exports = Broadcast;