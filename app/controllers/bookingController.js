var RegisteredUser = require('../models/RegisteredUser');
var AnEvent = require('../models/Event');
var Place = require('../models/Place');
var Trip = require('../models/Trip');


var bookingController= {


//Used to update the booking array of trip events.
tripBook:function(req,res) {
if(AnEvent.mustPay.type==true){
  console.log("Cannot be booked");
}
else { if(Trip.maxPeople==payersCount) {
          console.log("No Available places");
        }
        else {
          var user= req.body;
          Trip.findOneAndUpdate({_id: req.params.id}, {$push: {"bookedByAt": {registeredUser: user}}}, {new: true}, function(err, doc){
              if(err){
                  console.log("Something wrong when updating data!");
              }

              console.log("done updating");
          });
        }
      }
    } ,

//This function used to update booking array of place events.
placeBook:function(req,res) {
if(AnEvent.mustPay.type==true){
  console.log("Cannot be booked");
}
else { if(Trip.maxPeople==payersCount) {
          console.log("No Available places");
        }
        else {
          var user= req.body;
          Trip.findOneAndUpdate({_id: req.params.id}, {$push: {"bookedByAt": {registeredUser: user, time: req.body.time}}}, {new: true}, function(err, doc){
              if(err){
                  console.log("Something wrong when updating data!");
              }

              console.log("done updating");
          });
        }
      }
    } ,






    //This function takes the ID of place and search for the place then updates the booking array with registeredUser ID.
    // Another way using (findByIdAndUpdate)
   placeBook2:function(req,res){
     var user= req.body;
     Place.findByIdAndUpdate(
        Place._id,
        {$push: {"bookedByAt": {registeredUser: user, time: req.body.time}}},
        {safe: true, upsert: true, new : true},
        function(err, Trip) {
            console.log(err);
        }
    );
   }





};

module.exports = bookingController;
