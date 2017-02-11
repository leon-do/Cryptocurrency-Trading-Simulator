angular.module('myApp', ['ngMaterial', 'ngRoute', 'ngMessages'])

	.config(['$routeProvider', function ($routeProvider) {
		$routeProvider
		.when('/', {
			templateUrl: './wallet/wallet.template.html',
			controller: 'WalletController'
		});
	}]);