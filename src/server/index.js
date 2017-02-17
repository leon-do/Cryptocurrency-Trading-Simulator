//  Dependencies
const express = require('express'),
	bodyParser = require('body-parser'),
	path = require('path'),
	session = require('express-session'),
	morgan = require('morgan'),
	passport = require('passport'),
	connection = require('./utils/connect'),
	MongoStore = require('connect-mongo')(session),
	passportConfig = require('./utils/passportConfig');

//  Setting up the express app
const app = express();
const PORT = 80;

//  Static directory
app.use(express.static(path.join(__dirname + '/../client')));

passportConfig();

app.use(morgan('req --> :method :url', {
	immediate: true,
}));
app.use(morgan('res <-- :url :status :response-time ms', {
	immediate: false,
}));

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
	res.header("Access-Control-Allow-Credentials", "true");
	next();
});

//  Sets up express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Passport //
app.use(session({
	secret: '4564f6s4fdsfdfd',
	resave: false,
	saveUninitialized: true,
	store: new MongoStore({
		mongooseConnection: connection,
		autoRemove: 'disabled'
	})
}));
app.use(passport.initialize());
app.use(passport.session());

//  Routes //
// Home page
require('./routes/get/home')(app);
// Wallet API

require('./routes/get/wallet')(app);
require('./routes/post/transfer')(app);
// // Login API
require('./routes/post/login')(app);
//  Bot API
require('./routes/api/wallet')(app);
require('./routes/api/transfer')(app);

//  Starting the express app
app.listen(PORT, () => {
	console.log('Express listening on port:', PORT);
});