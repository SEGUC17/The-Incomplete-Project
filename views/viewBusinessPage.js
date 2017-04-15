angular.module('myApp', []).controller('viewBusinessPage', function($scope) {
    $scope.phoneNumber = ["123","456"]
    $scope.name = "hey"
    $scope.description = "hey2"
    $scope.profileImg = "http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/sign-check-icon.png"

    if($scope.event.mustPay){
      $scope.event.payMsg = "it must be paid for"
    }else {
      $scope.event.payMsg = "you don't have to pay now"
    }

    if($scope.event.mustPay){
      $scope.event.repeatsMsg = "it must be paid for"
    }else {
      $scope.event.repeatsMsg = "you don't have to pay now"
    }
    // alert("hey");
});
