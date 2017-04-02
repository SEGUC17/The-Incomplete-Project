let RegisteredUser = require('../models/RegisteredUser');
let Profile = require('../models/Profile');


let RegisteredUserController = {

	//B.5
	viewProfile:function(req, res) {
		 let profileId = req.session.data.profile;
        Profile.findOne(profileId, function(err, profile) {
            if(err) {
                res.send(err.message)
                console.log(err);

          }
          else {
                // req.session.data = profilePage;
                // res.render('profilePage', {profilePage});
          }

        });

	} ,


	//B.6
	editProfile:function(req, res) {
		 let body = req.body;
      RegisteredUser.update({_id:session._id},{$set:{firstName:body.firstName,lastName:body.lastName,username:body.username,
        Password:body.Password,email:body.email,mobileNumber:body.mobileNumber,address:body.address,gender:body.gender}},function(err,results){
          if(err)
          console.log(err.message);
          else {

            // res.render('profilePage',{profilePage});
          }
        });

	} 







}