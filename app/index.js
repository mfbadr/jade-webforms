'use strict';

var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var app = express();

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');


app.use(morgan('dev'));
app.use(express.static(__dirname + '/static'));

app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function (req, res){
  res.render('home');
});

app.get('/calc', function (req, res){
  res.render('calc');
});


app.post('/calc', function (req, res){
  var result;
  switch(req.body.op){
    case '+':
      result = (req.body.x * 1) + (req.body.y * 1);
      break;
    case '-':
      result = (req.body.x * 1) - (req.body.y * 1);
      break;
    case '*':
      result = (req.body.x * 1) * (req.body.y * 1);
      break;
    case '/':
      result = (req.body.x * 1) / (req.body.y * 1);
      break;
  }
  
  res.render('calc', {result:result, x:req.body.x, y:req.body.y, equals:'=', op:req.body.op});
});

var port = process.env.PORT;

app.listen(port, function(){
  console.log('Express is listening on PORT', port + '...');
});
