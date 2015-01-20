var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send('Liste des séries');
});


router.post('/', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send('Ajout d\'une série');
});


router.get('/:idSerie', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send('Récupération de la série N°' + req.params.idSerie);
});


router.put('/:idSerie', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send('Mise à jour de la série N°' + req.params.idSerie);
});


module.exports = {
	router:router
}