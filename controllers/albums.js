var express = require('express');
var models = require('.././models/models');

var findAllAlbums = function(callback)
{
	models.Album.find(null, function (err, albums) {
		  
		if (err) 
	  	{ 
	  		throw err; 
	  	}

	  	if (albums)
        {
            result = JSON.stringify(albums);
        }
        else
        {
            result = null;

        }

        callback(result);

	  });
};


var findAlbum = function(idAlbum, callback)
{
	models.Album.findOne({_id:idAlbum}, function (err, album) {
				  
		if (err) 
	  	{ 
	  		throw err; 
	  	}

		if (album)
        {
            result = JSON.stringify(album);
        }
        else
        {
            result = null;

        }

        callback(result);

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