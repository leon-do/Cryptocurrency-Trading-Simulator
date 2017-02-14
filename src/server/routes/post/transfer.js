const data = require('../get/data');

module.exports = (app) => {

	app.post('/api/transfer', (req, res) => {
		let coin1 = req.body.coin1,
			coin2 = req.body.coin2,
			amount = req.body.amount;

		console.log('Posted to http://localhost:8000/api/transfer\n>', coin1, coin2, amount);

		let indexFrom,
			indexTo;
		let fromCoin = {},
			toCoin = {};

		data.cryptos.forEach((element, i) => {
			if (element.name == coin1) {
				indexFrom = i;
				fromCoin = element;
			} else if (element.name == coin2) {
				indexTo = i;
				toCoin = element;
			}
		});

		if (amount > fromCoin.balance) {
			// 403 == Forbidden https://httpstatuses.com/
			res.status(403).json({ "reason": "Forbidden: Insufficient Funds"});
		}
		else {
			// hypothetical crypto math for testing
			// just moving balances
			data.cryptos[indexFrom].balance -= amount;
			data.cryptos[indexTo].balance += amount;
			console.log('success');
			res.json(data);
		}
	});
};