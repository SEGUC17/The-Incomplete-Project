var mongoose = require('mongoose');

var profileSchema = mongoose.Schema({

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

    isRegisteredUser:{
        type: Boolean,
        default:true,
        required:true
    }
})

var Profile = mongoose.model("profiles", profileSchema);

module.exports = Profile;
