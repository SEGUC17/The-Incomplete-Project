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
					if(err)
						res.send(err);
					else{
						req.session.data = profile;
						res.sendFile('profile.html',{root:"./views"});
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
                            if(i==businessPage.events.length-1){
                              res.json({"businessPage":businessPage,"events":events,"actor":"user"});
                            }
                          }
                        })
                      }else{
                        Trip.findOne({anEvent:eventId}, function(err, trip) {
                          if(err) {
                            res.send(err)
                          }
                          else {
                            console.log(trip.startDate);
                            element.trip = trip;
                            events.push(element);
                            if(i==businessPage.events.length-1){
                              res.json({"businessPage":businessPage,"events":events});
                            }
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
