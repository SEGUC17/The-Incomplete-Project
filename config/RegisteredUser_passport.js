// var passport = require('passport');
var LocalStrategy   = require('passport-local').Strategy;

// load up the user model
var RegisteredUser = require('../app/models/Profile');
// expose this function to our app using module.exports
module.exports = function(passport) {

	// =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    //
    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        RegisteredUser.findById(id, function(err, user) {
            done(err, user);
        });
    });

 	// =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
	// by default, if there was no name, it would just be called 'local'

    // passport.use('local-signup', new LocalStrategy({
    //     // by default, local strategy uses username and password, we will override with username
    //     usernameField : 'username',
    //     passwordField : 'password',
    //     passReqToCallback : true // allows us to pass back the entire request to the callback
    // },
    // function(req, username, password, done) {
    //
		// // find a user whose username is the same as the forms username
		// // we are checking to see if the user trying to login already exists
    //     RegisteredUser.findOne({ 'local.username' :  username }, function(err, user) {
    //         // if there are any errors, return the error
    //         if (err)
    //             return done(err);
    //
    //         // check to see if theres already a user with that username
    //         if (user) {
    //             return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
    //         } else {
    //
		// 		// if there is no user with that username
    //             // create the user
    //             var newUser            = new RegisteredUser();
    //
    //             // set the user's local credentials
    //             newUser.local.username    = username;
    //             newUser.local.password = newUser.generateHash(password); // use the generateHash function in our user model
    //
		// 		// save the user
    //             newUser.save(function(err) {
    //                 if (err)
    //                     throw err;
    //                 return done(null, newUser);
    //             });
    //         }
    //
    //     });
    //
    // }));

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    // passport.use('local-login', new LocalStrategy({
    //     // by default, local strategy uses username and password, we will override with username
    //     usernameField : 'username',
    //     passwordField : 'password',
    //     passReqToCallback : true // allows us to pass back the entire request to the callback
    // },
    // function(req, username, password, done) { // callback with username and password from our form
    //
    //     // find a user whose username is the same as the forms username
    //     // we are checking to see if the user trying to login already exists
    //
    //     RegisteredUser.findOne({ 'username' :  username }, function(err, user) {
    //         // if there are any errors, return the error before anything else
    //         if (err)
    //             return done(err);
    //
    //         // if no user is found, return the message
    //         if (!user){
    //             return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
    //             // console.log(req.flash('loginMessage').length)
    //         }
    //         // if the user is found but the password is wrong
    //         if (!user.validPassword(password)){
    //             return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
    //         }
    //         // all is well, return successful user
    //         return done(null, user);
    //     });
    //
    // }));

    const user = {
      username: 'test-user',
      password: 'test-password',
      id: "58e3b0870b1c69d2d177861c"
    }

    passport.use('login',new LocalStrategy(
      function(username, password, done) {
        done(null,user);
        // findUser(username, function (err, user) {
        //   if (err) {
        //     return done(err)
        //   }
        //   if (!user) {
        //     return done(null, false)
        //   }
        //   if (password !== user.password  ) {
        //     return done(null, false)
        //   }
        //   return done(null, user)
        // })
      }
    ))

};