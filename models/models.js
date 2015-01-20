var mongoose = require('mongoose');

var albumsSchema = new mongoose.Schema({
	  _id : {
	  	type: Number
	  },
	  titre : { 
	  	type : String 
	  },
	});

var Album = mongoose.model('albums', albumsSchema);

module.exports = {
	Album:Album
}


/*app.get('/series', function (req, res) {

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
            res.setHeader('Content-Type', 'text/plain');
            res.send('Not found');
            
        }

	  });
	})*/