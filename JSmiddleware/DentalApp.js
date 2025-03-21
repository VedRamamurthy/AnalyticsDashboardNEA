var express = require('express'); // Web Framework
var app = express();
var sql = require('mssql'); // MS Sql Server client
var bodyParser = require("body-parser");
var sqlConfig = require('./config')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin,Authorization, X-Requested-With, Content-Type, Accept, Content-Length");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    res.header("Access-Control-Expose-Headers","Content-Length");
    next();
});

sql.connect(sqlConfig);

var cors = require('cors')
app.use(cors({
  origin: ['http://localhost:4200']
}));
//

var Configurations= require('./Routes/Configurations');


var server = app.listen(4200, function () { 
    var host = server.address().address
    var port = server.address().port

    console.log("app listening at http://%s:%s", host, port)
});



app.use('/Configurations',Configurations)


module.exports = app;