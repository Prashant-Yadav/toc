const express = require('express');

//files to server API 
var root = require('./api/root.json');
var child = require('./api/child.json');

var app = express();

const port = 8080;

app.use(express.static('public'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header('Access-Control-Allow-Origin', req.headers.origin);

  next();
});

//APIs start here
app.get('/api/book/:bookId', function(req,res){
  var bookId = req.params.bookId;
  var item = root[bookId.toLowerCase()];
  var response = {response: null, status: 'OK', statusCode: 200}
  if(item) {
    response.response = item;
    return res.json(response);
  } 
  response.status = 'NOT-FOUND';
  response.statusCode = 404;
  response.response = {
    message: 'Book not found in DB'
  }
  res.status(404).json(response);
});
  
app.get('/api/book/:bookId/section/:sectionId', function(req,res){
  var bookId = req.params.bookId;
  var sectionId = req.params.sectionId;

  var item = child[bookId.toLowerCase()];
  var response = {response: {}, status: 'OK', statusCode: 200}
  if(item) {
    var sectionItem = item[sectionId];
    if(sectionItem) {
      response.response[sectionId] = sectionItem;
      return setTimeout(function(){
        res.json(response);
      }, (Math.random() * 500 + 500))
    }
  } 
  response.status = 'NOT-FOUND';
  response.statusCode = 404;
  response.response = {
    message: 'Book or section not found in DB'
  }
  res.status(404).json(response);
});

app.get('*', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(port);
console.log(`Server listening on http://localhost:${port}`);