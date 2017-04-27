angular.module('myApp', []).controller('editBusinessPage', function($scope,$http) {

    $http.get("http://localhost:8080/owner/editBusinessPage.json").then(function(response){
      $scope.name = response.data.name;
      $scope.description = response.data.description;
      $scope.phoneNumbers = response.data.phoneNumber;
      $scope.addresses = response.data.addresses;
    });

    $scope.choices = [];

    $scope.addNewChoice = function() {
      let newItemNo = $scope.choices.length+1;
      $scope.choices.push({'id':'choice'+newItemNo});
    };

    $scope.removeChoice = function() {
      let lastItem = $scope.choices.length-1;
      $scope.choices.splice(lastItem);
    };

    let btn = document.getElementById('btn');
    btn.onclick = function() {

      let profilePic = document.getElementById("profilePic");
      let bool = new Array($scope.choices.length+1);
      let exist = false;

      for (let i = 0; i < $scope.choices.length+1; i++) {
        bool[i] = false;
      }

      alert($scope.choices.length);
      for (let i = 0; i < $scope.choices.length; i++) {
        let id = "choice"+(i+1);
        let img = document.getElementById(id);
        if(img.files[0]){
          let Extension = img.files[0].name.split('.')[1];
          if (Extension == "gif" || Extension == "png" || Extension == "bmp" ||
              Extension == "jpeg" || Extension == "jpg") {
                exist = true;

              let file = img.files[0];
              let fr = new FileReader();
              fr.readAsDataURL(file);
              fr.onload = function() {
                  let data = fr.result;
                  let avatar_input = document.createElement("input");
                  avatar_input.style.visibility='hidden';
                  avatar_input.setAttribute("type", "text");
                  avatar_input.setAttribute("name", "images");
                  avatar_input.setAttribute("value", data);
                  form.appendChild(avatar_input);

                  bool[i] = true;
                  alert(bool[i]);
                  alert(i);
                  let andRes = true;

                  for (let j = 0; j < $scope.choices.length; j++){
                    alert(bool[j]);
                    alert(j);
                    andRes = andRes&&bool[j];
                  };
                  if(andRes&&(!profilePic.files||!profilePic.files[0])){
                    form.submit();
                  }
              }
          }
        }
      }


      if (profilePic.files[0]) {
        let Extension = profilePic.files[0].name.split('.')[1];
        if (Extension == "gif" || Extension == "png" || Extension == "bmp" ||
            Extension == "jpeg" || Extension == "jpg") {
              exist = true;
            let file = profilePic.files[0];
            let fr = new FileReader();
            fr.readAsDataURL(file);
            fr.onload = function() {
                let data = fr.result;
                let avatar_input = document.createElement("input");
                avatar_input.style.visibility='hidden';
                avatar_input.setAttribute("type", "text");
                avatar_input.setAttribute("name", "profileImg");
                avatar_input.setAttribute("value", data);
                form.appendChild(avatar_input);
                bool[$scope.choices.length] = true;
                let andRes = true;

                for (let i = 0; i < $scope.choices.length+1; i++)
                  andRes = andRes&&bool[i]

                if(andRes){
                  form.submit();
                }
            }
        }else {
                alert("Photo only allows file types of GIF, PNG, JPG, JPEG and BMP. ");
        }
      }
      else{
        bool[$scope.choices.length] = true;
      }

      if(!exist){
        form.submit();
      }
    }


});
