const User = require('../../models/User');
const request = require("request");

module.exports = (app) => {

    app.post('/:username/transfer', (req, res) => {
        let coin1 = req.body.coin1, //from
            coin2 = req.body.coin2, // to
            amount = req.body.amount;

        console.log('Posted to http://localhost:8000/transfer\n>', coin1, coin2, amount);

        User.findOne({ username: req.params.username }, (err, user) => {
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

			        for (let i = 0; i < allData.length; i++) {
			        	if (coin1 == 'USD') {price1 = 1;}
			        	if (coin2 == 'USD') {price2 = 1;}

                        if (!price1 && coin1 === allData[i].short) {
                            price1 = allData[i].price;
                            if (!time) { time = allData[i].time; }
                        }
                        else if (!price2 && coin2 === allData[i].short) {
                            price2 = allData[i].price;
	                        if (!time) { time = allData[i].time; }
                        }

                        if (price1 && price2) { break }
			        }

			        conversion = (price1 * amount) / price2;

			        user.transactions.unshift(user.wallet);

			        user.updateWallet(coin1, coin2, amount, conversion, time, () => {
				        console.log('thisthisthis');
				        user.save((err, newUser) => {
					        if (err) {console.log(err);}
					        console.log('user saved');
					        res.json({ "wallet": newUser.wallet.toJSON() });
				        });
			        });
		        });
            }
        });
    });
};