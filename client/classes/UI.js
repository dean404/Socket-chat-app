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

	createTitle(name) {
		let title = document.createElement('h3');
		title.id = "title";

		//prevent multiple elements from being created
		if(document.getElementById("title")) {
			document.getElementById("title").outerHTML = "";
		} else {
			//do nothing
		}

		title.appendChild(document.createTextNode(name));
		document.getElementById("containerMessage").prepend(title);
	}

	createNewMessageElement(message, attr){
		let item = document.createElement('li');

		item.className += "message " ;
		item.className += attr;

		item.appendChild(document.createTextNode(message));
		document.getElementById("messages").appendChild(item);
	}

	createNewServerElement(name, address, port) {
		let item = document.createElement('li');
		item.className = "serverListItem";

		item.setAttribute("data-address", address);
		item.setAttribute("data-port", port);
		
		item.onclick = this.serverElementClicked.bind(this, item, name);

		item.appendChild(document.createTextNode(name));
		document.getElementById('servers').appendChild(item);
	}

	serverElementClicked(element, name) {
		let address = element.dataset.address;
		let port = element.dataset.port;

		this.emit('connect',{
			address,
			port,
			name
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