angular.module('myApp', []).controller('placeBook2View', function($scope,$http) {
  $http.get('http://localhost:8080/booking/placeBook2View.json').then(function(response){
    $scope.openingTimes = response.data.openingTimes;
  });
});
