angular.module('myApp', []).controller('addPlace', function($scope) {

  // alert("asdfadsf");
  $scope.choices = [{id: 'choice1','name':"openingTimes"}];

  $scope.addNewChoice = function() {
    var newItemNo = $scope.choices.length+1;
    $scope.choices.push({'id':'choice'+newItemNo,'name':"openingTimes"});
  };

  $scope.removeChoice = function() {
    var lastItem = $scope.choices.length-1;
    $scope.choices.splice(lastItem);
  };

});
