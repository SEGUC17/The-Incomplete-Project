let BusinessPage = require('../models/BusinessPage');
let AnEvent = require('../models/Event');
var mongoose = require('mongoose');


let visitorController = {

  searchBusinessPages:function(req, res) {
    let body = req.body;
    var searchWord = body.searchWord;
    var businessPagesResult = [];
    // get all businessPages
    BusinessPage.find(function(err, businessPages) {
  			if(err){
  				console.log("calling failed");
  			}
  			else {
  				// for loop to filter pages according to searchWord
          for (var i = 0; i < businessPages.length; i++) {
            if(businessPages[i].name.indexOf(searchWord)!=-1){
              businessPagesResult.push(businessPages[i]);
            }
        //    console.log(businessPages[i]);
          }

          res.send(businessPagesResult); //Need to be changed

        //  res.render('home.ejs' , data);
        }
  	});

  },

  viewBusinessPage:function(req, res) {
    //  console.log("test");
      let businessPageId = req.session.data.businessPage;
    //  let businessPageId = mongoose.Types.ObjectId("58e3b08e0b1c69d2d177861d");
      BusinessPage.findOne({_id:businessPageId}, function(err, businessPage) {
          if(err) {
              res.send(err.message)
              console.log(err);
          }
          else {
          //res.send(businessPage);
          //lessa 3ayzeen negeeb el events beta3et el page
          }
      })
  }

}


module.exports = visitorController;
