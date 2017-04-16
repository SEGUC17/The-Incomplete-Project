angular.module('myApp', []).controller('viewBusinessPage', function($scope,$http) {
    $http.get("http://localhost:8080/owner/ownerViewsBusinessPage.json").then(function(response){
      $scope.name = response.data.businessPage.name;
      $scope.description = response.data.businessPage.description;
      $scope.phoneNumber = response.data.businessPage.phoneNumber;
      $scope.addresses = response.data.businessPage.addresses;
      $scope.events = response.data.events;
      $scope.actor = response.data.actor;
    });

});
