var parser     = require("body-parser"),
    express    = require("express"),
    router     = require("./routes/index"),
    app        = express();
    
var port = process.env.PORT || 3000;
const dir      = __dirname;
app.set('view engine', 'ejs');
app.use("/public" , express.static(dir + '/public'));
app.use(parser.urlencoded({extended:true}));
app.use(parser.json());
app.use(router);


app.listen(port , function () {
	console.log('Magic Happens on port : ' + port+'/');
});

