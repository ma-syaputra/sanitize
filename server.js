var express = require('express')
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));


const sanitize = require('./controllers/sanitize');

app.get('/', sanitize.home);
app.post('/sanitize', sanitize.clean);


app.listen(3009)

console.log('Running')