var express = require("express"),
  exphbs  = require("express3-handlebars"),
  helpers = require("./src/helper"),
  app = express(),
  dashboardroutes = require("./routes/dashboardRoutes"),
  path = require("path"),
  passport = require('passport'),
  GoogleStrategy = require('passport-google-oauth').OAuth2Strategy

// API Access link for creating client ID and secret:
// https://code.google.com/apis/console/
var GOOGLE_CLIENT_ID = "50690959862-gehe3hl63oqvdh7moa0ert7rn45pd8q1.apps.googleusercontent.com";
var GOOGLE_CLIENT_SECRET = "2n5knmIAIHKe59eQsIU0B6cw";
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3006/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    profile.accessToken = accessToken;
    process.nextTick(function () {
      return done(null, profile);
    });
  }
));


app.set('views', __dirname + '/../client/views');
app.set("view engine", "jade");

app.set("port", process.env.PORT || 3006);

app.use(express.cookieParser("featuretoggle"));
app.use(express.session());
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

app.use(express.favicon());
app.use(express.logger("dev"));
app.use(passport.initialize());
app.use(passport.session());

app.use(app.router);

app.use(express.static(path.join(__dirname, '/../public')));
app.use('/bower_components',  express.static(path.join(__dirname, '/../public/bower_components')));

app.use(express.static(path.join(__dirname, "/../client")));

app.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/userinfo.profile',
                                            'https://www.googleapis.com/auth/userinfo.email'] }),
  function(req, res){
    // The request will be redirected to Google for authentication, so this
    // function will not be called.
  });

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/oops' }),
  function(req, res) {
    res.redirect('/');
  });
function ensureAuthenticated(req, res, next) {
  console.log(req.isAuthenticated())
  if (req.isAuthenticated()) {
    var email = req.user._json.email
    if(email.indexOf("@opentable.com") > -1) {
      return next();
    }
    else {
      req.logout();
      return res.redirect("/notopentableemployee")
    }
  }
  res.redirect('/auth/google');
}
app.get("/", ensureAuthenticated, dashboardroutes.dashboard);
app.get("/notopentableemployee", function(req, res){
  res.send("Sorry, you are not using opentable email account");
});
app.get('/partials/:name', dashboardroutes.partials);

console.log("Starting up feature toggle dashboard on port " + app.get('port'));

app.listen(app.get("port"));
