let BusinessPage = require('../models/BusinessPage');
let AnEvent = require('../models/Event');
let mongoose = require('mongoose');


let visitorController = {

  searchBusinessPages:function(req, res) {
    let body = req.body;
    let searchWord = body.searchWord;
    let businessPagesResult = [];
    // get all businessPages
    BusinessPage.find(function(err, businessPages) {
  			if(err){
          res.send(err.message)
  			}
  			else {
  				// for loop to filter pages according to searchWord
              for (let i = 0; i < businessPages.length; i++) {
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

      // let businessPageId = req.session.data.businessPage;
     let businessPageId = mongoose.Types.ObjectId("58e3b08e0b1c69d2d177861d");

      BusinessPage.findOne({_id:businessPageId}, function(err, businessPage) {

          if(err) {
            res.send(err.message)
          }
          else {
            // console.log(businessPage);
              // let events = [];
              // for (let i = 0; i < businessPage.events.length; i++) {
              //     let eventId = businessPage.events[i]._id
              //     AnEvent.findOne(eventId, function(err, anEvent) {
              //         if(err) {
              //             res.send(err)
              //         }
              //         else {
              //             events.push(anEvent)
              //         }
              //     })
              // }

              // console.log(businessPage);
              // return JSON.stringify(businessPage);
              res.json(businessPage);
              // return {BusinessPage:businessPage,events:events};
          }
      })
  }

}


module.exports = visitorController;
