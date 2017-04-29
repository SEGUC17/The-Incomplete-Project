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
    },

    rate:{
        type:Number,
        required:true,
        default: 0,
    },

    numberOfRatings:{
        type:Number,
        required:true,
        default: 0,
    }

})

var BusinessPage = mongoose.model("businesspages", businessPageSchema);

module.exports = BusinessPage;
