var express = require('express');
var router = express.Router();
var http = require('ykt-http-client');
/* GET home page. */



router.post('/', function (req, res, next) {
    req.body.findType = "exact";
    http.get('http://127.0.0.1:3333/manage_user/find', req.body).then(function (data) {
        console.log(data)

        if (data.length > 0) {
            req.session.name = req.body.phone;
            console.log(req.session.name)
            res.redirect('../html/index.html')
            
        }
        else {
            res.redirect('../html/denglu.html?error=true')
        }
        res.send(data)
    })
});

module.exports = router;