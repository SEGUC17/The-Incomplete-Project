let Owner = require('../models/Owner');
let BusinessPage = require('../models/BusinessPage');
let Profile = require('../models/Profile');
let AnEvent = require('../models/Event');
let Place = require('../models/Place');
let Trip = require('../models/Trip');
var mongoose = require('mongoose');



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
              // reload the page
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

    viewProfile:function(req, res) {

        let profileId = req.session.data.profile;
        // let profileId = mongoose.Types.ObjectId("58e3aafe0b1c69d2d1778619");

        Profile.findOne({_id:profileId}, function(err, profile) {
            if(err) {
                res.send(err.message)
                console.log(err);
            }
            else {
                res.send(profile);
                // console.log(profile);
                // req.session.data = profilePage;
                // res.render('profilePage', {profilePage});
            }

        })
    },
    editProfile:function(req,res){
      let body = req.body;
      let profileId = req.session.data.profile;
      // let profileId = mongoose.Types.ObjectId("58e3aafe0b1c69d2d1778619");

      Profile.update({_id:profileId},{$set:{firstName:body.firstName,lastName:body.lastName,username:body.username,
        Password:body.Password,email:body.email,mobileNumber:body.mobileNumber,address:body.address,gender:body.gender}},function(err,results){
          if(err)
            console.log(err.message);
          else {

            // res.render('profilePage',{profilePage});
          }
        });
      },
    viewBusinessPage:function(req, res) {

        let businessPageId = req.session.data.businessPage;
        // let businessPageId = mongoose.Types.ObjectId("58e3b08e0b1c69d2d177861d");
        BusinessPage.findOne({_id:businessPageId}, function(err, businessPage) {
            if(err) {
                res.send(err.message)
                console.log(err);
          }
          else {
                res.send(businessPage);
                // req.session.data = businessPage;
                // res.render('businessPage', {businessPage});
          }
        })
    },
    editBusinessPage:function(req,res){
      let body = req.body;
      let businessPageId = req.session.data.businessPage;
      // let businessPageId = mongoose.Types.ObjectId("58e3b08e0b1c69d2d177861d");
      BusinessPage.update({_id:businessPageId},{$set:{name:body.name,profileImg:body.profileImg,images:body.images,description:body.description,
        addresses:body.addresses,phoneNumber:body.phoneNumber}},function(err,businessPage){
          if(err)
            console.log(err.message);
          else {
            res.send(businessPage);
            // res.render('profilePage',{profilePage});
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
          res.send(err)
        else{
          let place = new Place({anEvent:anEvent._id,openingTimes:body.openingTimes,period:body.period});
          place.save(function(err, res) {
            if (err)
              res.send(err)
            else{
              //refresh
              res.send(res)
              console.log(res);
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
    }

}
module.exports = ownerController;
