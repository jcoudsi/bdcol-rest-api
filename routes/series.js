var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

router.get('/', function(req, res, next) {
  res.setHeader('Content-Type', 'text/plain');
  res.send('Liste des séries');
});


router.post('/', function(req, res, next) {
  res.setHeader('Content-Type', 'text/plain');
  res.send('Ajout d\'une série');
});


router.get('/:idSerie', function(req, res, next) {
  res.setHeader('Content-Type', 'text/plain');
  res.send('Récupération de la série N°' + req.params.idSerie);
});


router.put('/:idSerie', function(req, res, next) {
  res.setHeader('Content-Type', 'text/plain');
  res.send('Mise à jour de la série N°' + req.params.idSerie);
});


module.exports = {
	router:router
}