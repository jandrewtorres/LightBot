// Includes
var bot = require('./bot/lightbot.js');
var ip = require('ip');

// Express Includes
var express = require('express');
var cors = require('cors');
var app = express();

// Allow CORS for all
app.use(cors());

// Get response from apiai agent
app.get('/', function(req, res) {
	// User message
	var msg = req.query.msg;

	// Get agent response
	bot.getresponse(msg, function(response) {
		res.json(response);
	});
	console.log("Request made: " + msg);
});

// Run Express server
var server = app.listen(8080, function() {
	var host = ip.address();
	var port = server.address().port;

	console.log("LightBot server listening at http://%s:%s", host, port);
});

