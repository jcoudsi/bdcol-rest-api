var controller = require('.././controllers/albums');

// the description will be picked up in the resource listing
exports.findAllAlbums = {
  'spec': {
    description : "Operations sur les albums",  
    path : "/albums",
    method: "GET",
    summary : "Récupère tous les albums",
    notes : "Retourne tous les albums",
    type : "Album",
    nickname : "getAlbums",
    produces : ["application/json"],
    responseMessages : ["test"]
  },
  'action': function (req,res) {

    var pet = controller.findAllAlbums(function(err, result) {

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
  }
};
