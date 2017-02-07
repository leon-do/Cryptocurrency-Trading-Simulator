// this file is used to dynamically build the website

var coinArray = ['USD', 'BTC', 'ETC', 'XMR', 'ETH', 'DASH', 'LTC', 'ZEC', 'NXT', 'XRP', 'REP', 'STR']

//radio buttons
for (var i = 0; i < coinArray.length; i++){

	//radio button column 1
	$('.form1').append(` 
	    <p>
	      <input name="group1" type="radio" id="${coinArray[i]}1" data-name="${coinArray[i]}" />
	      <label for="${coinArray[i]}1">${coinArray[i]}</label>
	    </p>
	`)

	//radio button column 2
	$('.form2').append(` 
	    <p>
	      <input name="group2" type="radio" id="${coinArray[i]}2" data-name="${coinArray[i]}" />
	      <label for="${coinArray[i]}2">${coinArray[i]}</label>
	    </p>
	`)
}

