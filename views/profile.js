angular.module('myApp', []).controller('profile', function($scope, $http) {

    // alert("aba");

    // var self = this;
    // $scope.myWelcome="first";

    $http.get("http://localhost:8080/registeredUser/Profile.json").then(function(response){
      $scope.firstName = response.data.firstName;
      $scope.lastName = response.data.lastName;
      $scope.username = response.data.username;
      $scope.email = response.data.email;
      $scope.mobileNumber = response.data.mobileNumber;
      $scope.address = response.data.address;
      $scope.gender = response.data.gender;

    });


    // $http.get('/Profile.json', config).then(successCallback, errorCallback);

    alert("aba");
});
