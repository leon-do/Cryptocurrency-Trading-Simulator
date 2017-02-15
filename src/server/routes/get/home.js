const path = require('path'),
	passport = require('passport');

module.exports = (app) => {

	app.get('/home',
		passport.authenticate('local'),
		(req, res) => {
			res.status(200);
		}
	);

	app.get('/',
		passport.authenticate('local'),
		(req, res) => {
			// success
			res.sendFile(path.join(__dirname + '/../../../client/index.html'));
		}
	);
};