const protobuf = require('protobufjs');

const Client = require('./classes/clientClass');
const UI = require('./classes/UI');

const messageProtobuf = require("./message.json");
let root = protobuf.Root.fromJSON(messageProtobuf);
let text = root.lookupType("baseMessage.message");

const submitButton = document.getElementById("submitButton");

let client = new Client(7070);
let ui = new UI(submitButton);

ui.on('message', message => { // when i send message
	client.sendData(message);
	ui.createNewElement(message, 'messageRight');
});

client.on('message', message => { // when i recieve message
	ui.createNewElement(message['textMessage'], 'messageLeft');
});