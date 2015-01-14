var express = require('express');
var mongoose = require('mongoose');
var models = require('./models/models');
var promise = require('promise')

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

	app.get('/series', function (req, res) {

	  models.Album.find(null, function (err, albums) {
		  
		if (err) 
	  	{ 
	  		throw err; 
	  	}

	  	if (albums)
        {
            res.status(200);
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(albums));
        }
        else
        {
            res.status(404);
            res.send();
            
        }

	  });

  	});

	app.get('/:idSerie', function (req, res) {

	  res.setHeader('Content-Type', 'application/json');
	  res.send(JSON.stringify({
	  		idSerie:req.params.idSerie
	  	}
	  ));

	})

	app.get('/:idSerie/:idAlbum', function (req, res) {

	  models.Album.findOne({_id:req.params.idAlbum}, function (err, album) {
		  
		if (err) 
	  	{ 
	  		throw err; 
	  	}

        if (album)
        {
            res.status(200);
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(album));
        }
        else
        {
            res.status(404);
            res.send();
            
        }

	  });
	})
});