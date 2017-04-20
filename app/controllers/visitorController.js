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

  }
}


module.exports = visitorController;
