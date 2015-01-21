var express = require('express');
var router = express.Router();

// route middleware that will happen on every request
router.use(function(req, res, next) {

    // log each request to the console
    console.log(req.method, req.body, req.url);
    // continue doing what we were doing and go to the route
    next(); 
});


module.exports = {
	router:router
}