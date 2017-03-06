var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var tasks = require('./routes/tasks');
var port = 5000;

app.use(express.static('server/public'));

app.use(bodyParser.urlencoded({extended: true})); // this creates req.body

app.use('/tasks', tasks);

app.listen(port, function() {
  console.log('We are running on port: ', port);
});
