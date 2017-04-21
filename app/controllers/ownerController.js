let Owner = require('../models/Owner');
let BusinessPage = require('../models/BusinessPage');
let Profile = require('../models/Profile');
let AnEvent = require('../models/Event');
let Place = require('../models/Place');
let Trip = require('../models/Trip');
let mongoose = require('mongoose');




let eventController = {


  addEvent:function(req, res) {

    let body = req.body
    let anEvent = new AnEvent(req.body)
    businessPageId = req.session.data.BusinessPage._id;

    BusinessPage.update(
      {_id: businessPageId},{$push: {events: anEvent}}
    )
  },
  editEvent:function(req, res) {
    let body = req.body
    let eventId = req.session.data.eventID
    AnEvent.update(
      {_id: eventId},{$set: {
        name: body.name,
        description: body.description,
        price: body.price,
        mustPay: body.mustPay,
        image: body.image
      }}, function(err, result) {
          if (err)
            res.send(err)
          else
            res.sendFile('viewBusinessPage.html', { root:"./views" });
      });
  },

  removeEvent:function(req,res){
    let businessPageId = req.session.data.BusinessPage._id;
    let eventId = req.body._id;
    let id = mongoose.Types.ObjectId(eventId);
    BusinessPage.update(
      {_id: businessPageId},
      {$pull: {events: id}}, function(err, result1) {
          if (err){
            res.send(err)
          }
          else {
              AnEvent.remove({ _id: eventId }, function(err, result2) {
                  if (err)
                    res.send(err)
                  else{
                    res.sendFile('viewBusinessPage.html', { root:"./views" });
                  }
              });
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
            res.sendFile('registeredUserProfilePage.html',{root:"./views"});
          }
        })
      }
    })
  },

  ownerLogsOut:function(req,res){
    req.session.destroy();
    res.sendFile('home.html',{root:"./views"});
  },

    viewProfile:function(req, res) {

        let profileId = req.session.data.profile;

        Profile.findOne({_id:profileId}, function(err, profile) {
            if(err) {
                res.send(err.message)
            }
            else {
                res.sendFile('ownerProfilePage.html', { root:"./views" });
            }

        })
    },
    editProfile:function(req,res){
      let body = req.body;
      let profileId = req.session.data.profile;

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
      let businessPageId = req.session.data.BusinessPage._id;

      BusinessPage.update({_id:businessPageId},{$set:{name:body.name,profileImg:body.profileImg,images:body.images,description:body.description,
        addresses:body.addresses,phoneNumber:body.phoneNumber}},function(err,businessPage){
          if(err)
            res.send(err.message)
          else {
            BusinessPage.findOne({_id:businessPageId},function(err,businessPage){
              if(err)
                res.send(err.message)
              else {
                req.session.data.BusinessPage = businessPage
              }
            })
            res.sendFile('viewBusinessPage.html', { root:"./views" });
          }
        });
      },

    addPlace:function(req, res) {

      let body = req.body;

      if(body.mustPay==undefined)
        body.mustPay= 'false';

      let businessPageId = req.session.data.BusinessPage._id;
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
          place.save(function(err, place) {
            if (err)
              res.send(err)
            else{
              BusinessPage.update({_id: businessPageId},{$push: {events: anEvent}},function(err,result){
                if(err)
                  res.send(err)
                else {
                  res.sendFile('viewBusinessPage.html', { root:"./views" });
                }
              })
            }
          })
        }
      })
    },

    editPlace:function(req,res){
      let body = req.body;
      let eventId = req.session.data.eventID;
      Place.update(
        {anEvent: eventId},{$set: {
          openingTimes: body.openingTimes,
          period: body.period
        }}, function(err, place) {
                if(err)
                    res.send(err);
                else
                  eventController.editEvent(req,res);
            })
    },

    addTrip:function(req, res) {
      let body = req.body

      if(body.mustPay==undefined)
        body.mustPay= 'false';

      let businessPageId = req.session.data.BusinessPage._id;
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
          let trip = new Trip({anEvent:anEvent._id,startDate:body.startDate,endDate:body.endDate,maxPeople:body.maxPeople});
          trip.save(function(err, result) {
            if (err)
              res.send(err)
            else{
              BusinessPage.update({_id: businessPageId},{$push: {events: anEvent}},function(err,result){
                if(err)
                  res.send(err)
                else {
                  res.sendFile('viewBusinessPage.html', { root:"./views" });
                }
              })
            }
          })
        }
      })
    },

    editTrip:function(req,res){
      let body = req.body
      let eventId = req.session.data.eventID

      Trip.update(
        {anEvent: eventId},{$set: {
          startDate: body.startDate,
          endDate: body.endDate,
          maxPeople: body.maxPeople
      }}, function(err, result) {
            if (err)
                res.send(err)
            else{
              eventController.editEvent(req,res);
            }
      }
      )
    },

    removePlace:function(req,res){
      let body = req.body;
      let eventId = req.body._id;
      console.log(eventId);
      Place.remove({ anEvent: eventId }, function(err, result) {
          if (err)
            res.send(err)
          else{
            console.log(result.result);
            eventController.removeEvent(req,res);
          }
      });
    },
    removeTrip:function(req,res){
      let body = req.body;
      let eventId = req.body._id
      console.log(eventId);
      Trip.remove({ anEvent: eventId }, function(err, result) {
          if (err)
            res.send(err)
          else{
            console.log(result.result);
            eventController.removeEvent(req,res);
          }
      });
    },
    ownerViewsBusinessPage:function(req, res) {
        let businessPageId = req.session.data.BusinessPage._id;
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

                if(businessPage.events.length==0)
                  res.json({"businessPage":businessPage,"events":[]});

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
                                res.json({"businessPage":businessPage,"events":events});
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
                                res.json({"businessPage":businessPage,"events":events});
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
