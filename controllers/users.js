const express = require('express')
const router = express.Router()
const User = require('../models/user.js')
const Workout = require('../models/workout.js')

// Routes

// Index
router.get('/', async (req, res) => {
     let users = await User.find()
     res.locals.title = `Community page`
     res.locals.users = users
     res.render('users/index')
})

// Show
router.get('/:userId', async (req, res) => {
     try {
        let otherUser = await User.findById(req.params.userId)
        let workouts = await Workout.find({owner: otherUser._id})
        res.locals.otherUser = otherUser
        res.locals.workouts = workouts
        res.locals.title = `${otherUser.name}'s Workouts`
        res.render('users/show')
     } catch(error) {
        res.redirect('/users')
     }
})

module.exports = router;