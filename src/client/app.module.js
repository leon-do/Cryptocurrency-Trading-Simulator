angular.module('myApp', ['chart.js', 'ngMaterial', 'ngRoute', 'ngMessages'])

	.controller('LoginController', function ($location, $scope, $http, $httpParamSerializerJQLike) {
		var self = $scope;

		self.login = function (username, password) {
			$http({
				method: 'POST',
				url: '/login',
				data: $httpParamSerializerJQLike({
					username: username,
					password: password
				}),
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			}).then(function (response) {
				if (response.status == 200) { $location.url('/home') }
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
					url: '/new',
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
		controller: ['$scope', '$http', function TransferController($scope, $http) {
			var self = this;

			self.transfer = function (coin1, coin2, amount) {
				console.log(coin1, coin2, amount);
				$http({
					method: 'POST',
					url: '/transfer',
					data: {
						coin1: coin1,
						coin2: coin2,
						amount: amount
					}
				}).then(function (response) {
					// success
					console.log(response);
					$scope.$emit('trade', { message: response.data });
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



	.controller('HomeController', function ($filter, $rootScope, $scope, $http) {

		$rootScope.$on('chart-create', function (event, chart) {
			console.log(chart);
			$rootScope.c = chart;
		});

		Chart.pluginService.register({
			beforeDraw: function (chart) {
				var width = chart.chart.width,
					height = chart.chart.height,
					ctx = chart.chart.ctx;

				ctx.restore();
				var fontSize = (height / 150).toFixed(2);
				ctx.font = fontSize + "em Roboto";
				ctx.textBaseline = "middle";

				var text = $rootScope.score,
					textX = Math.round((width - ctx.measureText(text).width) / 2),
					textY = height / 2;

				ctx.fillText(text, textX, textY);
				ctx.save();
			}
		});

		$rootScope.options = {
			cutoutPercentage: 70
		};

		$rootScope.colors = [
			'#9c27b0',
			'#e91e63',
			'#f44336',
			'#ff5722',
			'#ff9800',
			'#ffc107',
			'#ffeb3b',
			'#cddc39',
			'#009688',
			'#03a9f4',
			'#2196f3',
			'#4caf50',
		];

		$rootScope.$on('trade', function (event, args) {
			var keys = [],
				values = [];
			for (var key in args.message.wallet) {
				keys.push(key);
				values.push(args.message.wallet[key]);
			}
			$rootScope.keys = keys;
			$rootScope.values = values;
			$rootScope.score = $filter('currency')(args.message.score);
			$scope.cryptos = args.message.wallet;
			if ($rootScope.c) { $rootScope.c.update() }
		});

		$http.get('/wallet').then(function (response) {
			console.log(response);
			console.log(response.data.wallet);
			$scope.$emit('trade', { message: response.data });
		}, function (error) {
			console.log(error);
		});
	})

	.config(function ($routeProvider, ChartJsProvider) {
		ChartJsProvider.setOptions({
			responsive: true,
			maintainAspectRatio: false,
			tooltips: {
				titleFontFamily: 'Roboto',
				bodyFontFamily: 'Roboto',
				footerFontFamily: 'Roboto'
			}
		});
		$routeProvider
			.when('/', {
				redirectTo: '/home'
			})
			.when('/login', {
				templateUrl: './login/login.template.html',
				controller: 'LoginController'
			})
			.when('/login/new', {
				templateUrl: './login/newUser.template.html',
				controller: 'LoginController'
			})
			.when('/home', {
				templateUrl: './home/home.template.html',
				controller: 'HomeController'
			})
			.otherwise('/')
	})

	.run(function ($rootScope, $location) {
		$rootScope.$on('$locationChangeSuccess', function (event, newUrl) {
			console.log(newUrl);
			if (newUrl.match(/\/#\/home/g)) {$rootScope.loc = true}
			else {$rootScope.loc = false}
		});
	});