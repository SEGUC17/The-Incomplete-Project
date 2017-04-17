var myApp = angular.module('myApp', []);

myApp.controller('homeController', function($scope, $http){
  $scope.businesspageView = "businessPagesList.html";
    $http.get("http://localhost:8080/visitor/popularBusinessPages").then(function(collection){
    $scope.popularBusinessPagesResult = collection.data.popularBusinessPagesResult;
    $scope.popularBusinessPagesResult  == JSON.stringify($scope.popularBusinessPagesResult);
   });

  $scope.searchClick = function () {
    $http.post("http://localhost:8080/visitor/searchBusinessPages", {searchWord : $scope.searchWord} ).then(function(collection){
    $scope.businessPagesResult = collection.data.businessPagesResult;
    $scope.businessPages  == JSON.stringify($scope.businessPagesResult);
    console.log($scope.businessPagesResult);
   });
    console.log($scope);
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
  //   $scope.businessPages = businessPages;
   console.log($scope);


});
