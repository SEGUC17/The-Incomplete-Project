angular.module('myApp', []).controller('editPlace', function($scope,$http) {
  let btn = document.getElementById('btn');
  btn.onclick = function() {

    let image = document.getElementById("image");
    if (image.files[0]) {
      let Extension = image.files[0].name.split('.')[1];
      if (Extension == "gif" || Extension == "png" || Extension == "bmp" ||
          Extension == "jpeg" || Extension == "jpg") {
          let file = image.files[0];
          let fr = new FileReader();
          fr.readAsDataURL(file);

          fr.onload = function() {
              let data = fr.result;
              let avatar_input = document.createElement("input");
              avatar_input.style.visibility='hidden';
              avatar_input.setAttribute("type", "text");
              avatar_input.setAttribute("name", "image");
              avatar_input.setAttribute("value", data);
              form.appendChild(avatar_input);
              form.submit();
          }
      }else {
              alert("Photo only allows file types of GIF, PNG, JPG, JPEG and BMP. ");
      }
    }else{
      form.submit();
    }
  }

  $http.get("http://localhost:8080/owner/editPlace.json").then(function(response){
    $scope.event = response.data.event;
    $scope.place = response.data.place;
  });
  $scope.choices = [];

  $scope.addNewChoice = function() {
    var newItemNo = $scope.choices.length+1;
    $scope.choices.push({'id':'choice'+newItemNo,'name':"openingTimes"});
  };

  $scope.removeChoice = function() {
    var lastItem = $scope.choices.length-1;
    $scope.choices.splice(lastItem);
  };

});
