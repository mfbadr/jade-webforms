'usee strict';

var express = require('express');
var morgan = require('morgan');

var app = express();

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

app.use(morgan('dev'));
app.use(express.static(__dirname + '/static'));

app.get('/', function (req, res){
  res.render('home');
});
