let Owner = require('../models/Owner');
let BusinessPage = require('../models/BusinessPage');

let ownerController = {

    viewProfile:function(req, res) {

        let profilePageId = req.session.data.profilePage;
        ProfilePage.findOne(profilePageId, function(err, profilePage) {
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
    editProfile:function(req,res){
      let body = req.body;
      Owner.update({_id:session._id},{$set:{firstName:body.firstName,lastName:body.lastName,username:body.username,
        Password:body.Password,email:body.email,mobileNumber:body.mobileNumber,address:body.address,gender:body.gender}},function(err,results){
          if(err)
          console.log(err.message);
          else {

            // res.render('profilePage',{profilePage});
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
                // req.session.data = businessPage;
                // res.render('businessPage', {businessPage});
          }
        })
    },
    editBusinsessPage:function(req,res){
      let body = req.body;
      BusinessPage.update({_id:session._id},{$set:{name:body.name,profileImg:body.profileImg,images:body.images,description:body.description,
        addresses:body.addresses,phoneNumber:body.phoneNumber}},function(err,results){
          if(err)
          console.log(err.message);
          else {
            // res.render('profilePage',{profilePage});
          }
        });
      }
}
module.exports = ownerController;
