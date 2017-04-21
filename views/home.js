var myApp = angular.module('myApp', []);

myApp.controller('homeController', function($scope, $http, $timeout, $interval, $window){

  $http.get("http://localhost:8080/actor.json").then(function(response){
    $scope.actor = response.data.actor;
   });
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
    $scope.searchBusinessPages = $scope.searchBusinessPagesResult;
    $scope.pressed = true;
    console.log($scope.searchBusinessPagesResult);
   });
  };
  $scope.refreshClick = function () { $window.location.reload(); };
});
