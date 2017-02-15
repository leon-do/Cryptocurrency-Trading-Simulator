const data = require('../get/wallet.data.js');
const Transaction = require('../../models/Transaction');


module.exports = (app) => {


    app.post('/api/transfer', (req, res) => {
        let coin1 = req.body.coin1, //from
            coin2 = req.body.coin2, // to
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

            Transaction.findOne({
                where: {
                    username: "leon"
                },
                order: [[ 'createdAt', 'DESC' ]]
            }).then((data) => {

                // the math
                for (var key in data.dataValues){
                    if (key == coin1.toLowerCase()){
                        data.dataValues[key] -= amount;
                    }
                    if (key == coin2.toLowerCase()){
                        data.dataValues[key] += amount;
                    }
                }

                // this is the updated data values
                console.log(data.dataValues)

            });
        }
    });
};