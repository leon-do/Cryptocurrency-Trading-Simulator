const passport = require('passport'),
	bcrypt = require('bcrypt'),
	User = require('../../models/User');

module.exports = (app) => {

	app.post('/login', passport.authenticate('local'), (req, res) => {
			console.log(req.session);
			res.status(200).end();
	});

	app.post('/new', (req, res) => {

		bcrypt.hash(req.body.password, 10).then((hashed) => {
			let user = new User({
				username: req.body.username,
				password: hashed
			});
			user.save((err, newUser) => {
				if (err) {res.status(403).send(err);}
				req.login(newUser, (err) => {
					if (err) {console.log(err)}
					console.log('new user created:\n', newUser);
					res.status(200).json({"userId": newUser._id, "username": newUser.username});
				});
			});
		});
	});
};