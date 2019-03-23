var parser     = require("body-parser"),
    express    = require("express"),
    router     = require("./routes/index"),
    app        = express();
    

const dir      = __dirname;
app.set('view engine', 'ejs');
app.use("/public" , express.static(dir + '/public'));
app.use(parser.urlencoded({extended:true}));
app.use(parser.json());
app.use(router);

app.set('port',3000);

var server = app.listen(app.get('port'),()=>{
    var port = server.address().port;
    console.log("Magic Happens on port : ",port);
});
