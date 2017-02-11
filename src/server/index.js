//  Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

//  Setting up the express app
const app = express();
const PORT = 8000;

//  Sets up express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

//  Static directory
app.use(express.static(path.join(__dirname + '/../client')));
/*app.use((req, res) => {
	res.sendFile(path.join(__dirname + '/../client/index.html'));
});*/

//  Routes //

// Home page
require('./routes/get/home')(app);
// Wallet API
require('./routes/get/wallet.data')(app);

//  Starting the express app
app.listen(PORT, () => {
	console.log('Express listening on port:', PORT);
});