const passport = require('passport'),
	User = require('../../models/User');

module.exports = (app) => {

	app.post('/api/login', passport.authenticate('local'), (req, res) => {
		console.log(req.session);
		res.status(200).json(req.session.passport.user);
	});
};