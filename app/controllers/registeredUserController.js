let RegisteredUser = require('../models/RegisteredUser');
let Profile = require('../models/Profile');
var mongoose = require('mongoose');



let RegisteredUserController = {

	registeredUserLogsIn:function(req,res){

		RegisteredUser.findOne({username: req.body.username}, function(err, results) {
            if (!results) {
                // display a message informing the user that the username is empty
            } else {
                if (req.body.password === results.password) {
                    req.session.data = results;
					res.sendFile('registeredUserProfilePage.html',{root:"./views"});
                    //send the data to the frontend
                } else {
                    // display a message informing the user that the password is wrong
                }
            }
        });
	},

	//B.5
	viewProfile:function(req, res) {
		//  let profileId = req.session.data.profile;
		 let profileId = mongoose.Types.ObjectId("58e3b0870b1c69d2d177861c");
        Profile.findOne(profileId, function(err, profile) {
            if(err) {
                res.send(err.message)
                console.log(err);

          }
          else {
                res.send(profile);
          }

        });

	} ,


	//B.6
	editProfile:function(req, res) {
	 let body = req.body;
     let profileId = req.session.data.Profile._id;
     // let profileId = mongoose.Types.ObjectId("58e3aafe0b1c69d2d1778619");
	 console.log(profileId);
     Profile.update({_id:profileId},{$set:{firstName:body.firstName,lastName:body.lastName,
        Password:body.Password,email:body.email,mobileNumber:body.mobileNumber,address:body.address,gender:body.gender}},function(err,results){
          if(err)
            console.log(err.message);
          else {
			  	Profile.findOne({_id:profileId}, function(err, profile) {
					if (err)
						res.send(err);
					else {
						console.log(profile);
					  	req.session.data.Profile = profile;
						res.sendFile('registeredUserProfilePage.html',{root:"./views"});
					}
				})

          }
        });

	},
	register:function(req,res){
	    let body = req.body
			console.log(req.body);
	    let profile = new Profile({
	        firstName: body.firstName,
	        lastName: body.lastName,
	        username: body.username,
	        Password: body.Password,
	        email:body.email,
	        mobileNumber:body.mobileNumber,
	        address:body.address,
	        gender:body.gender,
	    })

	    profile.save(function(err, profile){
	      if(err)
	      	res.send(err)
	      else {
					let regUser = new RegisteredUser({
			        _id:profile._id
			    })

					regUser.save(function(err,user){
						userID = regUser._id
						if(err)
							res.send(err);
						else{
							req.session.data = {UserID: userID, Profile:profile}

							res.sendFile('registeredUserProfilePage.html',{root:"./views"});
						}
					})
	      }
	    });
  }
}

module.exports = RegisteredUserController;
