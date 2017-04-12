angular.module('myApp', []).controller('profile', function($scope) {
    // $scope.names = [
    //     {name:'Jani',country:'Norway'},
    //     {name:'Hege',country:'Sweden'},
    //     {name:'Kai',country:'Denmark'}
    // ];
    alert("a7a");

    var self = this;
    $scope.myWelcome="5ara";

    $http.get("https://jsonplaceholder.typicode.com/posts").then(function(response){
      alert("asdkfjlasd");
      self.myWelcome = response.data;
    });


    // $http.get('/Profile.json', config).then(successCallback, errorCallback);

    alert("aba");
});
