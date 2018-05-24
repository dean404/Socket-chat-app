const serverClass = require('./classes/serverClass.js');
const broadcast = require('./broadcast');
const config = require('../config.json');

let port = config.port;
let name = config.name;

(async ()=>{
	var server = new serverClass();
	server.startServer(port);

	let emit = await broadcast.createSocket(port, name);
	setInterval(emit.broadcast.bind(emit), 1500);
})();