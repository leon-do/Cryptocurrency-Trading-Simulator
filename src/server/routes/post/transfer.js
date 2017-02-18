const User = require('../../models/User');
const request = require("request");

module.exports = (app) => {

    app.post('/transfer', (req, res) => {
        let coin1 = req.body.coin1, //from
            coin2 = req.body.coin2, // to
            amount = req.body.amount;

	    if (coin1 == coin2) {return res.status(403).end()}

        console.log('Posted to /transfer\n>', coin1, coin2, amount);

        User.findById(req.user._id, (err, user) => {
	        if (err) { res.status(500).end(); console.log(err); }

	        // check balance
	        if (user.wallet[coin1] < amount) {
		        res.status(403).json({ "reason": "Forbidden: Insufficient Funds"});
            }
            else {
		        user.transactions.unshift(user.wallet);

		        request('http://coincap.io/front', function (error, response, body) {
		        	if (error) throw error;
                    let allData = JSON.parse(body);

                    let convertedAmount,
                        price1,
                        price2,
	                    time;

			        let allCoinsValue = { USD: 1 },
				        wallet = user.wallet.toJSON(),
				        total = 0,
				        score = { all: {}};

			        for (let i = 0; i < allData.length; i++) {
			        	if (coin1 == 'USD') {price1 = 1;}
			        	if (coin2 == 'USD') {price2 = 1;}

			        	if (allData[i].short in wallet) {
			        		allCoinsValue[allData[i].short] = allData[i].price;
				        }

                        if (!price1 && coin1 === allData[i].short) {
                            price1 = allData[i].price;
                            if (!time) { time = allData[i].time; }
                        }
                        else if (!price2 && coin2 === allData[i].short) {
                            price2 = allData[i].price;
	                        if (!time) { time = allData[i].time; }
                        }

                        if ((price1 && price2) && (allCoinsValue.length == (wallet.length - 1))) { break }
			        }

			        convertedAmount = (price1 * amount) / price2;

			        //  allCoinsValue[coin] == coin value in USD
			        for (let c in wallet) {
			        	let quant;

			        	if (c == coin1) { quant = wallet[c] - amount }
			        	else if (c == coin2) { quant = wallet[c] + convertedAmount }
			        	else { quant = wallet[c] }

			        	let valueUSD = quant * allCoinsValue[c];
			        	total += valueUSD;
			        	allCoinsValue[c] = valueUSD;
			        	score.all[c] = {
			        		amount: quant,
					        valueUSD: allCoinsValue[c]
				        }
			        }

			        score.total = total;
			        console.log(allCoinsValue);
			        console.log('score:',score);


			        user.updateWallet(coin1, coin2, amount, convertedAmount, time, score, () => {
				        console.log('thisthisthis');
				        user.save((err, newUser) => {
					        if (err) {console.log(err);}
					        console.log('user saved:', newUser);
					        res.json({ "wallet": newUser.wallet.toJSON(), "score": newUser.score.toJSON() });
				        });
			        });
		        });
            }
        });
    });
};