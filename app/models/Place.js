var mongoose = require('mongoose');
//var Event = require('./Event')

var placeSchema = mongoose.Schema({

    anEvent:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'events',
        required:true
    },

    bookedByAt:[{
        registeredUser:{
          type:mongoose.Schema.Types.ObjectId,
          ref:'registeredusers'
        },
        time:Date
    }],

    bookedByAtWithPaying:[{
        registeredUser:{
          type:mongoose.Schema.Types.ObjectId,
          ref:'registeredusers'
        },
        time:Date
    }],

    openingTimes:{
      type:[Date],
      required:true
    },

    //minutes
    period:Number
})

var Place = mongoose.model("places", placeSchema);

module.exports = Place;
