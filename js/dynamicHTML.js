// this file is used to dynamically build the website


//radio buttons
$.get('http://www.coincap.io/coins').done(function(allData){
	for (var i = 0; i < allData.length; i++){

		//radio button column 1
		$('.form1').append(` 
		    <p>
		      <input name="group1" type="radio" id="${allData[i]}1" data-name="${allData[i]}" />
		      <label for="${allData[i]}1">${allData[i]}</label>
		    </p>
		`)

		//radio button column 2
		$('.form2').append(` 
		    <p>
		      <input name="group2" type="radio" id="${allData[i]}2" data-name="${allData[i]}" />
		      <label for="${allData[i]}2">${allData[i]}</label>
		    </p>
		`)
	}
})

