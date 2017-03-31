var mongoose = require('mongoose');

var ownerSchema = mongoose.Schema({

    companyName:{
        type:String,
        required:true,
        unique:true
    },

    businessPage:{
      type:mongoose.Schema.type.ObjectId,
      ref:'businessPage'
    },

    username:{
        type:String,
        required:true,
        unique:true
    },

    password:{
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
    gender:String
})

var Owner = mongoose.model("owner", ownerSchema);

module.exports = Owner;
