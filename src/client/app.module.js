angular.module('myApp', ['chart.js', 'ngMaterial', 'ngRoute', 'ngMessages', 'btford.socket-io'])

	.factory('mySocket', function (socketFactory) {
		var coinSocket = io.connect('http://socket.coincap.io');
		mySocket = socketFactory({
			ioSocket: coinSocket
		});
		return mySocket;
	})

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
		controller: ['$rootScope', '$scope', function WalletController($rootScope, $scope) {
			var self = this;
			$scope.colors = $rootScope.colors;
		}],
		bindings: {
			coins: '<'
		}
	})

	.component('coinTable', {
		templateUrl: './home/table.template.html',
		controller: ['$scope', 'mySocket', function CoinTableController($scope, mySocket) {
			var self = this;
			self.$onChanges = function (changesObj) {
				if (changesObj.coins) {
					var coins = changesObj.coins.currentValue || changesObj.coins.previousValue;
					console.log(coins);
                    var coinArray = {
                        BTC: {col1 : "BTC",  col2 : "---", col3 : "---", col4 : "---", col5 : "---", col6 : "---"},
                        ETH: {col1 : "ETH",  col2 : "---", col3 : "---", col4 : "---", col5 : "---", col6 : "---"},
                        XRP: {col1 : "XRP",  col2 : "---", col3 : "---", col4 : "---", col5 : "---", col6 : "---"},
                        LTC: {col1 : "LTC",  col2 : "---", col3 : "---", col4 : "---", col5 : "---", col6 : "---"},
                        XMR: {col1 : "XMR",  col2 : "---", col3 : "---", col4 : "---", col5 : "---", col6 : "---"},
                        ETC: {col1 : "ETC",  col2 : "---", col3 : "---", col4 : "---", col5 : "---", col6 : "---"},
                        MAID: {col1 : "MAID", col2 : "---", col3 : "---", col4 : "---", col5 : "---", col6 : "---"},
                        DASH: {col1 : "DASH", col2 : "---", col3 : "---", col4 : "---", col5 : "---", col6 : "---"},
                        DOGE: {col1 : "DOGE", col2 : "---", col3 : "---", col4 : "---", col5 : "---", col6 : "---"},
                        ZEC: {col1 : "ZEC",  col2 : "---", col3 : "---", col4 : "---", col5 : "---", col6 : "---"},
                        LSK: {col1 : "LSK",  col2 : "---", col3 : "---", col4 : "---", col5 : "---", col6 : "---"}
                    };

					mySocket.on('trades', function (tradeMsg) {
						console.log(tradeMsg);
                        mySocket.on('trades', function (tradeMsg) {
                            console.log(tradeMsg);

                            coinArray[tradeMsg.message.coin].col2 = tradeMsg.message.msg.perc;
                            coinArray[tradeMsg.message.coin].col3 = tradeMsg.message.msg.price;
                            coinArray[tradeMsg.message.coin].col4 = tradeMsg.message.msg.mktcap;
                            coinArray[tradeMsg.message.coin].col5 = tradeMsg.message.msg.volume;
                            coinArray[tradeMsg.message.coin].col6 = tradeMsg.message.msg.supply;

                            $scope.coinTable = coinArray


                        });
					});
				}
			};
		}],
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
					textY = (height / 2) - 10;



				ctx.fillText(text, textX, textY);
				ctx.save();
				ctx.font = '300 20px Roboto';
				var t2 = 'Total Value',
					t2X = Math.round((width - ctx.measureText(text).width) / 2),
					t2Y = textY + 30;
				ctx.fillText(t2, t2X, t2Y);
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