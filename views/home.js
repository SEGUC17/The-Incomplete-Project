var myApp = angular.module('myApp', []);

myApp.controller('homeController', function($scope, $http){
  $scope.businesspageView = "businessPagesList.html";

  // $scope.searchClick = function () {
  //   $http.post("http://localhost:8080/visitor/searchBusinessPages.json", {"searchWord" : $scope.searchWord} ).then(function(response){
  //     $scope.businessPagesResult = response.data.businessPagesResult;
  //   });
  //   console.log($scope.businessPagesResult);
  // }

  var businessPages= [
    {
    "name" : "Page1",
    "description" : "gamed gamed ",
    "phoneNumber" : "01021093032918",
} ,{
  "name" : "Page2",
  "description" : "allah allah",
  "phoneNumber" : "01021093032918",
}
  ]
  $scope.businessPages = businessPages;
   console.log($scope);


});
