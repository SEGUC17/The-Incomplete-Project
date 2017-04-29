let RegisteredUser = require('../models/RegisteredUser');
let Profile = require('../models/Profile');
var mongoose = require('mongoose');
let Owner = require('../models/Owner');
let BusinessPage = require('../models/BusinessPage')


let RegisteredUserController = {

	logIn:function(req,res){

        Profile.findOne({username: req.body.username}, function(err, profile) {
            if (!profile) {
                res.send("username not found");
            } else {
                if (req.body.Password === profile.Password) {
									profileID = profile._id;
                  if (profile.isRegisteredUser) {
                      RegisteredUser.findOne({profile: profileID}, function (err, registeredUser){
                          let userID = registeredUser._id;
                          req.session.data = {UserID: userID, Profile:profile};
                          res.sendFile('registeredUserProfilePage.html',{root:"./views"});
                      })

                  }
                    else {
                        Owner.findOne({profile: profileID}, function (err, owner){
                            let userID = owner._id;
                            let companyName = owner.companyName
                            let businessPageID = owner.businessPage;
                            BusinessPage.findOne({_id:businessPageID}, function (err, businessPage) {
                                  if (err)
                                      res.send(err)
                                  else {
                                      req.session.data = {UserID: userID, CompanyName: companyName,Profile:profile, BusinessPage: businessPage};
                                      res.sendFile('ownerProfilePage.html',{root:"./views"});
                                  }

                            })


                        })
                    }
                } else {
                    res.send("wrong password");
                }
            }
        });
    },

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
	 let profileId = req.session.data.Profile._id;
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

		Profile.findOne({username: req.body.username}, function(err, profile) {
			if(err)
				res.send(err)
			else{
				if(profile)
					res.send('username already used');
			}
		})

		Profile.findOne({email: req.body.email}, function(err, profile) {
			if(err)
				res.send(err)
			else{
				if(profile)
					res.send('email already used');
			}
		})

		Profile.findOne({mobileNumber: req.body.mobileNumber}, function(err, profile) {
			if(err)
				res.send(err)
			else{
				if(profile)
					res.send('mobileNumber already used');
			}
		})

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
					 profile:profile._id
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
  },

  rateBusinessPage:function(req, res) {

	  name = req.body.name;
	  rating = req.body.rating;

	  BusinessPage.findOne({name: name}, function(err, businessPage) {

		if (err)
			res,send(err);
		else {

			var newRate = RegisteredUserController.updateRate(rating, businessPage.rate, businessPage.numberOfRatings);
			businessPage.rate = newRate.rate;
			businessPage.numberOfRatings = newRate.numberOfRatings;

			businessPage.save(function(err, updatedBusinessPage) {
				if (err)
				res.send(err);
				else {
					res.send("success")
				}
			})

		}

	  })

  },

  updateRate: function(rating, currentRate, numberOfRatings) {
	  console.log(rating);
	  console.log(currentRate);
	  console.log(numberOfRatings);
	  var newRate = {}
	  newRate.rate = (currentRate * numberOfRatings + rating) / (++numberOfRatings)
	  newRate.numberOfRatings = numberOfRatings;
	  return newRate;
  }

}

module.exports = RegisteredUserController;
