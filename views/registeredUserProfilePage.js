angular.module('myApp', []).controller('registeredUserProfilePage', function($scope, $http) {

    // alert("aba");

    // var self = this;
    // $scope.myWelcome="first";

    $http.get("http://localhost:8080/registeredUser/Profile.json").then(function(response){
      $scope.userID = response.data.UserID;
      $scope.firstName = response.data.Profile.firstName;
      $scope.lastName = response.data.Profile.lastName;
      $scope.username = response.data.Profile.username;
      $scope.password = response.data.Profile.Password;
      $scope.email = response.data.Profile.email;
      $scope.mobileNumber = response.data.Profile.mobileNumber;
      $scope.address = response.data.Profile.address;
      $scope.gender = response.data.Profile.gender;
    });



});
