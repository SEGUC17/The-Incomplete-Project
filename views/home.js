var myApp = angular.module('myApp', []);

myApp.controller('homeController', function($scope, $http, $timeout, $interval, $window){
    $scope.popularBusinessPagesList = "popularBusinessPagesList.html";
    $scope.searchBusinessPagesList = "searchBusinessPagesList.html";
    $http.get("http://localhost:8080/visitor/popularBusinessPages").then(function(collection){
    $scope.popularBusinessPagesResult = collection.data.popularBusinessPagesResult;
    $scope.popularBusinessPagesResult  == JSON.stringify($scope.popularBusinessPagesResult);
    console.log($scope.popularBusinessPagesResult);
    var popularBusinessPages = $scope.popularBusinessPagesResult ;
    $scope.popularBusinessPages = popularBusinessPages;
   });

  $scope.searchClick = function () {
    $http.post("http://localhost:8080/visitor/searchBusinessPages", {searchWord : $scope.searchWord} ).then(function(collection){
    $scope.SearchBusinessPagesResult = collection.data.SearchBusinessPagesResult;
    $scope.SearchBusinessPagesResult  == JSON.stringify($scope.SearchBusinessPagesResult);
    console.log($scope.SearchBusinessPagesResult);
   });
   var searchBusinessPagesResults = $scope.searchBusinessPagesResult ;
   $scope.searchBusinessPagesResults = searchBusinessPagesResults;
//   $window.location.reload();

   $scope.pressed = true;
   $scope.searchBusinessPagesList = "searchBusinessPagesList.html";

  };


  // var businessPages= [
  //   {
  //     "name" : "Page1",
  //     "description" : "gamed gamed ",
  //     "phoneNumber" : "01021093032918",
  //   } ,{
  //     "name" : "Page2",
  //     "description" : "allah allah",
  //     "phoneNumber" : "01021093032918",
  //   }
  // ]
   console.log($scope);


});
