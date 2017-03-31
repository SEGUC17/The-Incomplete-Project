var mongoose = require('mongoose');

var registeredUserSchema = mongoose.Schema({

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
    gender:char
})

var RegisteredUser = mongoose.model("registeredUser", registeredUserSchema);

module.exports = RegisteredUser;
