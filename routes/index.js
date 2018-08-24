var express = require('express');
var router = express.Router();
var http = require('ykt-http-client');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/session', function(req, res, next) {
  console.log(req.session.name)
    if(req.session.name){
      res.send('true')
    }else{
      res.send('false')
    }
});

router.get('/clear_session', function(req, res, next) {
  // session.removeAttribute("name");
        //  session.invalidate()
  });


router.get('/hot', function (req, res, next) {
   
  http.get('http://127.0.0.1:3333/hotBroadcast/find', req.query).then(function (data) {
   
      
      res.send(data)
    
  })
});
router.get('/sow', function (req, res, next) {
   
  http.get('http://127.0.0.1:3333/sowing/find', req.query).then(function (data) {
      
      res.send(data)
    
  })
});

router.get('/process', function (req, res, next) {
   
  http.get('http://127.0.0.1:3333/process/find', req.query).then(function (data) {
      
      res.send(data)
    
  })
});



module.exports = router;
