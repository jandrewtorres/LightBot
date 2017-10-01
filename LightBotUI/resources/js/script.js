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
	$('<p>User: ' + usrmsg + '</p>').appendTo('#chat-box');
	var botmsg = 'Hello User, I am LightBot!';
	$('<p>LightBot: ' + botmsg + '</p>').appendTo('#chat-box');
	return false;
}
