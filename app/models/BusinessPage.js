var mongoose = require('mongoose');

var businessPageSchema = mongoose.Schema({

    name:{
        type:String,
        required:true,
        unique:true
    },
    
    profile: String,

    images:[{
        content:String
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
    }],

    events:[{
      type:mongoose.Schema.type.ObjectId,
      ref:'event'
    }]
})

var BusinessPage = mongoose.model("businessPage", businessPageSchema);

module.exports = BusinessPage;
