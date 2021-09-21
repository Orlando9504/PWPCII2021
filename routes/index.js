var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
                        /*View Model */
  res.render('index', { title: 'Express', author:'Orlando', AppName:'WebApp' });
});

/* Agregando nueva ruta */
router.get('/greeting',function(req,res,next){
  res.send('Hola campeón de la fullstack web');
});

module.exports = router;
