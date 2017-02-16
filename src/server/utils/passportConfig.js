const passport = require('passport'),
	User = require('../models/User'),
	bcrypt = require('bcrypt'),
	LocalStrategy = require('passport-local');

module.exports = () => {
	passport.use(new LocalStrategy(
		(username, password, done) => {
			User.findOne({ username: username }).then((user) => {
				if (!user) {
					return done(null, false, { message: 'Incorrect credentials.' })
				}

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
		let sessionUser = { _id: user._id, username: user.username, wallet: user.wallet};
		done(null, sessionUser);
	});

	passport.deserializeUser((id, done) => {
		User.findById(id).then((user) => {
			done(null, user);
		});
	});
};