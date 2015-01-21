var express = require('express');
var mongoose = require('mongoose');
var models = require('./models/models');
var generalRouter = require('./routes/general');
var seriesRouter = require('./routes/series');
var albumsRouter = require('./routes/albums');
var bodyParser = require('body-parser');

var app = express();

var server = app.listen(8080, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('BDCol REST API Server listening at http://%s:%s', host, port)

});

mongoose.connect('mongodb://localhost/bdcol-bd', function(err) {
  	
    if (err) 
  	{ 
  		throw err; 
  	}

  	console.log('Database started successfully');

    app.use(bodyParser.json());

    //Application des routeurs
    app.use('/', generalRouter.router);
    app.use('/series', seriesRouter.router);
    app.use('/albums', albumsRouter.router);

    console.log('Ready to manage routes');

});