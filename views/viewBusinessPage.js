angular.module('myApp', []).controller('viewBusinessPage', function($scope, $http) {

    $http.get("http://localhost:8080/visitor/viewBusinessPage.json").then(function(response){
      $scope.data = response.data;
    });

    $scope.name = $scope.data.name;
    $scope.description = $scope.data.description;
    $scope.phoneNumber = $scope.data.phoneNumber;
    // $scope.phoneNumber = ["123","456"]
    // $scope.description = "hey2"
    // alert("hey");
    // $scope.profileImg = "http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/sign-check-icon.png"
    //
    // if($scope.event.mustPay){
    //   $scope.event.payMsg = "it must be paid for"
    // }else {
    //   $scope.event.payMsg = "you don't have to pay now"
    // }
    //
    // if($scope.event.mustPay){
    //   $scope.event.repeatsMsg = "it must be paid for"
    // }else {
    //   $scope.event.repeatsMsg = "you don't have to pay now"
    // }

    // alert("hey");
});
