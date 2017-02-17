const path = require('path');
const passport = require('passport');

module.exports = (app) => {

	app.get('/',
		passport.authenticate('local', {failureRedirect: '/login/new'}),
		(req, res) => {
			// success
			res.sendFile(path.join(__dirname + '/../../../client/index.html'));
		}
	);

	app.get('/home',
		passport.authenticate('local', {failureRedirect: '/login'}),
		(req, res) => {
			res.status(200);
		}
	);
};