angular.module('myApp', []).controller('viewBusinessPage', function($scope,$http) {

    $http.get("http://localhost:8080/actor.json").then(function(response){
      $scope.actor = response.data.actor;
      if($scope.actor=='owner'){
        $http.get("http://localhost:8080/owner/ownerViewsBusinessPage.json").then(function(response){
          $scope.name = response.data.businessPage.name;
          $scope.description = response.data.businessPage.description;
          $scope.phoneNumber = response.data.businessPage.phoneNumber;
          $scope.addresses = response.data.businessPage.addresses;
          $scope.profileImg = response.data.businessPage.profileImg;
          $scope.images = response.data.businessPage.images;
          $scope.events = response.data.events;
        });
      }
      else{
        $http.get("http://localhost:8080/viewsBusinessPage.json").then(function(response){
          $scope.name = response.data.businessPage.name;
          $scope.description = response.data.businessPage.description;
          $scope.phoneNumber = response.data.businessPage.phoneNumber;
          $scope.addresses = response.data.businessPage.addresses;
          $scope.profileImg = response.data.businessPage.profileImg;
          $scope.images = response.data.businessPage.images;
          $scope.events = response.data.events;
        });
      }
    });


});
