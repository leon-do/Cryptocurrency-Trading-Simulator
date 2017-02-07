// this file is used to dynamically build the website
var coinArr = ['USD', 'BTC', 'ETH', 'XRP', 'LTC', 'XMR', 'ETC', 'DASH', 'MAID', 'DOGE', 'ZEC', 'LSK'];


//radio buttons

for (let i = 0; i < coinArr.length; i++) {

    //dropdown 1
    $('#dropdown1').append(` 
        
        <li id = '${coinArr[i]}1'>${coinArr[i]}</li>
          
    `)

    //dropdown 2
    $('#dropdown2').append(` 
        
        <li id = '${coinArr[i]}2'>${coinArr[i]}</li>
          
    `)
};



