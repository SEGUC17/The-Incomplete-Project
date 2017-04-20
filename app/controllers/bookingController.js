let stripe= require("stripe")("sk_test_aFldNEUKYSuPZ63JQa2hhGVD");
let RegisteredUser = require('../models/RegisteredUser');
let AnEvent = require('../models/Event');
let Place = require('../models/Place');
let Trip = require('../models/Trip');
let mongoose = require('mongoose');


let bookingController= {


//Used to update the booking array of trip events.
tripBook:function(req,res) {
if(AnEvent.mustPay.type==true){
  console.log("Cannot be booked");
}
else { if(Trip.maxPeople==payersCount) {
          console.log("No Available places");
        }
        else {
          let user= req.body;
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
          let user= req.body;
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
     let userid= req.session.data.UserID;
     let eventID = req.session.data.eventId;
     let time = req.body.time;
    //  console.log(time);
     let bool = true;

     Place.findOne({anEvent:eventID},function(err,place){
       if(err)
         res.send(err);
       else{
        //  console.log(place);

         if(place.bookedByAt!=null){

           for(let i=0;i<place.bookedByAt.length;i++){
             if(place.bookedByAt[i].time.toString == time.toString){
               bool = false
               res.send("booked before at that time");
               return;
             }
           }

           let placeID = place._id
           if(bool)
             Place.findByIdAndUpdate(
                placeID,
                {$push: {"bookedByAt": {registeredUser: userid,time: time}}},
                {safe: true, upsert: true, new : true},
                function(err, results) {
                    if(err)
                     console.log(err);
                    else {
                      res.sendFile('viewBusinessPage.html', { root:"./views" });
                    }
                }
             );

         }else {
           Place.findByIdAndUpdate(
              placeID,
              {$push: {"bookedByAt": {registeredUser: userid,time: time}}},
              {safe: true, upsert: true, new : true},
              function(err, results) {
                  if(err)
                   console.log(err);
                  else {
                    res.sendFile('viewBusinessPage.html', { root:"./views" });
                  }
              }
           );
         }
       }
     });
  },

  tripBook2:function(req,res){
    let userid= req.session.data.UserID;
    let eventID = req.body.eventId
    let bool = true;

    Trip.findOne({anEvent:eventID},function(err,trip){
      if(err)
        res.send(err);
      else{

        if(trip.bookedByAt!=null){
          if(trip.maxPeople-trip.bookedByAt.length<=0){
            bool = false
            res.send("max number reached");
          }

          for(let i=0;i<trip.bookedByAt.length;i++){
            if(trip.bookedByAt[i].registeredUser == userid){
              bool = false
              res.send("booked before");
              return;
            }
          }

          let tripID = trip._id
          if(bool)
            Trip.findByIdAndUpdate(
               tripID,
               {$push: {"bookedByAt": {registeredUser: userid}}},
               {safe: true, upsert: true, new : true},
               function(err, results) {
                   if(err)
                    console.log(err);
                   else {
                     res.sendFile('viewBusinessPage.html', { root:"./views" });
                   }
               }
            );

        }else {
          Trip.findByIdAndUpdate(
             tripID,
             {$push: {"bookedByAt": {registeredUser: userid}}},
             {safe: true, upsert: true, new : true},
             function(err, results) {
                 if(err)
                  console.log(err);
                 else {
                   res.sendFile('viewBusinessPage.html', { root:"./views" });
                 }
             }
          );
        }
      }
    });

 },

 placePay:function(req,res){
   let userid= req.session.data.UserID;
   let eventID = req.session.data.eventId;
   let time = req.body.time;
   let bool = true;

   Place.findOne({anEvent:eventID},function(err,place){
     if(err)
       res.send(err);
     else{
       console.log(place);

       if(place.bookedByAt!=null){

         for(let i=0;i<place.bookedByAt.length;i++){
           if(place.bookedByAt[i].time = time){
             bool = false
             res.send("booked before at that time");
             return;
           }
         }

         let placeID = place._id
         if(bool)
           Place.findByIdAndUpdate(
              placeID,
              {$push: {"bookedByAt": {registeredUser: userid,time: time}}},
              {safe: true, upsert: true, new : true},
              function(err, results) {
                  if(err)
                   console.log(err);
                  else {
                    res.sendFile('viewBusinessPage.html', { root:"./views" });
                  }
              }
           );

       }else {
         Place.findByIdAndUpdate(
            placeID,
            {$push: {"bookedByAt": {registeredUser: userid,time: time}}},
            {safe: true, upsert: true, new : true},
            function(err, results) {
                if(err)
                 console.log(err);
                else {
                  res.sendFile('viewBusinessPage.html', { root:"./views" });
                }
            }
         );
       }
     }
   });
},


 tripPay:function(req,res){
   let userid= req.body.userid
   let tripID = req.body.tripID

   Trip.findByIdAndUpdate(
      tripID,
      {$push: {"bookedByAtWithPaying": {registeredUser: userid}}},
      {safe: true, upsert: true, new : true},
      function(err, Trip) {
          if(err)
          console.log(err);
          else {
            console.log(Trip);
          }
      }
   );
},


charge:function(req, res) {
    let stripeToken = req.body.stripeToken
    let price = req.body.price
    let email = req.body.email

    let charge = stripe.charges.create({
        amount: price,
        currency: "EGP",
        card: stripeToken,
        description: email
    }, function(err, charge) {
        if (err && err.type === 'StripeCardError') {
            console.log(JSON.stringify(err, null, 2));
        }
        console.log("completed payment!");
    });
}

};

module.exports = bookingController;
