let Owner = require('../models/Owner');

let ownerController = {

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



    }
}
module.exports = ownerController;
