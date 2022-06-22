const express = require('express');
const router = express.Router();
const db = require('../models/index');

router.get('/', function(req, res, next) {
  db.Article.findAll({
    order:[
      ['createdAt', 'DESC']
    ],
    where: {//status=trueのものだけ取得
      status: true
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
