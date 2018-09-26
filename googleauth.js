const {google} = require('googleapis');
const sheets = google.sheets('v4');

const clientID = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const callbackURL = 'https://'+process.env.PROJECT_DOMAIN+'.glitch.me/oauth2callback';
const scopes = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
const oauth2Client = new google.auth.OAuth2(clientID, clientSecret, callbackURL);

const login_url = oauth2Client.generateAuthUrl({
  // 'online' (default) or 'offline' (gets refresh_token)
  access_type: 'online',
  // If you only need one scope you can pass it as a string
  scope: scopes
});


module.exports.login_url = function () {
  return login_url;
}

