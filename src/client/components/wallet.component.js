/**
 * Defines a 'wallet' component for our Angular module 'myApp'
 */
angular.module('myApp').component('wallet', {

	// Path to template file
	templateUrl: 'wallet.template.html',

	// Temporary controller function to display mock data inside data.json.
	// This will call to our server to retrieve wallet info from database.
	controller: function ($http) {
		$http.get('data.json').then(function (resp) {
			console.log(resp);
			this.cryptos = resp.data;
		});
	}
});