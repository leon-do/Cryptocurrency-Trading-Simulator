//const data = require('../get/wallet.data.js');
const Transaction = require('../../models/Transaction');
const request = require("request")
const data = require('../get/data.js')  //comment this once wallet.data.js works

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
               request('http://coincap.io/front', function (error, response, body) {

                var allData = JSON.parse(body)
                
                var conversionRatio;

                // find price of BTC and ETC
                for (var i = 0; i < allData.length; i++){
                    // if(BTC === BTC)
                    if (coin1 === allData[i].short){
                        //add to price to object
                        var price1 = allData[i].price
                    }

                    if (coin2 === allData[i].short){
                        var price2 = allData[i].price
                    }

                    conversionRatio = price2/price1
                }//for loop
      
        
                updateBalance(conversionRatio)

            })//$get



            function updateBalance(conversionRatio){

                for (var key in data.dataValues){
                    if (key == coin1.toLowerCase()){
                        data.dataValues[key] = data.dataValues[key] - amount;
                    }
                    if (key == coin2.toLowerCase()){
                        data.dataValues[key] = data.dataValues[key] + amount*conversionRatio;
                    }
                }

                // PUT THIS OBJECT TO THE DB
                console.log(data.dataValues)

            }

            });
        }
    });
};