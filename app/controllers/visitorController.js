let BusinessPage = require('../models/BusinessPage');
let AnEvent = require('../models/Event');


let visitorController = {

  searchBusinessPages:function(req, res) {
    let body = req.body;
    let businessPageId = req.session.data.businessPage;
    var searchWord = body.searchWord;
    var businessPages
    // get all businessPages
    BusinessPage.find({},function(err, businessPages) {
  			if(err){
  				console.log("calling failed");
  			}
  			else {
  				//response.log(businessPages);
          businessPages : businessPages;
          var businessPages =  businessPages;

        //  res.render('home.ejs' , data);
        }
  	});
    var businessPagesResult = [];

    // for loop to filter pages according to searchWord
    for (var i = 0; i < businessPages.length; i++) {
      if(businessPages[i].name.indexOf(searchWord)!=-1){
        businessPagesResult.push(businessPages[i]);
      }

    }

    res.send(businessPagesResult);

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
