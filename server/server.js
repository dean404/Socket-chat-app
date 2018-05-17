const serverClass = require('./classes/serverClass.js');
const Broadcast = require('./broadcast');

(async ()=>{
	var server = new serverClass();
	server.startServer(7070);

	let emit = await Broadcast.createSocket(7070,"meme");
	setInterval(emit.broadcast.bind(emit), 1500);
})();