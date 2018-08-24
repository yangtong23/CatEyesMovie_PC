var express = require('express');
var router = express.Router();
var http = require('ykt-http-client');
/* GET home page. */



router.get('/', function (req, res, next) {
   
    http.get('http://127.0.0.1:3333/info/find', req.query).then(function (data) {
        console.log(data)
        res.send(data)
      
    })
});

module.exports = router;