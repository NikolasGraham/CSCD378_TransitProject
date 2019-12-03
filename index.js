$(document).ready(start);

function start() {
    setInterval(updateClock, 1000);
}

function updateClock() {
	var date = new Date();

	time = date.toLocaleTimeString("en-US");
	
	$("#clock").html(time);	
}