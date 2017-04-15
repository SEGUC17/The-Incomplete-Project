angular.module('myApp', []).controller('viewBusinessPage', function($scope, $http) {

    $scope.events = "asdfjlasdfj"
    $http.get("http://localhost:8080/visitor/viewBusinessPage.json").then(function(response){
      $scope.name = response.data.businessPage.name;
      $scope.description = response.data.businessPage.description;
      $scope.phoneNumber = response.data.businessPage.phoneNumber;
      $scope.addresses = response.data.businessPage.addresses;
      $scope.events = response.data.events;
      // alert(response.data.events[0].event.price);
      // $scope.images = response.data.images;
    });

    // $scope.phoneNumber = ["123","456"]
    // $scope.description = "hey2"
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
