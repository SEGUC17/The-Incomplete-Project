angular.module('myApp', []).controller('ownerProfilePage', function($scope, $http) {


    $http.get("http://localhost:8080/owner/Profile.json").then(function(response){
      $scope.userID = response.data.UserID;
      $scope.firstName = response.data.Profile.firstName;
      $scope.lastName = response.data.Profile.lastName;
      $scope.username = response.data.Profile.username;
      $scope.email = response.data.Profile.email;
      $scope.mobileNumber = response.data.Profile.mobileNumber;
      $scope.address = response.data.Profile.address;
      $scope.gender = response.data.Profile.gender;
      $scope.companyName = response.data.CompanyName;
      $scope.name = response.data.BusinessPage.name;
      $scope.profileImg = response.data.BusinessPage.profileImg;
      $scope.images = response.data.BusinessPage.images;
      $scope.description = response.data.BusinessPage.description;
      $scope.addresses = response.data.BusinessPage.addresses;
      $scope.phoneNumber = response.data.BusinessPage.phoneNumber;
      $scope.events = response.data.BusinessPage.events;
    });

});
