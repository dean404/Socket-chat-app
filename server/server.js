const serverClass = require('./classes/serverClass.js');
const broadcast = require('./broadcast');
// const config = require('../config.json');

let port = 41235;
let name = "server";

(async ()=>{
	var server = new serverClass();
	server.startServer(port);

	let emit = await broadcast.createSocket(port, name);
	setInterval(emit.broadcast.bind(emit), 1500);
})();