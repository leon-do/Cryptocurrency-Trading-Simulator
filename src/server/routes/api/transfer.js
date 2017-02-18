const User = require('../../models/User');
const request = require("request");
const passport = require('passport');

module.exports = (app) => {

	app.post('/api/transfer/', passport.authenticate('local'), (req, res) => {

		let coin1 = req.query.coin1, //from
			coin2 = req.query.coin2, // to
			amount = req.query.amount;

		if (coin1 == coin2) {return res.status(403).end()}

		console.log('Posted to /api/transfer\n>', coin1, coin2, amount);

		User.findById(req.user._id, (err, user) => {
			if (err) { res.status(500).end(); console.log(err); }

			// check balance
			if (user.wallet[coin1] < amount) {
				res.status(403).json({ "reason": "Forbidden: Insufficient Funds"});
			}
			else {
				request('http://coincap.io/front', function (error, response, body) {
					if (error) throw error;
					let allData = JSON.parse(body);

					let conversion,
						price1,
						price2,
						time;

					let allCoins = { USD: 1 },
						wallet = user.wallet.toJSON(),
						score = 0;

					for (let i = 0; i < allData.length; i++) {
						if (coin1 == 'USD') {price1 = 1;}
						if (coin2 == 'USD') {price2 = 1;}

						if (allData[i].short in wallet) {
							allCoins[allData[i].short] = allData[i].price;
						}

						if (!price1 && coin1 === allData[i].short) {
							price1 = allData[i].price;
							if (!time) { time = allData[i].time; }
						}
						else if (!price2 && coin2 === allData[i].short) {
							price2 = allData[i].price;
							if (!time) { time = allData[i].time; }
						}

						if ((price1 && price2) && (allCoins.length == (wallet.length - 1))) { break }
					}

					//  allCoins[coin] == coin value in USD
					for (let c in wallet) {
						let quant = wallet[c];
						score += quant * allCoins[c];
					}
					console.log('score:',score);

					conversion = (price1 * amount) / price2;

					user.transactions.unshift(user.wallet);

					user.updateWallet(coin1, coin2, amount, conversion, time, score, () => {
						console.log('thisthisthis');
						user.save((err, newUser) => {
							if (err) {console.log(err);}
							console.log('user saved');
							res.json({ "wallet": newUser.wallet.toJSON(), "score": newUser.score });
						});
					});
				});
			}
		});
	});
};