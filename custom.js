$(function(){
	
	// Define servers URL
	var url = 'http://10.10.4.116:8080';
	
	// Make a connection with server using socket.io
	var socket = io.connect(url);
	
	// Event listeners - if clicked on the button "Turn pin ON"
	$(".turnONthePin").click(function(){
		socket.emit('pin', { status: 'on' });
	});
	
	// Event listeners - if clicked on the button "Turn pin OFF"
	$(".turnOFFthePin").click(function(){
		socket.emit('pin', { status: 'off' });
	});
	
});