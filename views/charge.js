'use strict';

angular.module('myApp', ['angularPayments'])

	.config(function() {
		window.Stripe.setPublishableKey('pk_test_xquclYSbmBZnHxkNCvqEPbR7');
	})

	.controller('chargeCtrl', function($scope,$http) {
		// Stripe Response Handler
		$scope.stripeCallback = function (code, result) {
			if (result.error) {
				window.alert('It failed! error: ' + result.error.message);

			} else {  //The Stripe Token Is Generated in result.id
				alert(result.id);

		   var chargeObj = JSON.stringify({stripeToken:result.id});

    // Calling Charging method
		$http.post('http://localhost:8080/charge', chargeObj)
	       .success(function(data, status, headers, config) {
					 alert('Success'); })

	       .error(function(data, status, headers, config) {
	         alert("Error");
	    });



			}
		};
	});
