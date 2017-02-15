angular.module('myApp', ['ngMaterial', 'ngRoute', 'ngMessages'])

	.controller('LoginController', function ($location, $scope, $http, $httpParamSerializerJQLike) {
		var self = $scope;

		self.login = function (username, password) {
			$http({
				method: 'POST',
				url: 'http://localhost:8000/login',
				data: $httpParamSerializerJQLike({
					username: username,
					password: password
				}),
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			}).then(function (response) {
				if (response.status == 200) { $location.url('/'+response.data.userId+'/'+response.data.username+'/home') }
				else { console.log('error', response) }
			});
		};

		self.newUser = function (username, password, confirm) {
			if (password.length <= 5) {
				alert('Password must be longer than 5 characters.');
			}
			else if (password != confirm ) {
				alert('Passwords don\'t match.');
			}
			else {
				$http({
					method: 'POST',
					url: 'http://localhost:8000/new',
					data: $httpParamSerializerJQLike({
						username: username,
						password: password
					}),
					headers: {'Content-Type': 'application/x-www-form-urlencoded'}
				}).then(function (response) {
					if (response.status == 200) { $location.url('/home') }
					else { alert('error', response) }
				});
			}
		};
	})

	.component('transferForm', {
		templateUrl: './home/transfer.template.html',
		controller: ['$rootScope', '$http', function TransferController($rootScope, $http) {
			var self = this;
			var userId = $rootScope.curruserid;

			self.transfer = function (coin1, coin2, amount) {
				console.log(coin1, coin2, amount);
				$http({
					method: 'POST',
					url: 'http://localhost:8000/'+userId+'/transfer',
					data: {
						coin1: coin1,
						coin2: coin2,
						amount: amount
					}
				}).then(function (response) {
					// success
					console.log(response);
					self.coins = response.data.wallet;
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

	.component('userWallet', {
		templateUrl: './home/wallet.template.html',
		bindings: {
			coins: '<'
		}
	})

	.controller('HomeController', function ($rootScope, $scope, $http) {
		// 'user' should be the authenticated user's username for production
		var url = 'http://localhost:8000/wallet/' + $rootScope.curruserid;
		$http.get(url).then(function (response) {
			console.log(response);
			$scope.cryptos = response.data.wallet;
		}, function (error) {
			console.log(error);
		});
	})

	.config(function ($routeProvider) {
		$routeProvider
			.when('/login', {
				templateUrl: './login/login.template.html',
				controller: 'LoginController'
			})
			.when('/login/new', {
				templateUrl: './login/newUser.template.html',
				controller: 'LoginController'
			})
			.when('/:username/home', {
				templateUrl: './home/home.template.html',
				controller: 'HomeController'
			})
			.when('/:userId/:username/home', {
				redirectTo: function (routeParams, path, search) {
					return '/' + routeParams.username + '/home';
				}
			});
	})

	.run(function ($rootScope) {
		$rootScope.$on('$routeChangeSuccess', function (currentRoute, previousRoute) {
			if (previousRoute.$$route.originalPath == "/:userId/:username/home") {
				console.log('inner', previousRoute);
				$rootScope.curruserid = previousRoute.params.userId;
				$rootScope.currusername = previousRoute.params.username;
			}
			console.log('route', previousRoute);
		});
	});