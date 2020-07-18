var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  if (req.session && req.session.loggedin) {
    res.redirect('/complaints');
  } else {
    res.render('index', { title: 'Sahaya' });
  }
});

router.get('/pages/:pageId', function (req, res, next) {
  res.render('pages/' + req.params.pageId, { title: req.params.pageId });
});

module.exports = router;
