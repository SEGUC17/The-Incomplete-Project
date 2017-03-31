var mongoose = require('mongoose');

var ownerSchema = mongoose.Schema({

    companyName:{
        type:String,
        required:true,
        unique:true
    },

    user:{
        type:mongoose.Schema.type.ObjectId,
        ref:'user'
    },
    
    businessPage:{
        type:mongoose.Schema.type.ObjectId,
        ref:'businessPage'
    }
})

var Owner = mongoose.model("owner", ownerSchema);

module.exports = Owner;
