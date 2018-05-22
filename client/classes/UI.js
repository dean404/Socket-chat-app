const EventEmitter = require('events');

class UI extends EventEmitter {
	constructor(submitButton) {
		super();
		this.submitButton = submitButton;
		this.submitButton.onclick = this.submit.bind(this); 
		}

	submit() {
		let message = document.getElementById("input");
		this.emit('message', message.value);
		message.value = "";
	}

	createNewMessageElement(message, attr){
		let item = document.createElement('li');

		if(attr == undefined) {
			item.className = "serverListItem";
		} else {
			item.className += attr + " message";
		}
	
		item.appendChild(document.createTextNode(message));
		document.getElementById("messages").appendChild(item);
	}

	createNewServerElement(name, address, port) {
		let item = document.createElement('li');
		item.className = "serverListItem";

		item.setAttribute("data-address", address);
		item.setAttribute("data-port", port);
		
		item.onclick = this.serverElementClicked.bind(this,item)
		item.appendChild(document.createTextNode(name));
		document.getElementById('servers').appendChild(item);
	}

	serverElementClicked(element) {
		let address = element.dataset.address;
		let port = element.dataset.port;
		this.emit('connect',{
			address,
			port
		})
	}

	chatScroll() {
		let cont = document.getElementById("containerMessage");
		let isScrolledToBottom = cont.scrollHeight - cont.clientHeight <= cont.scrollTop + 1;
		if (!isScrolledToBottom) {
			cont.scrollTop = cont.scrollHeight - cont.clientHeight;
		}
	}
}

module.exports = UI;