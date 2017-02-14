angular.module('myApp')
	.controller('TransferController', ['$scope', '$http', function ($scope, $http) {
		$http.get('http://localhost:8000/wallet').then(function (response) {
			$scope.cryptos = response.data.cryptos;
		})
	}])