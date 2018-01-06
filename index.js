require("dotenv").config();
var bodyParser = require("body-parser");
var express = require("express");
var ejsLayouts = require("express-ejs-layouts");
var flash = require("connect-flash");
var isLoggedIn = require("./middleware/isLoggedIn")
var passport = require("./config/passportConfig");
var session = require("express-session");
var app = express();

//set up middleware
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: false }));
app.use(ejsLayouts);
app.use(session({
	secret: process.env.SESSION_SECRET, //secret defined in .env file
	resave: false,
	saveUninitialized: true
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.alerts = req.flash();
	next();
});

//set up the homepage route
app.get("/", function(req, res){
	res.render("home")
	// res.send("homepage coming to a homepage near you");
});

app.get("/profile", isLoggedIn, function(req, res){
	res.render("profile");
})

app.use("/auth", require("./controllers/auth"));

app.listen(process.env.PORT || 3000);


