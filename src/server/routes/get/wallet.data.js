// Models
// =============================================================
const User = require('../../models/User');

module.exports = (app) => {

	app.get('/wallet/:username', (req, res) => {
		console.log(req.session);


		User.findById(req.user._id, (err, user) => {
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