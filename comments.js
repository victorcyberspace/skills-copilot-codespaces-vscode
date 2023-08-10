// Create web server
// Author: Minh Tran Quoc

// Import module
var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');
var app = express();

// Set port
app.set('port', (process.env.PORT || 5000));

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Set body parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Set template engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Set routes
app.get('/', function(req, res) {
  res.render('index');
});

app.get('/comments', function(req, res) {
  fs.readFile('comments.json', function(err, data) {
    res.setHeader('Cache-Control', 'no-cache');
    res.json(JSON.parse(data));
  });
});

app.post('/comments', function(req, res) {
  fs.readFile('comments.json', function(err, data) {
    var comments = JSON.parse(data);
    comments.push(req.body);
    fs.writeFile('comments.json', JSON.stringify(comments, null, 4), function(err) {
      res.setHeader('Cache-Control', 'no-cache');
      res.json(comments);
    });
  });
});

// Start server
app.listen(app.get('port'), function() {
  console.log('Server is running on port ' + app.get('port'));
});