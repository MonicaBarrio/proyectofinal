'use strict'

const express = require('express'),

	bodyParser = require('body-parser'),
	mongoose = require('mongoose');

const Task = require('./api/models/fModel'); //created model loading here


const app = express();

const port = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.listen(port);

  
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/HwProducts'); 




var routes = require('./api/routes/fRoutes'); //importing route
routes(app); //register the route

console.log('fgemproduct RESTful API server started on: ' + port);