angular.module('myApp', ['ngMaterial', 'ngRoute', 'ngMessages'])

	.controller('HomeController', function ($scope, $http) {
		// 'user' should be the authenticated user's username for production
		$http.get('http://localhost:8000/wallet').then(function (response) {
			console.log(response);
			$scope.cryptos = response.data.cryptos;
		}, function (error) {
			console.log(error);
		});
	})

	.filter('owned', function () {
		return function (input) {
			input = input || [];
			var output = [];
			for (var i = 0; i < input.length; i++) {
				var obj = input[i];
				if (obj.balance > 0) {
					output.push(obj);
				}
			}
			return output;
		}
	})

	.component('userWallet', {
		templateUrl: './home/wallet.template.html',
		bindings: {
			coins: '<'
		}
	})

	.component('transferForm', {
		templateUrl: './home/transfer.template.html',
		controller: ['$http', function TransferController($http) {
			var self = this;

			self.transfer = function (coin1, coin2, amount) {
				console.log(coin1, coin2, amount);
				$http({
					method: 'POST',
					url: 'http://localhost:8000/api/transfer',
					data: {
						coin1: coin1,
						coin2: coin2,
						amount: amount
					}
				}).then(function (response) {
					// success
					console.log(response);
					self.coins = response.data.cryptos;
				}, function (error) {
					// failure
					console.log(error);
					alert(error.data.reason);
				});
			}
		}],
		bindings: {
			coins: '='
		}
	})

	.config(function ($routeProvider, $locationProvider) {
		$routeProvider
			.when('/', {
				templateUrl: './home/home.template.html',
				controller: 'HomeController'
			});
	});