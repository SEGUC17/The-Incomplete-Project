angular.module('paybook',[])

  .controller('bookCtrl',function($scope,$http){

    $scope.book = function(){

    if(event.event.isPlace){
    var parameter = JSON.stringify({userid:req.session.userId, placeID:event.place._id, time:$scope.openingTimes});
    $http.post('/booking/placeBook2',parameter);
  }
  else {
    var parameter = JSON.stringify({userid:req.session.userId, tripID:event.trip._id});
    $http.post('/booking/tripBook2',parameter);
            }

    };

  });
