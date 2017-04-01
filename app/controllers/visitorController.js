let BusinessPage = require('../models/BusinessPage');
let AnEvent = require('../models/Event');


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

          }

          res.send(businessPagesResult); //Need to be changed 

        //  res.render('home.ejs' , data);
        }
  	});

  },

  viewBusinessPage:function(req, res) {

      let businessPageId = req.body.businessPageId;
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
  }

}


module.exports = visitorController;
