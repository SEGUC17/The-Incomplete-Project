let RegisteredUser = require('../models/RegisteredUser');
let Profile = require('../models/Profile');
var mongoose = require('mongoose');



let RegisteredUserController = {

	logIn:function(req,res){

        Profile.findOne({username: req.body.username}, function(err, profile) {
            if (!profile) {
                // display a message informing the user that the username is empty
            } else {

              //

              //   Owner.findOne({profile:profileID}, function (err, ))
                if (req.body.password === profile.password) {
                    if (profile.isRegisteredUser) {
						profileID = profile._id;
                        RegisteredUser.findOne({profile: profileID}, function (err, registeredUser){
                            let userID = registeredUser._id;
                            req.session.data = {UserID: userID, Profile:profile}
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
                                      req.session.data = {UserID: userID, CompanyName: companyName,Profile:profile, BusinessPage: businessPage}
                                      res.sendFile('ownerProfilePage.html',{root:"./views"});
                                  }

                            })


                        })
                    }
                  //   req.session.data = {CompanyName:};
                    res.sendFile('ownerProfilePage.html',{root:"./views"});
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
  },
	userViewsBusinessPage:function(req, res) {
    //  console.log("test");

      // let businessPageId = req.session.data.businessPage;
     let businessPageId = mongoose.Types.ObjectId("58e3b08e0b1c69d2d177861d");

		 BusinessPage.findOne({_id:businessPageId}, function(err, businessPage) {

				 if(err) {
					 res.send(err.message)
				 }
				 else {
						 let events = [];
						 let bool = new Array(businessPage.events.length);
						 for (let i = 0; i < businessPage.events.length; i++) {
							 bool[i] = false;
						 }
						 for (let i = 0; i < businessPage.events.length; i++) {
								 let eventId = businessPage.events[i];
								 let element = {"event":"","place":"","trip":""};

								 AnEvent.findOne({_id:eventId}, function(err, anEvent) {
									 if(err) {
										 res.send(err)
									 }
									 else {

										 element.event = anEvent;
										 if(anEvent.isPlace){
											 Place.findOne({anEvent:eventId}, function(err, place) {
												 if(err) {
													 res.send(err)
												 }
												 else {
													 element.place = place;
													 events.push(element);
													 bool[i] = true;
													 let andRes = true;

													 for (let i = 0; i < businessPage.events.length; i++)
														 andRes = andRes&&bool[i]

													 if(andRes)
														 res.json({"businessPage":businessPage,"events":events,"actor":"user"});
												 }
											 })
										 }else{
											 Trip.findOne({anEvent:eventId}, function(err, trip) {
												 if(err) {
													 res.send(err)
												 }
												 else {
													 element.trip = trip;
													 events.push(element);
													 bool[i] = true;
													 let andRes = true;

													 for (let i = 0; i < businessPage.events.length; i++)
														 andRes = andRes&&bool[i]

													 if(andRes)
														 res.json({"businessPage":businessPage,"events":events,"actor":"user"});
												 }
											 })
										 }

									 }

								 })
						 }
				 }
		 })
 }

}

module.exports = RegisteredUserController;
