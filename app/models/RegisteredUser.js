var mongoose = require('mongoose');

var registeredUserSchema = mongoose.Schema({

    profile:{
        type:mongoose.Schema.type.ObjectId,
        ref:'user'
    }

})

var RegisteredUser = mongoose.model("registeredUser", registeredUserSchema);

module.exports = RegisteredUser;
