var express = require('express');
var router = express.Router();

router.get('/', async function (req, res, next) {
  try {
    return res.render('nosotros', {title: 'Nosotros', loggedIn: req.session?.store?.loggedIn });
  } catch (error) {
    console.error(error);
    return res.redirect('/error');
  }
});

module.exports = router;