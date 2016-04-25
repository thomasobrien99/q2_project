require('dotenv').load();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const morgan = require("morgan");
const routes = require('./routes');
const session = require('cookie-session');
const flash = require('connect-flash');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const authHelpers = require("./helpers/authHelpers");

app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(morgan("dev"))
app.use(express.static(__dirname + '/public'));

//get auth.js module
var auth = require('./routes/auth');


app.use(session({
  secret: process.env.SECRET
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./helpers/passport')(passport);
app.use(authHelpers.currentUser);

app.get('/', (req,res)=>{
	res.render('home');
});

app.use('/users', routes.users);
app.use('/auth', routes.auth);
app.use('/threads', routes.threads);
app.use('/languages', routes.languages);

app.listen(3000, ()=>{
	console.log('Server listening on port 3000...');
});
