var express = require('express');
var bodyParser = require('body-parser');
var pgp = require('pg-promise')();

var app = express();
var db = pgp('postgres://postgres:iheartcode@localhost:5432/high-scores');

var username;

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//home page
app.get('/', function(req, res){
  res.render('index', {accepted: true});
});

//game page
app.post('/game.ejs', function(req, res, next){
  console.log(req.body.username + " " + req.body.password);
  db.one('SELECT * FROM scores WHERE username = $1', req.body.username)
  .then(function(data){
    if(data.password == req.body.password) {
      res.render('game', {user: data});
      username = req.body.username;
    }
  })
  .catch(function(err) {
    res.render('index', {accepted: false});
  });
});

app.post('/score-submit.ejs', function(req, res, next) {
  console.log(req.body.id + " " + req.body.score);
    db.none('UPDATE scores SET score=$1 WHERE id=$2',
          [req.body.score, req.body.id])
      .then(function (data) {
        res.redirect('/');
      })
      .catch(function (err) {
        return next(err);
      });
});

//player must register to play
app.get('/register', function(req, res){
  res.render('register', {accepted: true});
});

app.post('/register.ejs', function(req, res, next){
  console.log(req.body.username + " " + req.body.password);
  //check user name for existence
  db.one('SELECT * FROM scores WHERE username = $1', req.body.username)
  .then(function(data){
      res.render('register', {accepted: false});
  })
  .catch(function(err) {
    db.none('INSERT INTO scores(username, password)' +
        'VALUES(${username}, ${password})',
      req.body)
      .then(function () {
        res.render('index', {accepted: true});
      })
      .catch(function (err) {
          return next(err);
      });
  });
});

app.listen(3000, function(){
  console.log("The server is running");
});
