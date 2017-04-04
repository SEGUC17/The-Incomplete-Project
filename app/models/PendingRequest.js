//this model has the attributes of the profile, owner and business page respectively

var mongoose = require('mongoose');

var pendingRequestSchema = mongoose.Schema({

    firstName:{
        type:String,
        required:true
    },

    lastName:{
        type:String,
        required:true
    },

    username:{
        type:String,
        required:true,
        unique:true
    },

    Password:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true,
        unique:true
    },

    mobileNumber:{
        type:String,
        required:true,
        unique:true
    },

    address:String,
    gender:String,

    companyName:{
        type:String,
        required:true,
        unique:true
    },

    name:{
        type:String,
        required:true,
        unique:true
    },

    profileImg: String,

    images:[{
        type:String
    }],

    description:{
        type:String
    },

    addresses:[{
        type:String
    }],

    phoneNumber:[{
        type:String,
        required:true,
        unique:true
    }]
})

var PendingRequest = mongoose.model("pendingrequests", pendingRequestSchema);

module.exports = PendingRequest;
