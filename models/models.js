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