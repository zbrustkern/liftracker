// WE REQUIRE MORE MODULES
const dotenv = require("dotenv").config()
const session = require('express-session')
const express = require("express")

// Import models and  middleware
const User = require('./models/user.js')
const isSignedIn = require('./middleware/is-signed-in.js')
const passUserToView = require('./middleware/pass-user-to-view.js')
const mongoose = require("mongoose")
const methodOverride = require("method-override")
const morgan = require("morgan")

// Import Controllers
const authController = require('./controllers/auth.js')
const usersController = require('./controllers/users.js')
const liftsController = require('./controllers/lifts.js')
const workoutsController = require('./controllers/workouts.js')
// const activitiessController = require('./controllers/activities.js')

// Set up the app and connect to the DB
const port = process.env.PORT ? process.env.PORT : "3000"
const app = express()
app.set('view engine', 'ejs')
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`)
})

// Set up middleware priority stack

//Look for static assets in the public folder
app.use(express.static('public'))
// Middleware to parse URL-encoded data from forms
app.use(express.urlencoded({ extended: false }));
// Middleware for using HTTP verbs such as PUT or DELETE
app.use(methodOverride("_method"))
// Morgan for logging HTTP requests
app.use(morgan('dev'))
// Set up session management
app.use(session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
    }))

app.use(passUserToView)
app.use('/auth', authController)
app.use(isSignedIn)
app.use('/users', usersController)
app.use('/users/:userId/lifts', liftsController)
app.use('/workouts', workoutsController)
// app.use('/workouts/activities', activitiesController)


// Home page Index
app.get("/", async (req, res) => {
    res.locals.title = "Welcome to LifTracker!"
    res.render('index', { user: req.session.user })
  });


// Gotta get here somehow
app.listen(port, () => {
    console.log(`The express app is ready on port ${port}!`)
  })