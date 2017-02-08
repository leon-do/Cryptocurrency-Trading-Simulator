	/*
		list of all coins
			http://www.coincap.io/coins
		
		overview for all crypto
			http://www.coincap.io/front
		
		detail data for bitcoin
			http://www.coincap.io/page/BTC 
		*/

		//enables dropdown/select option
		  $(document).ready(function() {
		    $('select').material_select();
		  });


		//when user clicks transfer
		$('.btn').on('click',function(){
			var coinName1 = $("#dropdown1 :selected").val()
			var coinName2 = $("#dropdown2 :selected").val()
			var transferAmount = $('.transferAmount').val();
			console.log(coinName1) //example: BTC
			console.log(coinName2) //example: ETC
			console.log(transferAmount)

			if (coinName1 === "" || coinName2 === ""){
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





		