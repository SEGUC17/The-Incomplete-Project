let Owner = require('../models/Owner');
let BusinessPage = require('../models/BusinessPage');

let ownerController = {

    viewProfilePage:function(req, res) {

        let profilePageId = req.session.data.profilePage;
        ProfilePage.findOne(profilePageId, function(err, profilePage) {
            if(err) {
                res.send(err.message)
                console.log(err);
          }

            else {
                req.session.data = profilePage;
                res.render('profilePage', {profilePage});
          }

        })

    }

    viewBusinessPage:function(req, res) {

        let businessPageId = req.session.data.businessPage;
        BusinessPage.findOne(businessPageId, function(err, businessPage) {
            if(err) {
                res.send(err.message)
                console.log(err);
          }

            else {
                req.session.data = businessPage;
                res.render('businessPage', {businessPage});
          }

        })

    }

}

module.exports = ownerController;
