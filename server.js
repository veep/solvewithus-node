
const express = require('express');
const app = express();
app.use(express.static('public'));

const exphbs  = require('express-handlebars');
const util = require('./util.js');
const hbs = exphbs.create({
  defaultLayout: 'main',
  helpers: util.get_handlebars_helpers()
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

require('./session.js')(app);
const googleauth = require('./googleauth.js');

const queryString = require('query-string');
const request = require('request-promise-native');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

/* global Set */  // Make the linter happy
const equal = require('deep-equal');
Promise.prototype.thenWait = function thenWait(time) {
    return this.then(result => new Promise(resolve => setTimeout(resolve, time, result)));
};

const dbPromise = require('./db.js');

app.use(function(req, res, next) {
  if (req.session.user == null && 
        (
          req.originalUrl != '/welcome'
      &&  req.originalUrl != '/solvepad'
      &&  req.originalUrl != '/testsolve_url'
        )
    ) {
    if (req.originalUrl == '/') {
      console.log('redirecting to welcome');
      res.redirect('/welcome');
    } else {
      console.log('redirecting to login');
      // TODO oauth login and come back
      res.redirect(googleauth.login_url());
    }
  } else {
    console.log('auth ok');
    next();
  }
});

app.get("/", function (req, res) {
    res.redirect('/event');
});
app.get("/welcome", function(req, res) {
  res.render('home');
});

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
