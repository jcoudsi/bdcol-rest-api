var express = require('express');
var mongoose = require('mongoose');
var models = require('./models/models');
var generalRouter = require('./routes/general');
var seriesRouter = require('./routes/series');
var albumsRouter = require('./routes/albums');
var error = require('./error/error');
var bodyParser = require('body-parser');

var app = express();

var server = app.listen(8080, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('BDCol REST API Server listening at http://%s:%s', host, port)

});

// Build the connection string
var dbURI = 'mongodb://localhost/bdcol-bd';

// Create the database connection
mongoose.connect(dbURI);

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open to ' + dbURI);

    app.use(bodyParser.json());

    //Application des routeurs
    app.use('/', generalRouter.router);
    app.use('/series', seriesRouter.router);
    app.use('/albums', albumsRouter.router);

    //Cas où la requête n'existe pas : on a essayé tous les routeurs et on arrive dans ce middleware
    app.use(function(req, res) {
      res.status(404);
      res.send('Requête inexistante');
    });

    //Catch des erreurs levées lors du traitement d'une requête
    app.use(function(err, req, res, next){

      console.error(err.stack);

      if (err instanceof error.NotFound)
      {
          res.status(404).
          res.send('Ooops ! Not found !');
      }
      else
      {
          res.status(500).
          res.send('Ooops ! Something is broken :/');
      }

    });

});

// If the connection throws an error
mongoose.connection.on('error',function (err) {
  console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});
