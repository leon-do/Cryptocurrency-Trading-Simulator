const passport = require('passport'),
	User = require('../models/User'),
	bcrypt = require('bcrypt'),
	LocalStrategy = require('passport-local');

module.exports = (app) => {
	app.use(passport.initialize());
	app.use(passport.session());

	passport.use(new LocalStrategy(
		(username, password, done) => {
			User.findOne({
				where: {
					username: username
				}
			}).then((user) => {
				if (!user) {
					return done(null, false, { message: 'Incorrect credentials.' })
				}

				let salt = password.substr(0, 5);
				bcrypt.compare(password, user.password).then((result) => {
					if (result) {
						return done(null, user)
					}
					return done(null, false, { message: 'Incorrect credentials.' })
				});
			});
		}
	));

	passport.serializeUser((user, done) => {
		done(null, user.id);
	});

	passport.deserializeUser((id, done) => {
		User.findById(id).then((user) => {
			done(null, user);
		});
	});
};