/*** Server set up preliminary ***/
// Includes
const bot = require('./app/bot/lightbot.js');
const ip = require('ip');
const express = require('express');
const passport = require('passport');
const config = require('./config');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

// connect to mongo database and load models
require('./server/models').connect(config.dbUri, {
	useMongoClient: true,
});

const app = express();

// enable cors for all routes
app.use(cors());

// tell the app to look for static files in these directories
app.use(express.static('./dist'));
app.use(express.static('./images'));

// tell the app to parse HTTP body messages
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// use the passportJS authentication middleware
app.use(passport.initialize());

// load passport strategies
const localSignupStrategy = require('./server/passport/local-signup');
const localLoginStrategy = require('./server/passport/local-login');
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

// use the authentication checker middleware
const authCheckMiddleware = require('./server/middleware/auth-check');
app.use('/api', authCheckMiddleware);

// use auth and api routes
const authRoutes = require('./server/routes/auth.js');
const apiRoutes = require('./server/routes/api.js');
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);

/*** Endpoints ***/
// get response from api ai
app.get('/botresponse', function(req, res) {
	// User message
	var msg = req.query.msg;

	// Get agent response
	bot.getresponse(msg, function(response) {
		res.json(response);
	});
	console.log("Request made: " + msg);
});

// Serves the index.html page for all routes to allow for pretty URLS
// and enables page refresh
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './dist/index.html'))
})

app.post('/submitfeedback', function (req, res) {
    console.log(req.body);
});

// Run Express server, either on heroku port or local 8082
app.listen(process.env.PORT || 8082, () => {
	var host = ip.address();
	var port = 8082;

	console.log("LightBot server listening at http://%s:%s", host, port);
});
