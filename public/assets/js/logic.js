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
	if (coinName1 === "" || coinName2 === ""){
		alert("Select Coins")
	}else if (coinName1 === coinName2){
		alert("Select Different Coins")
	}else if (transferAmount === ""){
		alert("Enter Amount")
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

		crypto1.balance = transferAmount;
		crypto2.balance = transferAmount * rate;

		alert(`user now has ${crypto1.name} : ${crypto1.balance}  and  ${crypto2.name} : ${crypto2.balance}`)

		//send this to the server
		console.log(crypto1)
		console.log(crypto2)

	})//$get
}//callAPI




/*

		function callAPI(crypto1, crypto2){
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

				cryptoConvert(crypto1, crypto2)

			})//$get
		}//callAPI







