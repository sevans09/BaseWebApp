var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname));

// views is directory for all template files
app.set('views', __dirname + '/html');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
}); 

app.get('/weather', function(request, response) {
  response.render('pages/weather');
});

app.get('/btc', function(request, response) {
  response.render('pages/btc');
});

app.get('/advice', function(request, response) {
  response.render('pages/advice');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

