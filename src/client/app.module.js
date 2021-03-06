angular.module('myApp', ['chart.js', 'ngMaterial', 'ngAnimate', 'ngRoute', 'ngMessages', 'btford.socket-io'])

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
			coins: '<',
			score: '<'
		}
	})

	.directive('animateOnChange', function($animate,$timeout) {
		return function(scope, elem, attr) {
			scope.$watch(attr.animateOnChange, function(nv,ov) {
				if (nv!=ov) {
					var c = nv > ov?'change-up':'change';
					$animate.addClass(elem,c).then(function() {
						$timeout(function() {$animate.removeClass(elem,c)});
					});
				}
			})
		}
	})

	.component('coinTable', {
		templateUrl: './home/table.template.html',
		controller: ['$http', '$filter', '$scope', 'mySocket', function CoinTableController($http, $filter, $scope, mySocket) {
			var self = this;
			$scope.rowData = {};
			$http.get('http://coincap.io/front').then(function (response) {
				console.log(response.data);
				for (var i = 0; i < response.data.length; i++) {
					if (response.data[i].short in self.coins) {
						var msg = response.data[i];
						$scope.rowData[msg.short.toString()] = {
							name: msg.long + ' ' + msg.short,
							mktcap: $filter('currency')(msg.mktcap, '$', 0),
							price: $filter('currency')(msg.price, '$', 8),
							supply: $filter('number')(msg.supply, 0),
							volume: $filter('currency')(msg.volume, '$', 0),
							percent: $filter('number')(msg.cap24hrChange).toString() + '%'
						};
					}
					if ((self.coins.length - 1) == Object.keys($scope.rowData).length) {console.log($scope.rowData); break;}
				}

				mySocket.on('trades', function (tradeMsg) {
					if (tradeMsg.message.msg.short in self.coins) {
						var msg = tradeMsg.message.msg;

						$scope.rowData[msg.short] = {
							name: msg.long + ' ' + msg.short,
							mktcap: $filter('currency')(msg.mktcap, '$', 0),
							price: $filter('currency')(msg.price, '$', 8),
							supply: $filter('number')(msg.supply, 0),
							volume: $filter('currency')(msg.volume, '$', 0),
							percent: $filter('number')(msg.cap24hrChange).toString() + '%'
						};
					}
				});
			});
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

				var text = $rootScope.total,
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

		$rootScope.colors = [];
		/*var colors = [
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
		];*/

		var colors = {
			LSK: '#9c27b0',
			ZEC: '#e91e63',
			DOGE: '#f44336',
			MAID: '#ff5722',
			DASH: '#ff9800',
			ETC: '#ffc107',
			XMR: '#ffeb3b',
			LTC: '#cddc39',
			XRP: '#009688',
			ETH: '#03a9f4',
			BTC: '#2196f3',
			USD: '#4caf50',
		};


		$rootScope.$on('trade', function (event, args) {
			$rootScope.score = args.message.score;
			console.log('pre-score:', $rootScope.score);
			var keys = [],
				values = [];
			for (var key in args.message.wallet) {
				if (key in $rootScope.score.all) {
					keys.push(key);
					values.push($rootScope.score.all[key].valueUSD);
					$rootScope.colors.push(colors[key]);
				}
			}

			for (var k in $rootScope.score.all) {
				var percentage = $rootScope.score.all[k].valueUSD / $rootScope.score.total;
				$rootScope.score.all[k].percentOfTotalScore = $filter('number')((percentage * 100), 2).toString() + '%';
			}
			console.log('post-score:', $rootScope.score);
			$rootScope.keys = keys;
			$rootScope.values = values;
			$rootScope.total = $filter('currency')(args.message.score.total);
			$scope.cryptos = args.message.wallet;
			$scope.score = $rootScope.score;
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
				redirectTo: '/splash'
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
            .when('/splash', {
                templateUrl: './home/splash.template.html'
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
