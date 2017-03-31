var app = express();
var port = 8080;
app.set('view engine','ejs');
app.use(routes);
app.listen(process.env.PORT||port);
