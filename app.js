const express = require('express');

var app = express();

const port = 8080;

app.use(express.static('public'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(port);
console.log(`Server listening on http://localhost:${port}`);