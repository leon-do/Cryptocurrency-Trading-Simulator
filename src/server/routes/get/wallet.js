// Models
// =============================================================
const User = require('../../models/User');

module.exports = (app) => {

	app.get('/wallet', (req, res) => {
		console.log(req.session);

		if (!req.user) {return res.redirect('/#/splash')}
		User.findById(req.user._id, (err, user) => {
			if (err) { res.status(500).end(); console.log(err); }

			if (user) {
				console.log(user.wallet.toJSON);
				res.json({ "wallet": user.wallet.toJSON(), "score": user.score.toJSON() });
			}
			else {
				res.status(404).json({"error": "Requested user: " + req.params.username + " not found."})
			}
		});
	});
};