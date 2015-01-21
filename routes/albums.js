var express = require('express');
var router = express.Router();
var models = require('.././models/models');
var controller = require('.././controllers/albums');

router.get('/', function(req, res) {

	controller.findAllAlbums(function(result) {
		res.setHeader('Content-Type', 'application/json');
		res.send(result);
	});

});

router.get('/:idAlbum', function(req, res) {

	controller.findAlbum(req.params.idAlbum, function(result) {
		res.setHeader('Content-Type', 'application/json');
		res.send(result);
	});
});


router.post('/', function(req, res) {

  controller.addAlbum(req, function(error) {
  	  if (error)
  	  {
  	  	  res.send(500, error)
  	  }
  	  else
  	  {
  	  	  res.setHeader('Content-Type', 'application/json');
  	  	  res.send();
  	  }

  });

});

router.put('/:idAlbum', function(req, res) {
  res.setHeader('Content-Type', 'text/plain');
  res.send('Mise à jour de l\'album N°' + req.params.idAlbum);
});

module.exports = {
	router:router
}