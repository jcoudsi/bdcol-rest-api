var express = require('express')
var mongoose = require('mongoose')
var app = express()


var server = app.listen(8080, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('BDCol REST API Server listening at http://%s:%s', host, port)

})

app.get('/series', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({test:2}));
})

app.get('/:idSerie', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({
  		idSerie:req.params.idSerie
  	}
  ));
})

app.get('/:idSerie/:idAlbum', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({
  		idSerie:req.params.idSerie,
  		idAlbum:req.params.idAlbum
  	}
  ));
})

