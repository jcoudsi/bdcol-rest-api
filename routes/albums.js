var express = require('express');
var router = express.Router();
var models = require('.././models/models');
var controller = require('.././controllers/albums');
var error = require('.././error/error');

router.get('/', function(req, res, next) {

	controller.findAllAlbums(function(err, result) {

    if (err)
    {
        next(err);
    }

    if (result)
    {
        res.setHeader('Content-Type', 'application/json');
        res.send(result);
    }
    else
    {
        next(new error.NotFound());
    }

	});

});

router.get('/:idAlbum', function(req, res, next) {

	controller.findAlbum(req.params.idAlbum, function(err, result) {
		
      if (err)
      {
          next(err);
      }
      
      if (result)
      {
          res.setHeader('Content-Type', 'application/json');
          res.send(result);  
      }
      else
      {
          next(new error.NotFound());
      }

	});
});


router.post('/', function(req, res, next) {

  controller.addAlbum(req, function(err, result) {

      if (err)
  	  {
  	  	  next(err);
  	  }
  	  else
  	  {
  	  	res.setHeader('Content-Type', 'application/json');
  	  	res.send(result);
  	  }

  });

});


router.put('/:idAlbum', function(req, res, next) {
  res.setHeader('Content-Type', 'text/plain');
  res.send('Mise à jour de l\'album N°' + req.params.idAlbum);
});

module.exports = {
	router:router
}