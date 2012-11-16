// Include GPIO library
var gpio = require("gpio");
// Define GPIO 4 PIN as OUT
var gpio4 = gpio.export(4, { direction: 'out' });

var app = require('http').createServer(handler),
	io = require('socket.io').listen(app),
	static = require('node-static'); 

var fileServer = new static.Server('./');

var port_nr = 8080;

app.listen(port_nr);
console.log("Server created on port " + port_nr);

function handler (request, response) {

	request.addListener('end', function () {
		fileServer.serve(request, response);
	});
}

//	Disable socket debug messages (logs)
io.set('log level', 1);

io.sockets.on('connection', function (socket) {
	//	Listens and gets the data from 'pin' channel
	socket.on('pin', function (data) {
		led_function(data["status"]);
	});
});

//	Function that sets or resets (1 or 0) the GPIO pin
var led_function = function(status){
	switch(status){
		case "on":
			gpio4.set();
			break;
		case "off":
			gpio4.reset();
			break;
	}
}