var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const expressLayouts = require('express-ejs-layouts');

var http = require('http');             //http https リダイレクトに使用
var enforce = require('express-sslify');//http https リダイレクトに使用

var indexRouter = require('./routes/index');
var manageRouter = require('./routes/manage');

var app = express();

// http https リダイレクト----------
app.use(enforce.HTTPS());
http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});
// -------------------------------

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  next();
});



// express-ejs-layouts
app.use(expressLayouts);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// セッション利用の準備(4-3-3 手順２)  ※「var app = express();」と「app.use('/', indexRouter);」の間に記述必要有り！
const session_opt = {                   //セッションのオプション設定の値をsession_optに格納している。
  secret: 'keyboard cat',             //クライアントと通信する際の秘密鍵（ハッシュのキー）
  resave: false,                      //セッションストア？に強制的に値を保存する設定
  saveUninitialized: false,           //初期化されていない値？を強制的に保存する設定
  cookie: { maxAge: 60 * 60 * 1000}   //セッションIDを保管するクッキー側に反映させる設定
};                                        //↑ ここではクッキーの値の保管時間を1時間に設定している
app.use(session(session_opt));        //セッションの有効化

app.use('/', indexRouter);
app.use('/manage', manageRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
