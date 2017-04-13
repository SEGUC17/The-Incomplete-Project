var myApp = angular.module('myApp', []);

myApp.controller('homeController', function($scope){
  
  $scope.name = "test";
  console.log($scope);

});
