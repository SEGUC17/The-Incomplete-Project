/**
 * Star rating class
 * @constructor
 */
function StarRating() {
  this.init();
};

/**
 * Initialize
 */
StarRating.prototype.init = function() {
  this.stars = document.querySelectorAll('#rating span');
  for (var i = 0; i < this.stars.length; i++) {
    this.stars[i].setAttribute('data-count', i);
    this.stars[i].addEventListener('mouseenter', this.enterStarListener.bind(this));
  }
  document.querySelector('#rating').addEventListener('mouseleave', this.leaveStarListener.bind(this));
};

/**
 * This method is fired when a user hovers over a single star
 * @param e
 */
StarRating.prototype.enterStarListener = function(e) {
  this.fillStarsUpToElement(e.target);
};

/**
 * This method is fired when the user leaves the #rating element, effectively removing all hover states.
 */
StarRating.prototype.leaveStarListener = function() {
  this.fillStarsUpToElement(null);
};

/**
 * Fill the star ratings up to a specific position.
 * @param el
 */
StarRating.prototype.fillStarsUpToElement = function(el) {
  // Remove all hover states:
  for (var i = 0; i < this.stars.length; i++) {
    if (el == null || this.stars[i].getAttribute('data-count') > el.getAttribute('data-count')) {
      this.stars[i].classList.remove('hover');
    } else {
      this.stars[i].classList.add('hover');
    }
  }
};

// Run:
new StarRating();


angular.module('myApp', []).controller('viewBusinessPage', function($scope,$http) {

    $scope.r = function(value) {

        $http({
            url: '/businessPage/rate',
            method: "POST",
            data: {rating : value, name: $scope.name, username: $scope.username}
        })
        .then(function(response) {

            $scope.yourRating = value;
            alert("you gave this page " + value + " stars");
            location.reload();

        },
        function(response) { // optional
            alert(response.error);
        });
        // $scope.rating = value;

    }

    $scope.rateEvent = function(value, eventID) {
        $http({
            url: '/businessPage/event/rate',
            method: "POST",
            data: {rating : value, name: $scope.name, username: $scope.username, eventID: eventID}
        })
        .then(function(response) {
            $scope.yourEventRating = value;
            alert("you gave this event " + value + " stars");
            location.reload();

        },
        function(response) { // optional
            alert(response.error);
        });
        // $scope.rating = value;
    }

    $scope.rateContains = function(usernames, username) {
        for (var i = 0; i < usernames.length; i++) {
            if (usernames[i] === username) {
                return true;
            }
        }
        return false;
    }

    $scope.showEventRate = function(usernames) {

        for (var i = 0; i < usernames.length; i++) {
            if (usernames[i] === $scope.username) {
                return true;
            }
        }

        return false;

    }


    // function sendData($scope) {
    //     $http({
    //         url: 'request-url',
    //         method: "POST",
    //         data: { 'message' : message }
    //     })
    //     .then(function(response) {
    //             // success
    //     },
    //     function(response) { // optional
    //             // failed
    //     });
    // }

    $http.get("http://localhost:8080/actor.json").then(function(response1){
      $scope.actor = response1.data.actor;
      if($scope.actor=='owner'){
        $http.get("http://localhost:8080/owner/ownerViewsBusinessPage.json").then(function(response){
          $scope.name = response.data.businessPage.name;
          $scope.description = response.data.businessPage.description;
          $scope.phoneNumber = response.data.businessPage.phoneNumber;
          $scope.addresses = response.data.businessPage.addresses;
          $scope.profileImg = response.data.businessPage.profileImg;
          $scope.images = response.data.businessPage.images;
          $scope.events = response.data.events;
        });
      }
      else{
        $http.get("http://localhost:8080/viewsBusinessPage.json").then(function(response){
        //   alert(response.data.toSource());
          $scope.name = response.data.businessPage.name;
          $scope.description = response.data.businessPage.description;
          $scope.phoneNumber = response.data.businessPage.phoneNumber;
          $scope.addresses = response.data.businessPage.addresses;
          $scope.profileImg = response.data.businessPage.profileImg;
          $scope.images = response.data.businessPage.images;
          $scope.events = response.data.events;

          $scope.rate = response.data.businessPage.rate.value;

          $scope.username = response.data.username;
          $scope.usernames = response.data.businessPage.rate.usernames;
          $scope.showRate = !$scope.rateContains($scope.usernames, $scope.username)
        //   $scope.eventRate = !$scope.showEventRate($scope.usernames, $scope.username)

        });
        // alert("AJSDF");
      }
    });


});
