angular.module('myApp')
	.controller('List2Controller', ['$scope', '$http', function ($scope, $http) {

		$scope.selected = { name: '' };

		$http.get('http://localhost:8000/wallet').then(function (response) {
			$scope.cryptos = response.data.cryptos.filter(function (el) {
				return el.name;
			});
		}, function (error) {
			console.log(error);
		});
	}]);