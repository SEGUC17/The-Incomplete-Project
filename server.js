/*
Secret Key: sk_test_aFldNEUKYSuPZ63JQa2hhGVD
Publish Key: pk_test_xquclYSbmBZnHxkNCvqEPbR7
Used for payment methods
*/

var express       = require('express');
var mongoose      = require('mongoose');
var morgan        = require('morgan');
var bodyParser    = require('body-parser');
var passport 	  = require('passport');
var BasicStrategy = require('passport-http').Strategy;
var stripe= require("stripe")("sk_test_aFldNEUKYSuPZ63JQa2hhGVD"); //Secret Key for payment method



var routes = require('./app/routes');


var app = express();
var port = 8080;
// var DB_URI = "mongodb://localhost:27017/Portsurf";

mongoose.connect('mongodb://localhost:27017/INCOMPLETEPROJ');






// passport.use(new BasicStrategy(
//   function(username, password, done) {
//     User.findOne({ username: username }, function (err, user) {
//       if (err) { return done(err); }
//       if (!user) { return done(null, false); }
//       if (!user.validPassword(password)) { return done(null, false); }
//       return done(null, user);
//     });
//   }
// ));


passport.serializeUser(function(user, done) {
  done(null, user._id);
});


passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});






app.use(express.static(__dirname+ '/views'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({limit:'50mb',extended:false}));
app.use(bodyParser.json());
// mongoose.connect(DB_URI);
app.use(routes);




app.listen(port,function(){
  console.log(port);
});
