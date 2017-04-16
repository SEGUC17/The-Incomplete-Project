var express         = require('express');
var mongoose        = require('mongoose');
var morgan          = require('morgan');
var bodyParser      = require('body-parser');
var passport 	      = require('passport');
var BasicStrategy   = require('passport-http').Strategy;
var stripe          = require("stripe")("sk_test_aFldNEUKYSuPZ63JQa2hhGVD"); //Secret Key for payment method
var cookieParser    = require('cookie-parser');
var expressSession  = require('express-session');


var routes          = require('./app/routes');
var BusinessPage    = require('./app/models/BusinessPage');
var anEvent         = require('./app/models/Event');
var Owner           = require('./app/models/Owner');
var Place           = require('./app/models/Place');
var Profile         = require('./app/models/Profile');
var RegisteredUser  = require('./app/models/RegisteredUser');
var Trip            = require('./app/models/Trip');



var app             = express();
var port            = 8080;
// var DB_URI = "mongodb://localhost:27017/Portsurf";




mongoose.connect('mongodb://localhost:27017/INCOMPLETEPROJ');
app.use(morgan('dev'));

app.use(cookieParser());
app.use(expressSession({
  resave:false,
  saveUninitialized:false,
  secret:"islam2222"
}));

app.use(express.static(__dirname+ '/views'));
app.use(bodyParser.urlencoded({limit:'50mb',extended:false}));
app.use(bodyParser.json());
app.set('view engine','html');
// mongoose.connect(DB_URI);
app.use(routes);




app.listen(port,function(){
  console.log("Magic hapenning on port: "+"*"+port+"*"+" please don't delete this log .. it's fun :)");
});
