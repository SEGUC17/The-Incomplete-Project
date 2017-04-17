angular.module('myApp', []).controller('editBusinessPage', function($scope,$http) {
  // alert("start");
    $http.get("http://localhost:8080/owner/editBusinessPage.json").then(function(response){
      // alert(response.data.toSource());
      $scope.name = response.data.name;
      $scope.description = response.data.description;
      $scope.phoneNumbers = response.data.phoneNumber;
      $scope.addresses = response.data.addresses;
      // alert("finish1");
    });
    // alert("finish2");
});
