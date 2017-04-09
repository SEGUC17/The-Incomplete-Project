let RegisteredUser = require('../models/RegisteredUser');
let Profile = require('../models/Profile');
var mongoose = require('mongoose');



let RegisteredUserController = {

	registeredUserLogsIn:function {

		RegisteredUser.findOne({username: req.body.username}, function(err, results) {
            if (!results) {
                // display a message informing the user that the username is empty
            } else {
                if (req.body.password === results.password) {
                    req.session.data = results;
                    var session = req.session.data;
                    //send the data to the frontend
                } else {
                    // display a message informing the user that the username is empty
                }
            }
        });
	},

	//B.5
	viewProfile:function(req, res) {
		 let profileId = req.session.data.profile;
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
     let profileId = req.session.data.profile;
     // let profileId = mongoose.Types.ObjectId("58e3aafe0b1c69d2d1778619");

     Profile.update({_id:profileId},{$set:{firstName:body.firstName,lastName:body.lastName,username:body.username,
        Password:body.Password,email:body.email,mobileNumber:body.mobileNumber,address:body.address,gender:body.gender}},function(err,results){
          if(err)
            console.log(err.message);
          else {

			  //send the profile to the frontend

          }
        });

	}








}
