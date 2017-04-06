var mongoose = require('mongoose');

var ownerSchema = mongoose.Schema({

    companyName:{
        type:String,
        required:true,
        unique:true
    },

    profile:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'profiles'
    },

    businessPage:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'businesspages'
    }
})

var Owner = mongoose.model("owners", ownerSchema);

module.exports = Owner;
