//  Dependencies
const express = require('express');
const bodyParser = require('body-parser');

//  Setting up the express app
const app = express();
const PORT = 8000;

//  Sets up express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

//  Static directory
app.use(express.static('./app'));

//  Routes
require('./routes/html-routes')(app);
require('./routes/api-routes')(app);

//  Starting the express app
app.listen(PORT, () => {
	console.log('Express listening on port:', PORT);
});