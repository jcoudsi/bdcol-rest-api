var express = require('express');
var router = express.Router();
var models = require('.././models/models');

router.get('/', function(req, res) {
  res.setHeader('Content-Type', 'application/json');

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
            res.setHeader('Content-Type', 'text/plain');
            res.send('Not found');
            
        }

	  });



  //res.send('Liste des albums');
});


router.post('/', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send('Ajout d\'un album');
});


router.get('/:idAlbum', function(req, res) {
  res.setHeader('Content-Type', 'application/json');

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
	        res.setHeader('Content-Type', 'text/plain');
	        res.send('Not found');
	        
	    }

  });
});


router.put('/:idAlbum', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send('Mise à jour de l\'album N°' + req.params.idAlbum);
});

module.exports = {
	router:router
}