// import dependencies
const utility 		    = require('./src/helper/utility');
const express           = require('express');
const bodyParser        = require('body-parser');
const app 			    = express();
const dotenv 		    = require('dotenv').config();
const router            = express.Router();

// global variables
global.error_message    = require('./src/helper/error_message');
global.global_variable  = require('./src/helper/global_variable');
global.mongoose         = require('mongoose');
global.Schema 		    = global.mongoose.Schema;
global.bcrypt           = require('bcrypt');

// connect url string
var mongoURL            = process.env.DB_URL;

// mongodb
global.mongoose .connect(mongoURL, { useNewUrlParser : true })
.then(()=>{
    console.log('Connected to database.');
})
.catch(()=>{
    console.log('Connection failed!');
});
global.mongoose.set('useCreateIndex', true);

// set content type for form
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// default route
app.use('/api/', function(req, res, next) {
    let contentType = req.headers['content-type'];
    //console.log('Content-Type : ', contentType);
    next();
});

// v1 routes
const IndexRoutesV1 = require('./src/routes/index.route');
app.use('/api/',IndexRoutesV1);

// Setup server port
var port = process.env.PORT || 100;
app.listen(port, function () {
    console.log("Running Server on port " + port);
});