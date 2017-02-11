const coinArr = ['USD', 'BTC', 'ETH', 'XRP', 'LTC', 'XMR', 'ETC', 'DASH', 'MAID', 'DOGE', 'ZEC', 'LSK'];
const cryptos = [];
coinArr.forEach(function (el) {
	cryptos.push({
		name: el,
		balance: (Math.random() * 2) * (Math.floor(Math.random() * 2))
	});
});

module.exports = { "cryptos": cryptos};