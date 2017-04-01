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
        content:String
    }

})

var anEvent = mongoose.model("event", eventSchema);

module.exports = anEvent;
