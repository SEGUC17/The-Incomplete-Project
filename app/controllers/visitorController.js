let BusinessPage = require('../models/BusinessPage');


let visitorController = {

  searchBusinessPages:function(req, res) {

    let businessPageId = req.session.data.businessPage;
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
  }

}


module.exports = visitorController;
