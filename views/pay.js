'use strict';


angular.module('myApp', ['angularPayments'])

	.config(function() {
		window.Stripe.setPublishableKey('pk_test_xquclYSbmBZnHxkNCvqEPbR7');
	})

	.controller('payCtrl', function($scope,$http) {
		// Stripe Response Handler
		$scope.stripeCallback = function (code, result) {
			if (result.error) {
				window.alert('It failed! error: ' + result.error.message);

			} else {  //The Stripe Token Is Generated in result.id

				//chargeObj for grouping parameters for charge method
		var chargeObj = JSON.stringify({stripeToken:result.id, email:req.session.email, price:$scope.event.event.price});

    // Calling Charging method
		$http.post('/routes/booking/charge', chargeObj)
	       .success(function(data, status, headers, config) {

				// If Success check if place update the Place database else Trip database
				 if(event.event.isPlace){
				 var parameter = JSON.stringify({userid:req.session.userId, placeID:event.place._id, time:$scope.openingTimes});
				 $http.post('/routes/booking/placePay',parameter);
			   }

					else {
					var parameter = JSON.stringify({userid:req.session.userId, tripID:event.trip._id});
					$http.post('/routes/booking/tripPay',parameter);
				}

				})
				//If Error alert ERROR
	    .error(function(data, status, headers, config) {
	      alert("Error");
	    });



			}
		};
	});
