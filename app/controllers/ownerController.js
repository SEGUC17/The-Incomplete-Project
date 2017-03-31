let Owner = require('../models/Owner');
let BusinessPage = require('../models/BusinessPage');
let Profile = require('../models/Profile');

let ownerController = {


    viewProfile:function(req, res) {

        let profileId = req.session.data.profile;
        Profile.findOne(profileId, function(err, profile) {
            if(err) {
                res.send(err.message)
                console.log(err);
            }

            else {
                res.render('profile', {profile});
            }

        })

    },


    editProfile:function(req,res){
      Owner.update({_id:session._id},{$set:{}},function(err,results){
        if(err)
          console.log(err.message);
        else {

        }
      });
      students.update({_id:session._id},{$set: {portfolio:port._id}},function(err,results){
        if(err)
          console.log(err.message);
        else{
          session.portfolio=port._id;
          res.render('user/user_home',{session});
        }
      });
    },

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
