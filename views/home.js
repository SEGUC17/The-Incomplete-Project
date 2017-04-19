var myApp = angular.module('myApp', []);

myApp.controller('homeController', function($scope, $http, $timeout, $interval, $window){
    $http.get("http://localhost:8080/visitor/popularBusinessPages").then(function(collection){
    $scope.popularBusinessPagesResult = collection.data.popularBusinessPagesResult;
    $scope.popularBusinessPagesResult  == JSON.stringify($scope.popularBusinessPagesResult);
    console.log($scope.popularBusinessPagesResult);
    var popularBusinessPages = $scope.popularBusinessPagesResult ;
    $scope.popularBusinessPages = popularBusinessPages;
   });
  $scope.searchClick = function () {
    $http.post("http://localhost:8080/visitor/searchBusinessPages", {searchWord : $scope.searchWord} ).then(function(collection){
    $scope.searchBusinessPagesResult = collection.data.searchBusinessPagesResult;
    $scope.searchBusinessPagesResult  == JSON.stringify($scope.searchBusinessPagesResult);
    console.log($scope.searchBusinessPagesResult);
   });
   var searchBusinessPages = $scope.searchBusinessPagesResult ;
   $scope.searchBusinessPages = searchBusinessPages;
   $scope.pressed = true;
  };
  $scope.refreshClick = function () { $window.location.reload(); };
});
