var mongoose = require('mongoose');

var tripSchema = mongoose.Schema({

    anEvent:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'events',
        required:true
    },

    bookedByAt:[{
        registeredUser:{
          type:mongoose.Schema.Types.ObjectId,
          ref:'registeredusers'
        }
    }],

    bookedByAtWithPaying:[{
        registeredUser:{
          type:mongoose.Schema.Types.ObjectId,
          ref:'registeredusers'
        }
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

var Trip = mongoose.model("trips", tripSchema);

module.exports = Trip;
