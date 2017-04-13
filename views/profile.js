angular.module('myApp', []).controller('profile', function($scope, $http) {

    // alert("aba");

    // var self = this;
    // $scope.myWelcome="first";

    $http.get("http://localhost:8080/user/profile.json").then(function(response){
      $scope.myWelcome = response.data;
    });


    // $http.get('/Profile.json', config).then(successCallback, errorCallback);

    alert("aba");
});
