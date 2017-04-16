var myApp = angular.module('myApp', []);

myApp.controller('homeController', function($scope, $http){
  $scope.businesspageView = "businessPagesList.html";

  $scope.searchClick = function () {
    $http.post("http://localhost:8080/visitor/searchBusinessPages.json", {"searchWord" : $scope.searchWord} ).then(function(response){
      $scope.businessPagesResult = response.data.businessPagesResult;
    });
    console.log($scope.businessPagesResult);
  }

   console.log($scope);


});
