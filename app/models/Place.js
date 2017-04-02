var mongoose = require('mongoose');
//var Event = require('./Event')

var placeSchema = mongoose.Schema({

    anEvent:{
        type:mongoose.Schema.type.ObjectId,
        ref:'event',
        required:true
    },

    bookedByAt:[{
        registeredUser:{
          type:mongoose.Schema.type.ObjectId,
          ref:'registeredUser'
        },
        time:Date
    }],

    bookedByAtWithPaying:[{
        registeredUser:{
          type:mongoose.Schema.type.ObjectId,
          ref:'registeredUser'
        },
        time:Date
    }],

    openingTimes:{
      type:[Date],
      required:true;
    },

    //minutes
    period:Number
})

var Place = mongoose.model("place", eventSchema);

module.exports = Place;
