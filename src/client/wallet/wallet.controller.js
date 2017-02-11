angular.module('myApp')
	.controller('WalletController', ['$scope', '$http', function ($scope, $http) {
		// 'user' should be the authenticated user's username for production
		$http.get('http://localhost:8000/wallet').then(function (response) {
			$scope.cryptos = response.data.cryptos;
		}, function (error) {
			console.log(error);
		});
	}]);