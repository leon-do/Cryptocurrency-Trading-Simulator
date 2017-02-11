const path = require('path');
const data = require('./data');

module.exports = (app) => {
	// temporary user parameter can currently be any word.
	// We'll need to add a check for user authentication
	app.get('/wallet', (req, res) => {
		// this should make a query to the DB for user's last transaction data
		// temporarily... it doesn't.
		res.json(data);
	});
};