
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

const db = require('./sequelize-db.js');

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

app.use(function(req, res, next) {
  if ( req.path == '/oauth2callback') {
    next();
    return;
  } 
  if (req.session.user == null && 
        (
          req.path != '/welcome'
      &&  req.path != '/solvepad'
      &&  req.path != '/testsolve_url'
        )
    ) {
    if (req.path == '/') {
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

app.get("/oauth2callback", function (req, res) {
  googleauth.oauth2Client.getToken(req.query.code)
    .then( token_res =>  {
      googleauth.oauth2Client.setCredentials(token_res.tokens);
      console.log('set credentials');
      googleauth.userinfo()
      .then( userinfo_res => {
        console.log(userinfo_res.data);
        db.User.findOrCreate({
          where: { google_id: userinfo_res.data.id},
          defaults: { 
            display_name: userinfo_res.data.name,
            google_name: userinfo_res.data.email
          }})
          .spread((user, created) => {
            const user_data = user.get();
            console.log('user ok', user_data, created);
            req.session.user_id = user_data.id;
        });
        res.redirect('/welcome');
      })
      .catch( (err) => {
        console.log('userinfo failure',err);
        res.redirect('/welcome');
      });
    })
    .catch( (err) => {
      console.log('token failure',err);
      res.redirect('/welcome');
    });
});

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
