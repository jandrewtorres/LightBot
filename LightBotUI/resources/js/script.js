var baseURL = "http:localhost:8080/";

$(document).ready(function() {
	$('#user-msg').keyup(function(event){
		if(event.keyCode == 13){
			$('#submit-msg').click();
		}
	});

	$(function () {
		$('#submit-msg').on('click', function () {
			submitUsrMsg();
		});
	});
});

function submitUsrMsg() {
	var usrmsg = $('#user-msg').val(); 
	var URL = baseURL + "?msg=" + usrmsg;
	$('<p>User: ' + usrmsg + '</p>').appendTo('#chat-box');
	
	$.getJSON(URL, function(data) {
		console.log('success');
		var botmsg = data.result.fulfillment.speech;
		$('<p>LightBot: ' + botmsg + '</p>').appendTo('#chat-box');
	}); 

	return false;
}
