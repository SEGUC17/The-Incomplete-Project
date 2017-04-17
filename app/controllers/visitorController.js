let BusinessPage = require('../models/BusinessPage');
let AnEvent = require('../models/Event');
let Trip = require('../models/Trip');
let Place = require('../models/Place');
let mongoose = require('mongoose');


let visitorController = {

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


          //send businessPagesResult to the frontend

        }
  	});

  },

  visitorViewsBusinessPage:function(req, res) {
    //  console.log("test");

      let businessPageId = req.session.data.businessPage;
    //  let businessPageId = mongoose.Types.ObjectId("58e3b08e0b1c69d2d177861d");
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
                            res.json({"businessPage":businessPage,"events":events,"actor":"visitor"});
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
                            res.json({"businessPage":businessPage,"events":events,"actor":"visitor"});
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
