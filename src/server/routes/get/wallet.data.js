// Models
// =============================================================
const User = require('../../models/User');
const Transaction = require('../../models/Transaction');
const cryptos = require('./data.js')

// //the below is temporary
// const data = require('./data');

//use /wallet by for testing until login works
// =============================================================
module.exports = (app) => {
	app.get('/wallet', (req, res) => {
		res.json(cryptos);
	});
	
	app.get('/:username/wallet', (req, res) => {
		Transaction.findOne({
			where: {
				username: req.params.username
			},
			order: [[ 'createdAt', 'DESC' ]]
		}).then((data) => {
			res.json(data);
		});
	});
};