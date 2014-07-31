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

app.get('/boxes', function (req, res){
  res.render('box1');
});

app.post('/boxes', function (req, res){
  //turn colors into array of strings
  var colors = req.body.colors.split(',');
  // turn boxes to a number 
  var boxes = parseInt(req.body.boxes);
  //turn string of width range into two numbers
  var widthRange = req.body.width.split('-');
  var widthMin = parseInt(widthRange[0]);
  var widthMax = parseInt(widthRange[1]);
  //turn string of height range into two numbers
  var heightRange = req.body.height.split('-');
  var heightMin = parseInt(heightRange[0]);
  var heightMax = parseInt(heightRange[1]);
  console.log(colors, '# boxes =' + boxes, 'width is from', widthMin + '-' + widthMax, 'height is from', heightMin, '-', heightMax);
    
  var allBoxes = [];
  

  for( var i = 0; i < boxes; i++){
    var thisBox = {};
    thisBox.width = Math.floor(Math.random() * ( (  widthMax - widthMin) +1  ) + widthMin )  ;
    thisBox.height = Math.floor(Math.random() *( ( heightMax - heightMin) +1 ) + heightMin );
    var colorNum = Math.floor(Math.random() * colors.length);
    thisBox.color = colors[colorNum];
    allBoxes.push(thisBox);
  }
//  console.log(allBoxes); 
  res.render('box2', {boxes:allBoxes});
});
  

var port = process.env.PORT;

app.listen(port, function(){
  console.log('Express is listening on PORT', port + '...');
});
