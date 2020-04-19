var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  if (req.session && req.session.loggedin) {
    res.redirect('/complaints');
  } else {
    res.render('index', { title: 'Sahaya' });
  }
});

module.exports = router;
