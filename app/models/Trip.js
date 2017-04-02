var mongoose = require('mongoose');

var tripSchema = mongoose.Schema({

    anEvent:{
        type:mongoose.Schema.type.ObjectId,
        ref:'event',
        required:true
    },

    bookedByAt:[{
        registeredUser:[{
          type:mongoose.Schema.type.ObjectId,
          ref:'registeredUser'
        }],
        time:Date
    }],

    bookedByAtWithPaying:[{
        registeredUser:[{
          type:mongoose.Schema.type.ObjectId,
          ref:'registeredUser'
        }],
        time:Date
    }],

    startDate:{
        type:Date,
        required:true
    },

    endDate:{
        type:Date,
        required:true
    },

    maxPeople:Number

})

var Trip = mongoose.model("trip", eventSchema);

module.exports = Trip;
