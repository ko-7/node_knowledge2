const express = require('express');
const router = express.Router();
const db = require('../models/index');

router.get('/', function(req, res, next) {
  db.Article.findAll({
    order:[
      ['createdAt', 'DESC'] //作成日時降順に並び替え
    ],
    where: {//status=releaseのものだけ取得
      status: "release"
    }
  }).then(articles => {
    let data = {
      contents: articles
    }
    res.render('index', data);
  }).catch(err => {
    let data = {
      err: err,
      contents: null
    }
    console.log('db error!!')
    res.render('index', data);
  })
});

router.get('/article', function(req, res, next) {
  db.Article.findByPk(req.query.id)
  .then(article => {
    let data = {
      form: article,
    }
    res.render('article', data);
  }).catch(err => {
    let data = {
      err: err,
      form: null,
    }
    console.log('error')
    res.render('index', data);
  })
});

module.exports = router;
