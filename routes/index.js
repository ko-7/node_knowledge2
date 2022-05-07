const express = require('express');
const router = express.Router();
const db = require('../models/index');

/* GET home page. */
router.get('/', function(req, res, next) {
  db.Article.findAll({
    where: {//status=trueのものだけ取得
      status: true
    }
  }).then(articles => {
    var data = {
      contents: articles
    }
    res.render('index', data);
  });
});

router.get('/article', function(req, res, next) {
  db.Article.findByPk(req.query.id)
  .then(article => {
    let data = {
      form: article,
    }
    res.render('article', data);
  })
});

module.exports = router;
