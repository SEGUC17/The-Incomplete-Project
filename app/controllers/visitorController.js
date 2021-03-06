let BusinessPage = require('../models/BusinessPage');
let AnEvent = require('../models/Event');
let Trip = require('../models/Trip');
let Place = require('../models/Place');
let mongoose = require('mongoose');


let visitorController = {

  popularBusinessPages:function(req, res) {
    var businessPagesResult = [];
    // get all businessPages
    BusinessPage.find(function(err, businessPages) {
        if(err){
          res.send(err.message)
        }
        else {
          var test = [];
          for (var i = 0; i < businessPages.length; i++) {
            test.push(businessPages[i]);
          }
          var max =0 ;
          for (var i = 0; i < 6 && i < businessPages.length; i++) {
            for (var j = 0; j < test.length; j++) {
            if(test[max].numberOfViews<test[j].numberOfViews)
              max = j;
            }
          businessPagesResult.push(test[max]);
          test.splice(max,1);
          max=0;
          }
        }
          res.json({"popularBusinessPagesResult" : businessPagesResult});

    });

  },

  searchBusinessPages:function(req, res) {
    let body = req.body;
    var searchWord = body.searchWord;
    var businessPagesResult = [];
    // get all businessPages
    BusinessPage.find(function(err, businessPages) {
  			if(err){
          res.send(err.message)
  			}
  			else {
  				// for loop to filter pages according to searchWord
              for (var i = 0; i < businessPages.length; i++) {
                if(businessPages[i].name.indexOf(searchWord)!=-1){
                  businessPagesResult.push(businessPages[i]);
            }
          }

          res.json({"searchBusinessPagesResult" : businessPagesResult});

        }
  	});

  },
  viewsBusinessPage:function(req, res) {

    let businessPageId ;
    let username ;

    if(req.session==undefined){
			actor = "visitor";
			businessPageId=req.session.data
            username = "";
		}else{
			if(req.session.data==undefined){
				actor = "visitor"
				businessPageId=req.session.data
                username = "";
			}
			else {
				if(req.session.data.UserID==undefined){
					actor = "visitor"
					businessPageId=req.session.data
                    username = "";
				}
				else{
					actor = 'user'
					businessPageId=req.session.data.businessPageId
                    username = req.session.data.Profile.username;
				}
			}
		}

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
                res.json({"businessPage":businessPage,"events":[],"username": username});

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

                            if(andRes){
                                res.json({"businessPage":businessPage,"events":events, "username": username});
                            }
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

                            if(andRes){
                                res.json({"businessPage":businessPage,"events":events, "username": username});
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


module.exports = visitorController;
