var express = require('express');
var router = express.Router();
var http = require('ykt-http-client');
/* GET home page. */
router.post('/', function(req, res, next) {
    http.get('http://127.0.0.1:3333/manage_user/add', req.body).then(function (data) {
        res.redirect('../html/denglu.html')
      })
});


router.get('/check', function (req, res, next) {
    http.get('http://127.0.0.1:3333/manage_user/find', req.query).then(function (data) {
         if(data.length>0){
             data='false';
         }
         else{
             data='true';
         }
         res.send(data)
    })
  });

module.exports = router;
