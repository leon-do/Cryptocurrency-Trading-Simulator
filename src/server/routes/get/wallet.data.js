// Models
// =============================================================
const mongoose = require('mongoose');
const User = require('../../models/User');

module.exports = (app) => {

	app.get('/wallet/:userId', (req, res) => {

			User.findById(req.params.userId, (err, user) => {
					if (err) { res.status(500).end(); console.log(err); }

					res.json({ "wallet": user.wallet.toJSON() });
			});
	});
};