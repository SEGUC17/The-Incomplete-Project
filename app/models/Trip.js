var mongoose = require('mongoose');

var tripSchema = mongoose.Schema({

    event:{
        type:mongoose.Schema.type.ObjectId,
        ref:'event'
    }

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

    maxPeople:Number,

    available:{
      type:Boolean,
      required:true
    }

})

var Trip = mongoose.model("trip", eventSchema);

module.exports = Trip;
