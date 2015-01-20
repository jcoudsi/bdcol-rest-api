var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send('Liste des albums');
});


router.post('/', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send('Ajout d\'un album');
});


router.get('/:idAlbum', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send('Récupération de l\'album N°' + req.params.idAlbum);
});


router.put('/:idAlbum', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send('Mise à jour de l\'album N°' + req.params.idAlbum);
});

module.exports = {
	router:router
}