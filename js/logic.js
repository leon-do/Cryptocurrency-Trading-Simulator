	/*
		list of all coins
			http://www.coincap.io/coins
		
		overview for all crypto
			http://www.coincap.io/front
		
		detail data for bitcoin
			http://www.coincap.io/page/BTC 
		*/



		//when user clicks transfer
		$('.btn').on('click',function(){
			var coinName1 = $('input[name=group1]:checked').data('name')
			var coinName2 = $('input[name=group2]:checked').data('name')
			console.log(coinName1) //example: BTC
			console.log(coinName2) //example: ETC

			//building an object and pass it through callAPI
			var crypto1 = {name:coinName1}
			var crypto2 = {name:coinName2}

			callAPI(crypto1, crypto2)
		})



		function callAPI(crypto1, crypto2){
			$.get('http://www.coincap.io/front').done(function(allData){

				// find price of BTC and ETC
				for (var i = 0; i < allData.length; i++){

					// if(BTC === BTC)
					if (allData[i].short === crypto1.name){
						//add to price to object
						crypto1.price = allData[i].price
					}

					if (allData[i].short === crypto2.name){
						crypto2.price = allData[i].price
					}

				}//for loop

				cryptoConvert(crypto1, crypto2)

			})//$get
		}//callAPI






		function cryptoConvert(crypto1, crypto2){
			var userMoney = (500 * crypto1.price) / (crypto2.price)

			alert(`Converting 500 ${crypto1.name} to ${crypto2.name} will give you ${userMoney} of ${crypto2.name}`)
		}