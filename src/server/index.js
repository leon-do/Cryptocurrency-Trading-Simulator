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
const PORT = 8000;

passportConfig();

app.use(morgan('req --> :method :url', {
	immediate: true,
}));
app.use(morgan('res <-- :url :status :response-time ms', {
	immediate: false,
}));

//  Static directory
app.use(express.static(path.join(__dirname + '/../client')));

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
		mongooseConnection: connection
	})
}));
app.use(passport.initialize());
app.use(passport.session());

//  Routes //
// Home page
require('./routes/get/home')(app);
// Wallet API

require('./routes/get/wallet.data')(app);
require('./routes/post/transfer')(app);
// // Login API
require('./routes/post/login')(app);

//  Starting the express app
app.listen(PORT, () => {
	console.log('Express listening on port:', PORT);
});