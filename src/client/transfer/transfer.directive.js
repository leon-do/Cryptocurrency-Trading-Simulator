angular.module('myApp')
	.directive('transfer', function () {
		return {
			templateUrl: './transfer.template.html',

			scope: {
				cryptos: '=',
				selectedCrypto: '=',
				selectedCryptos: '='
			},

			controller: function ($scope) {
				$scope.isDisabled = function (crypto) {
					return $scope.selectedCryptos.indexOf(crypto) > -1 &&
							crypto !== $scope.selectedCrypto;
				}
			}
		}
	});