const passport = require('passport'),
	bcrypt = require('bcrypt'),
	User = require('../../models/User');

module.exports = (app) => {

	app.post('/login',
		passport.authenticate('local'),
		(req, res) => {
			res.status(200).end();
		});

	app.post('/new', (req, res) => {

		let salt = req.body.password.substr(0,5);
		bcrypt.hash(req.body.password, 10).then((hashed) => {
			User.create({
				username: req.body.username,
				password: hashed
			}).then(() => {
				res.redirect('/');
			}).catch((error) => {
				res.status(403).end();
			});
		});
	})
};