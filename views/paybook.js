angular.module('paybook',[])

  .controller('bookCtrl',function($scope,$http){

    $scope.book = function(){

    if(event.event.isPlace){
    var parameter = JSON.stringify({userid:req.session.userId, placeID:event.place._id, time:$scope.openingTimes});
    $http.post('/routes/booking/placeBook2',parameter);
  }
  else {
    var parameter = JSON.stringify({userid:req.session.userId, tripID:event.trip._id});
    $http.post('/routes/booking/tripBook2',parameter);
            }

    };

  });
  //post('/routes/booking/placeBook2',"58ea17c9c46ac425efd894c7","3/2","58eb39ccc6ae8108cbc614c1");
