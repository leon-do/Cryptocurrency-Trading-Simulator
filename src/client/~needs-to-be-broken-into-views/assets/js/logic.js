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
	$.get('https://www.coincap.io/front').done(function(allData){


		// find price of BTC and ETC
		for (var i = 0; i < allData.length; i++){

			// if(BTC === BTC)
			if (allData[i].short === crypto1.name){
				//add to price to object
				crypto1.price = allData[i].price
			} else if (crypto1.name === "USD") {
				crypto1.price = 1;
			}

			if (allData[i].short === crypto2.name){
				crypto2.price = allData[i].price
			} else if (crypto2.name === "USD") {
				crypto2.price = 1;
			}
		}//for loop


		// crypto1.price = 1000 (means 1 bitcoin = $1000)
		cryptoConvert(crypto1, crypto2, transferAmount)

	})//$get

}//callAPI



function cryptoConvert(crypto1, crypto2, transferAmount){

	var userMoney = (transferAmount * crypto1.price) / (crypto2.price)

	alert(`Converting ${transferAmount} ${crypto1.name} to ${crypto2.name} will give you ${userMoney} of ${crypto2.name}`)

	crypto1.sent = transferAmount;
	crypto2.recieved = userMoney;
	
	send2Server(crypto1, crypto2, transferAmount)
}

function send2Server(crypto1, crypto2, transferAmount){

	$.post('http://localhost:8000/transfer',{
		crypto1: crypto1,
		crypto2: crypto2
	})
}





