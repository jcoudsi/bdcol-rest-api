exports.models = {
    "Album":{
      "id":"Album",
      "required": ["id", "titre"],
      "properties":{
        "id":{
          "type":"integer",
          "format": "int64",
          "description": "Identifiant de l'album",
          "minimum": "0.0",
          "maximum": "100.0"
        },
        "titre":{
          "type":"string",
          "description": "Titre de l'album"
        }
      }
    }
};