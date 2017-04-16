angular.module('myApp', []).controller('editBusinessPage', function($scope,$http) {

    $http.get("http://localhost:8080/owner/editBusinessPage.json").then(function(response){
      $scope.name = response.data.businessPage.name;
      $scope.description = response.data.businessPage.description;
      $scope.phoneNumber = response.data.businessPage.phoneNumber;
      $scope.addresses = response.data.businessPage.addresses;
    });
});
