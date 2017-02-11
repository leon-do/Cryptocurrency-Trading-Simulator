angular.module('myApp')
	.controller('List1Controller', ['$scope', '$http', function ($scope, $http) {

		$scope.selected = { name: '' };

		$http.get('http://localhost:8000/wallet').then(function (response) {
			console.log(response);
			$scope.cryptos = response.data.cryptos.filter(function (el) {
				if (el.balance > 0) return el.name;
			});
		}, function (error) {
			console.log(error);
		});
	}]);