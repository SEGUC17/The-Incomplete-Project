var mongoose = require('mongoose');

var eventSchema = mongoose.Schema({

    name:{
        type:String,
        required:true,
        unique:true
    },

    description:{
        type:String,
        required:true
    },

    price:{
        type:Number,
        required:true
    },

    mustPay:{
        type:Boolean,
        required:true
    },

    image:{
        type:String
    },
    // true for place , false for trip
    isPlace:{
        type:Boolean,
        required:true
    }
})

var anEvent = mongoose.model("events", eventSchema);

module.exports = anEvent;
