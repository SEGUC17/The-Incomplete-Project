var mongoose = require('mongoose');
//var Event = require('./Event')

var placeSchema = mongoose.Schema({

    event:{
        type:mongoose.Schema.type.ObjectId,
        ref:'event'
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
    }]

})

var Place = mongoose.model("place", eventSchema);

module.exports = Place;
