var mongoose = require('mongoose');

var businessPageSchema = mongoose.Schema({

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

    phoneNumbers:[{
        type:String,
        required:true,
        unique:true
    }],

    events:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:'events'
    }],

    numberOfViews:{
        type:Number,
        required:false
    }
})

var BusinessPage = mongoose.model("businesspages", businessPageSchema);

module.exports = BusinessPage;
