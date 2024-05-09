const express = require('express')
const router = express.Router()
const User = require('../models/user.js')


// Index

// router.get('/)

// router.get('/users/:userid/lifts', async (req, res) => {
//     let user = await User.find({username: req.session.username})
//     res.locals.title = "My Lifts"
//     res.render('users/index', { user: user })
// })

// New

// router.get('/users/:userid/lifts/new', async (req, res) => {
//     let user = await User.find({username: req.session.username})
//     res.locals.title = "My Lifts"
//     res.render('users/index', { user: user })
// })


module.exports = router