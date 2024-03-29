const express = require('express');
const router = express.Router();
const db = require('../models/index');

// 一覧ページ----------------------------------------------
router.get('/', function(req, res, next) {
  if (logincheck(req, res)){ return };      //ログインチェック
  db.Article.findAll({
    order:[
      ['createdAt', 'DESC'] //作成日時降順に並び替え
    ],
  }).then(articles => {
    var data = {
      contents: articles
    }
    res.render('manage/index', data);
  }).catch(err => {
    var data = {
      err: err,
      contents: null
    }
    res.render('manage', data);
  });
});



// 記事ページ　新規作成-----------------------------------------
router.get('/article/add', function(req, res, next) {
  if (logincheck(req, res)){ return };      //ログインチェック
  var data = {
    //formの値はeditとaddで同じejsファイル使用してもエラー出ないようにするためのフェイクデータ。
    form: {id: 0, status: null, date: null, genre: null, title: null, headerimg:null, herderimgsource:null, body: null},
    path: "add"
  }
  res.render('manage/article', data);
});
router.post('/article/add', (req, res, next) => {
  if (logincheck(req, res)){ return };      //ログインチェック
  const form = {
    // 「req.body.～」でformから値受け取る
    status: req.body.status,
    date: req.body.date,
    genre: req.body.genre,
    title: req.body.title,
    headerimg: req.body.headerimg,
    headerimgsource: req.body.headerimgsource,
    body: req.body.body
  };
  db.sequelize.sync()
    .then(() => db.Article.create(form)
      .then(article => {
        res.redirect('/manage')
        console.log('add complete !!');
      })
      .catch(err => {
        var data = {
          form: form,
          err: err,
          path: "add"
        }
        console.log('add error !!');
        res.render('manage/article', data);
      })
    );
})

// 記事ページ 編集----------------------------------------------
router.get('/article/edit', function(req, res, next) {
  if (logincheck(req, res)){ return };      //ログインチェック
  db.Article.findByPk(req.query.id)
  .then(article => {
    var data = {
      form: article,
      path: 'edit'
    }
    res.render('manage/article', data);
  }).catch(err => {
    var data = {
      err: err
    }
    res.render('manage', data);
  });
});
router.post('/article/edit', function(req, res, next){
  if (logincheck(req, res)){ return };      //ログインチェック
  db.sequelize.sync()
  .then(() => db.Article.update({
    status: req.body.status,
    date: req.body.date,
    genre: req.body.genre,
    title: req.body.title,
    headerimg: req.body.headerimg,
    headerimgsource: req.body.headerimgsource,
    body: req.body.body
  },
  {
    where: {id: req.body.id}
  })).then(article => {
    res.redirect('/manage');
  }).catch(err => {
    var data = {
      err: err
    }
    console.log("db error")
    res.render('manage/article/edit', data);
  });
})

// 記事ページ　削除---------------------------------------------
router.post('/article/delete', (req, res, next) => {
  if (logincheck(req, res)){ return };      //ログインチェック
  db.sequelize.sync()
  .then(() => db.Article.destroy({
    // パラメータで値を受け取る
    where: {id: req.query.id}
  }))
  .then(article => {
    res.redirect('/manage');
    console.log('delete complete !!');
  }).catch(err => {
    var data = {
      err: err
    }
    res.render('manage/article/edit', data);
    console.log('delete error !!')
  });
});

// ログイン-----------------------------------------------------
router.get('/login', (req, res, next) => {
  var data = {
    content: '名前とパスワードを入力下さい。'
  }
  res.render('manage/login', data);
});
router.post('/login', (req, res, next) => {
  db.User.findOne({
    where: {
      name: req.body.name,
      pass: req.body.pass,
    }
  }).then(usr => {
    if (usr != null){
      req.session.login = usr;
      var back = req.session.back;
      if (back == null){
        back = '/manage';
      }
      res.redirect(back);
    }else{
      var data = {
        content: '名前かパスワードに問題があります。再度入力下さい。'
      }
      res.render('manage/login', data);
    }
  }).catch(err => {
    var data = {
      err: err
    }
    res.render('manage/login', data);
  })
});

// ログインのチェック
function logincheck(req, res){
  if(req.session.login == null){
    req.session.back = '/manage';
    res.redirect('/manage/login');
    return true;
  }else{
    return false;
  }
}

// ユーザー新規作成----------------------------------------------------
router.post('/login/useradd', (req, res, next) => {
  const form = {
    name: req.body.name,
    pass: req.body.pass,
  };
  db.sequelize.sync()
    .then(() => db.User.create(form)
      .then(usr => {
        res.redirect('/manage')
      })
      .catch(err => {
        var data = {
          form: form,
          err: err
        }
        res.render('manage/login', data);
      })
    );
})

module.exports = router;