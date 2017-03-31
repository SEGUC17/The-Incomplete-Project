var express = require('express');
var routes = require('./app/routes');
var bodyParser = require('body-parser');
var app = express();
var port = 8080;
// var DB_URI = "mongodb://localhost:27017/Portsurf";


app.set('view engine','ejs');
app.use(bodyParser.urlencoded({limit:'50mb',extended:false}));
app.use(express.static(__dirname+ '/views'));

// mongoose.connect(DB_URI);

app.use(routes);

app.listen(port,function(){
  console.log(port);
});
