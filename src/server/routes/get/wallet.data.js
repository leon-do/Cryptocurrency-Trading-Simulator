// Models
// =============================================================
const User = require('../../models/User');

module.exports = (app) => {

	app.get('/wallet/:username', (req, res) => {

		User.findOne({ username: req.params.username }, (err, user) => {
				if (err) { res.status(500).end(); console.log(err); }

				if (user) {
					res.json({ "wallet": user.wallet.toJSON() });
				}
				else {
					res.status(404).json({"error": "Requested user: " + req.params.username + " not found."})
				}
		});
	});
};