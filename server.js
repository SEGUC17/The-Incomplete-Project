/*
Secret Key: sk_test_aFldNEUKYSuPZ63JQa2hhGVD
Publish Key: pk_test_xquclYSbmBZnHxkNCvqEPbR7
Used for payment methods
*/


var express = require('express');
var stripe= require("stripe")("sk_test_aFldNEUKYSuPZ63JQa2hhGVD"); //Secret Key for payment method
//var hbs= require("hbs"); //handlebars template engine//
var routes = require('./app/routes');
var bodyParser = require('body-parser');
var ejs = require('ejs');

var app = express();
var port = 8080;
// var DB_URI = "mongodb://localhost:27017/Portsurf";


app.set('view engine','ejs');
app.use(express.static(__dirname+ '/views'));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({limit:'50mb',extended:false}));


// mongoose.connect(DB_URI);

app.use(routes);

app.listen(port,function(){
  console.log(port);
});
