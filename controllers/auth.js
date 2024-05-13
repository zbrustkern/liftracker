const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/user.js')

router.get('/sign-up', (req, res) => {
    res.locals.title = "Sign Up"
    res.render('auth/sign-up.ejs')
});

router.get('/sign-in', (req, res) => {
    res.locals.title = "Sign In"
    res.render('auth/sign-in.ejs');
});

router.get('/sign-out', (req, res) => {
    res.locals.title = "Welcome to LifTracker"
    req.session.destroy()
    res.redirect('/')
});

router.post('/sign-up', async (req, res) => {
  try {
    // Check username
    const userInDatabase = await User.findOne({ username: req.body.username });
    if (userInDatabase) {
      return res.send('Username unavailable')
    }
  
    // Check password match
    if (req.body.password !== req.body.confirmPassword) {
      return res.send('Passwords must match')
    }
  
    // Hash the password
    const hashedPassword = bcrypt.hashSync(req.body.password, 10)
    req.body.password = hashedPassword
  
    await User.create(req.body)
    res.locals.title = "Sign In"
    res.redirect('/auth/sign-in')
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
});

router.post('/sign-in', async (req, res) => {
  try {
    const userInDatabase = await User.findOne({ username: req.body.username });
    if (!userInDatabase) {
      return res.send('Login failed. Please try again.')
    }
  
    const validPassword = bcrypt.compareSync(
      req.body.password,
      userInDatabase.password
    )
    if (!validPassword) {
      return res.send('Login failed. Please try again.')
    }
  
    req.session.user = {
      username: userInDatabase.username,
      _id: userInDatabase._id
    };
    res.redirect('/')
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
});

module.exports = router