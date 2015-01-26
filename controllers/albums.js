var express = require('express');
var models = require('.././models/models');

var findAllAlbums = function(callback)
{
	models.Album.find(null, function (err, albums) {
		  
	  	var result = null;

	  	if (albums)
        {
            result = JSON.stringify(albums);
        }

        callback(err, result);

	  });
};


var findAlbum = function(idAlbum, callback)
{
	models.Album.findOne({_id:idAlbum}, function (err, album) {
				  
		var result = null;

		if (album)
        {
            result = JSON.stringify(album);
        }

        callback(err, result);

	  });
};


var addAlbum = function(req, callback)
{
	models.Album.create(req.body, function (error) {		  
        callback(error, req.body);
	  });
};



module.exports = {
	findAllAlbums:findAllAlbums,
	findAlbum:findAlbum,
	addAlbum:addAlbum
};