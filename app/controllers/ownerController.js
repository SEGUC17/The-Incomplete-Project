let Owner = require('../models/Owner');
let BusinessPage = require('../models/BusinessPage');
let Profile = require('../models/Profile');
let AnEvent = require('../models/Event');
let Place = require('../models/Place');
let Trip = require('../models/Trip');
let mongoose = require('mongoose');



// tareq's session// tareq's session// tareq's session// tareq's session// tareq's session

let eventController = {


  addEvent:function(req, res) {

    let body = req.body
    let anEvent = new AnEvent(req.body)
    businessPageId = req.session.data.businessPage;

    BusinessPage.update(
      {_id: businessPageId},{$push: {events: anEvent}}
    )
  },
  //req contains the id of the event
  editEvent:function(req, res) {
    let body = req.body
    let eventId = body.eventsId
    AnEvent.update(
      {_id: eventId},{$set: {
        name: body.name,
        description: body.description,
        price: body.price,
        mustPay: body.mustPay,
        image: body.image
      }}
    )
  },

  removeEvent:function(req,res,id){
    businessPageId = req.session.data.businessPage;
    // businessPageId = mongoose.Types.ObjectId("58e3b08e0b1c69d2d177861d");
    BusinessPage.update(
      {_id: businessPageId},
      {$pull: {events: {_id: id}}}, function(err, result) {
          if (err)
            res.send(err)
          else {
              AnEvent.remove({ _id: anEventId });
              // refresh the page
          }
      }
    )
  }
}

let ownerController = {

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
    let owner = new Owner({
      companyName:body.companyName,
      profile : profile,
    })

    profile.save(function(err, profile){
      if(err)
      res.send(err)
      else {
        owner.save(function(err, owner){
          if(err)
          res.send(err)
          else {
            //go to the home page
          }
        })
      }
    })
  },

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
                                    req.session.data = {UserID: userID, CompanyName: companyName, Profile:profile, BusinessPage: businessPage}
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

  ownerLogsOut:function(req,res){
    req.session.destroy();
    res.sendFile('home.html',{root:"./views"});
  },

    viewProfile:function(req, res) {

        // let profileId = req.session.data.profile;

        Profile.findOne({_id:profileId}, function(err, profile) {
            if(err) {
                res.send(err.message)
                // console.log(err);
            }
            else {
                // res.send(profile);
                res.sendFile('ownerProfilePage.html', { root:"./views" });
                //send the profile to the frontend
            }

        })
    },
    editProfile:function(req,res){
      let body = req.body;
      // let profileId = req.session.data.profile;
      let profileId = mongoose.Types.ObjectId("58e69a9f727fd51fdd784ad4");

      Profile.update({_id:profileId},{$set:{firstName:body.firstName,lastName:body.lastName,Password:body.Password,
          email:body.email,mobileNumber:body.mobileNumber,address:body.address,gender:body.gender}},function(err,results){
          if(err)
            res.send(err.message)
          else {
            req.session.data.Profile = profile;
            res.sendFile('registeredUserProfilePage.html',{root:"./views"});
          }
        });
      },

    editBusinessPage:function(req,res){
      let body = req.body;
      // let businessPageId = req.session.data.businessPage;
      let businessPageId = mongoose.Types.ObjectId("58e8c0a54c696e01a6646ccb");
      BusinessPage.update({_id:businessPageId},{$set:{name:body.name,profileImg:body.profileImg,images:body.images,description:body.description,
        addresses:body.addresses,phoneNumber:body.phoneNumber}},function(err,businessPage){
          if(err)
            res.send(err.message)
          else {
            res.sendFile('viewBusinessPage.html', { root:"./views" });
          }
        });
      },

    addPlace:function(req, res) {

      let body = req.body
      let anEvent = new AnEvent({
        name: body.name,
        description: body.description,
        price: body.price,
        mustPay: body.mustPay,
        image: body.image,
        isPlace: true
      })
      anEvent.save(function(err, anEvent) {
        if (err)
          res.send(err.message)
        else{
          let place = new Place({anEvent:anEvent._id,openingTimes:body.openingTimes,period:body.period});
          place.save(function(err, place) {
            if (err)
              res.send(err.message)
            else{
              //refresh
              res.send("done")
              // console.log(res);
            }
          })

        }

      })
    },

    editPlace:function(req,res){
      let body = req.body
      let placeId = body.placeId
    //   let placeId = mongoose.Types.ObjectId("58e3c4ba9fa4e9164f0714c0");
      eventController.editEvent(req,res);
      Place.update(
        {_id: placeId},{$set: {
          openingTimes: body.openingTimes,
          period: body.period
        }}, function(err, place) {
                if(err)
                    res.send(err);
                else
                    res.send(place)
            })
    },

    addTrip:function(req, res) {
      let body = req.body
      let anEvent = new AnEvent({
        name: body.name,
        description: body.description,
        price: body.price,
        mustPay: body.mustPay,
        image: body.image,
        isPlace: false
      })

      anEvent.save(function(err, anEvent) {
        if (err)
          res.send(err)
        else{
          let trip = new Trip({anEvent:anEvent._id,startDate:body.startDate,endDate:body.endDate,maxPeople:body.maxPeople});// take care
          trip.save(function(err, result) {
            if (err)
              res.send(err)
            else{
              //refresh
               res.send(result)
            }
          })
        }
      })
    },

    editTrip:function(req,res){
      let body = req.body
      let tripId = body.tripId
    //   let tripId = mongoose.Types.ObjectId("58e3d3fbc633a71fa3b716a3");
      eventController.editEvent(req,res);
      Trip.update(
        {_id: tripId},{$set: {
          startDate: body.startDate,
          endDate: body.endDate,
          maxPeople: body.maxPeople
      }}, function(err, result) {
            if (err)
                res.send(err)
            else
                res.send(result)
      }
      )
    },

    removePlace:function(req,res){
      let body = req.body;
      let placeId = body.placeId
    //   let placeId = mongoose.Types.ObjectId("58e3c4ba9fa4e9164f0714c0");
      let eventId = body.eventId
    //   let eventId = mongoose.Types.ObjectId("58e3c4ba9fa4e9164f0714bf");

      eventController.removeEvent(req,res,eventId);
    //   eventController.removeEvent(req,res,"58e3c4ba9fa4e9164f0714bf");
      Place.remove({ _id: placeId }, function(err, result) {
          if (err)
            res.send(err)
          else
            res.send(result)
      });
    },
    // the same as removePlace so it was not tested
    removeTrip:function(req,res){
      let body = req.body;
      let tripId = body.tripId
      let eventId = body.eventId
      eventController.removeEvent(req,res,eventId);
      Trip.remove({ _id: tripId });
    },
    ownerViewsBusinessPage:function(req, res) {
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
                                res.json({"businessPage":businessPage,"events":events,"actor":"owner"});
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
                                res.json({"businessPage":businessPage,"events":events,"actor":"owner"});
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
module.exports = ownerController;
