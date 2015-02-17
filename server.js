var express = require('express');
var mongoose = require('mongoose');
var models = require('./models/models');
var swaggerModels = require('./models/swagger_models');
var generalRouter = require('./routes/general');
var seriesRouter = require('./routes/series');
var albumsRouter = require('./routes/albums');
var error = require('./error/error');
var bodyParser = require('body-parser');
var swagger = require("swagger-node-express");
var resources = require("./resources/albums");

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

    // Couple the application to the Swagger module. 
    swagger.setAppHandler(app);

    // Add models and methods to swagger
    swagger.addModels(swaggerModels)
      .addGet(resources.findAllAlbums);

    swagger.configureDeclaration("albums", {
      description : "Operations about albums",
      authorizations : ["oauth2"],
      produces: ["application/json"]
    });

    // set api info
    swagger.setApiInfo({
      title: "Swagger Sample App",
      description: "This is a sample server Petstore server. You can find out more about Swagger at <a href=\"http://swagger.wordnik.com\">http://swagger.wordnik.com</a> or on irc.freenode.net, #swagger.  For this sample, you can use the api key \"special-key\" to test the authorization filters",
      termsOfServiceUrl: "http://helloreverb.com/terms/",
      contact: "apiteam@wordnik.com",
      license: "Apache 2.0",
      licenseUrl: "http://www.apache.org/licenses/LICENSE-2.0.html"
    });

    swagger.setAuthorizations({
      apiKey: {
        type: "apiKey",
        passAs: "header"
      }
    });

    // Configures the app's base path and api version.
    swagger.configureSwaggerPaths("", "api-docs", "")
    swagger.configure("http://localhost:8080", "1.0.0");

    // Serve up swagger ui at /docs via static route
    var docs_handler = express.static(__dirname + '/swagger-ui/');
    app.get(/^\/docs(\/.*)?$/, function(req, res, next) {
      console.log('URL : ' + req.url);
      if (req.url === '/docs') { // express static barfs on root url w/o trailing slash
        console.log('BLIP');
        res.writeHead(302, { 'Location' : req.url + '/' });
        res.end();
        return;
      }
      // take off leading /docs so that connect locates file correctly
      req.url = req.url.substr('/docs'.length);
      return docs_handler(req, res, next);
    });

    app.get('/throw/some/error', function(){
      throw {
        status: 500,
        message: 'we just threw an error for a test case!'
      };
    });



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
          res.status(404);
          res.send('Ooops ! Not found !');
      }
      else
      {
          res.status(500);
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
