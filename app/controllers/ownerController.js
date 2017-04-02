let Owner = require('../models/Owner');
let BusinessPage = require('../models/BusinessPage');
let Profile = require('../models/Profile');
let AnEvent = require('../models/Event');
let Place = require('../models/Place');
let Trip = require('../models/Trip');

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
    BusinessPage.update(
      {_id: businessPageId},
      {$pull: {events: {_id: id}}}
    )
  }
}

let ownerController = {

    requestsPageCreation:function(req,res) {
      let body = req.body;
      let pendingRequest = new PendingRequest(req.body)
      pendingRequest.save(function(err, pendingRequest) {
        if (err) {
          res.send(err)
        }else {
          // tell the visitor (not an owner yet) that the request has been send
        }
      })

    },


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

        })
    },
    editProfile:function(req,res){
      let body = req.body;
      Owner.update({_id:session._id},{$set:{firstName:body.firstName,lastName:body.lastName,username:body.username,
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
        BusinessPage.findOne(businessPageId, function(err, businessPage) {
            if(err) {
                res.send(err.message)
                console.log(err);
          }
          else {
                // req.session.data = businessPage;
                // res.render('businessPage', {businessPage});
          }
        })
    },
    editBusinsessPage:function(req,res){
      let body = req.body;
      BusinessPage.update({_id:session._id},{$set:{name:body.name,profileImg:body.profileImg,images:body.images,description:body.description,
        addresses:body.addresses,phoneNumber:body.phoneNumber}},function(err,results){
          if(err)
          console.log(err.message);
          else {
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
        else
          let place = new Place({anEvent:anEvent._id,openingTimes:body.openingTimes,period:body.period});
          place.save(function(err, place) {
            if (err)
              res.send(err)
            else
              //refresh
          })
      })
    },

    editPlace:function(req,res){
      let body = req.body
      let placeId = body.placeId
      eventController.editEvent(req,res);
      AnEvent.update(
        {_id: placeId},{$set: {
          openingTimes: body.openingTimes,
          period: body.period
        }}
      )
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
          let trip = new Trip({anEvent:anEvent._id,openingTimes:body.openingTimes,period:body.period});// take care
          trip.save(function(err, trip) {
            if (err)
              res.send(err)
            else
              //refresh
          })
        }
      })
    },

    editTrip:function(req,res){
      let body = req.body
      let tripId = body.tripId
      eventController.editEvent(req,res);
      Trip.update(
        {_id: tripId},{$set: {
          startDate: body.startDate,
          endDate: body.endDate,
          maxPeople: body.maxPeople
        }}
      )
    },

    removePlace:function(req,res){
      let body = req.body;
      let placeId = body.placeId
      let eventId = body.eventId
      eventController.removeEvent(req,res,eventId);
      Place.remove({ _id: placeId });
    },

    removeTrip:function(req,res){
      let body = req.body;
      let tripId = body.tripId
      let eventId = body.eventId
      eventController.removeEvent(req,res,eventId);
      Trip.remove({ _id: tripId });
    }

}
module.exports = ownerController;
