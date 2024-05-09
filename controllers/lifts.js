// Need express, router, bcrypt and user
const express = require('express')
const router = express.Router()
const User = require('../models/user.js')

// Index

router.get('/', async (req, res) => {
    let user = await User.find({username: req.session.username})
    res.locals.title = "My Lifts"
    res.render('lifts/index')
})

// New

router.get('/new', async (req, res) => {
    let user = await User.find({username: req.session.username})
    res.locals.title = "My Lifts"
    res.render('lifts/new')
})

// Create

router.post('/', async (req, res) => {
    let currentUser = await User.find({username: req.session.username})
    currentUser.lifts.push(req.body)
    currentUser.save()
    res.locals.title = "My Lifts"
    res.render('users/index')
})

// Show

router.get('/:liftId', async (req, res) => {
    let user = await User.find({username: req.session.username})
    res.locals.title = "My Lifts"
    res.render('users/index')
})

// Edit

// Update

// Delete
router.delete('/:liftId/', async (req, res) => {
    try {
        let currentUser = await User.findById(req.session.user._id)
        currentUser.lift.id(req.params.liftId).deleteOne();
        await currentUser.save();
        res.locals.title = "My Lifts"
        res.render('lifts/index', { user: currentUser })
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})



module.exports = router