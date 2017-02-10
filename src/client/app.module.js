angular.module('myApp', ['ui.router'])

	.config(function ($stateProvider) {

		var states = [
			{
				name: 'wallet',
				url: '/',
				component: 'wallet'
			}
		];
		
		states.forEach(function (state) {
			$stateProvider.state(state);
		});
	});