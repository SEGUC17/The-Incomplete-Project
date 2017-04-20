angular.module('myApp', []).controller('placeBook2View', function($scope,$http) {
  // alert("alskdjf");
  $http.get('http://localhost:8080/booking/placeBook2View.json').then(function(response){
    // alert(response.data.toSource());
    $scope.openingTimes = response.data.openingTimes;
  });
  // alert("alskdjf");
});
