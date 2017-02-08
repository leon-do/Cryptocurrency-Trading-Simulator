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


			//makes sure user inputfields are all filled out
			if (coinName1 === "" || coinName2 === "" || transferAmount === ""){
				alert("Select Coins")
			} else {
				//building an object and pass it through callAPI
				var crypto1 = {name:coinName1}
				var crypto2 = {name:coinName2}

				callAPI(crypto1, crypto2, transferAmount)
			}


		})

		function callAPI(crypto1, crypto2, transferAmount){

			$.get(`https://shapeshift.io/rate/${crypto1.name}_${crypto2.name}`).done(function(allData){

				var rate = parseFloat(allData.rate)

				crypto1.balance = transferAmount * -1;
				crypto2.balance = transferAmount * rate;

				alert(`user now has ${crypto1.name} : ${crypto1.balance}  and  ${crypto2.name} : ${crypto2.balance}`)

				console.log(crypto1)
				console.log(crypto2)

			})//$get
		}//callAPI











		