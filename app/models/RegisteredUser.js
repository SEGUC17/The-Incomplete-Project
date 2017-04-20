var mongoose = require('mongoose');

var registeredUserSchema = mongoose.Schema({

    profile:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'profiles',
        required:true
    }

});




registeredUserSchema.pre('save', function(next) {
    var registeredUser = this;

    // only hash the password if it has been modified (or is new)
    if (!registeredUser.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(registeredUser.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            registeredUser.password = hash;
            next();
        });
    });
});


registeredUserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};




var RegisteredUser = mongoose.model("registeredusers", registeredUserSchema);

module.exports = RegisteredUser;
