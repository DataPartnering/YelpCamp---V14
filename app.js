require("dotenv").config();
var express      = require("express"),
    app          = express(),
    bodyParser   = require("body-parser"),
    mongoose     = require("mongoose"),
    Campground   =require("./models/campground"),
    flash        = require("connect-flash"),
    seedDB       = require("./seeds"),
    Comment      = require("./models/comment"),
    passport     = require("passport"),
    LocalStrategy= require("passport-local"),
    User         = require("./models/user"),
    methodOverride = require("method-override"),
    moment= require("moment")
    
var commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes      = require("./routes/index")
    
    app.set("view engine", "ejs");
    
   // seedDB();  Seed the DB
//mongoose.connect("mongodb://localhost/yelp_camp12");
mongoose.connect("mongodb://jovan:Obvious55@ds155461.mlab.com:55461/yelpcampportfolio");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"))
console.log(__dirname);
app.use(methodOverride("_method"));
app.use(flash());
app.locals.moment = require('moment');

//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret:"Once again Rusty wiins cutest dog!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});
//requiring routes
app.use(indexRoutes);
app.use("/campgrounds/:id/comments" ,commentRoutes);
app.use("/campgrounds", campgroundRoutes);

app.listen(process.env.PORT || 3000  ,  process.env.IP, function(){
   console.log("Yelpcamp server has started on port 3000 " )
});
