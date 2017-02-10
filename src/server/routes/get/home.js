const path = require('path');

module.exports = (app) => {

	// This is the only route that should send back an HTML file.
	// Any other routing (i.e. to/from login) is handled by Angular
	app.get('/', (req, res) => {
		res.sendFile(path.join(__dirname + '/../../../client/index.html'));
	});

};