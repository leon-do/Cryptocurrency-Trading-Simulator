	/*
		list of all coins
			http://www.coincap.io/coins
		
		overview for all crypto
			http://www.coincap.io/front
		
		detail data for bitcoin
			http://www.coincap.io/page/BTC 
		*/



		// //when user clicks transfer
		// $('.btn').on('click',function(){
		// 	var coinName1 = $('input[name=group1]:checked').data('name')
		// 	var coinName2 = $('input[name=group2]:checked').data('name')
		// 	console.log(coinName1) //example: BTC
		// 	console.log(coinName2) //example: ETC
        //
		// 	if (coinName1 === undefined || coinName2 === undefined){
		// 		alert("Select Coins")
		// 	} else {
		// 		//building an object and pass it through callAPI
		// 		var crypto1 = {name:coinName1}
		// 		var crypto2 = {name:coinName2}
        //
		// 		callAPI(crypto1, crypto2)
		// 	}
        //
        //
		// })

		//when user clicks transfer
		$('.btn').on('click',function(){
			var coinName1 = $('input[name=group1]:checked').data('name')
			var coinName2 = $('input[name=group2]:checked').data('name')
			var transferAmount = parseFloat($('.transferAmount').val());
			console.log(transferAmount)
			console.log(coinName1) //example: BTC
			console.log(coinName2) //example: ETC

			if (coinName1 === undefined || coinName2 === undefined){
				alert("Select Coins")
			} else {
				//building an object and pass it through callAPI
				var crypto1 = {name:coinName1}
				var crypto2 = {name:coinName2}

				callAPI(crypto1, crypto2, transferAmount)
			}


		})

		function callAPI(crypto1, crypto2, transferAmount){
			$.get('https://www.coincap.io/front').done(function(allData){

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

				cryptoConvert(crypto1, crypto2, transferAmount)

			})//$get
		}//callAPI






		function cryptoConvert(crypto1, crypto2, transferAmount){

			// this 500 will be taken from the database
			var userMoney = (transferAmount * crypto1.price) / (crypto2.price)

			alert(`Converting ${transferAmount} ${crypto1.name} to ${crypto2.name} will give you ${userMoney} of ${crypto2.name}`)
		}





		