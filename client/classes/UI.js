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

	createNewElement(message, attr){
		let item = document.createElement('li');
		item.className += attr + " message";
		item.appendChild(document.createTextNode(message));
		document.getElementById('messages').appendChild(item);
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