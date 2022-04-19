var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  return res.render('nosotros', {title: 'Nosotros', loggedIn: req.session?.store?.loggedIn });
});

module.exports = router;