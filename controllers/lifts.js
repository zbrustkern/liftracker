const express = require('express')
const router = express.Router()
const User = require('../models/user.js')

// Index
router.get('/', async (req, res) => {
    res.locals.currentUser = await User.findById(req.session.user._id)
    res.locals.title = "My Lifts"
    res.render('lifts/index')
})

// New
router.get('/new', async (req, res) => {
    res.locals.title = "Add a Lift"
    res.render('lifts/new')
})

// Create
router.post('/', async (req, res) => {
    try {
    let currentUser = await User.findById(req.session.user._id)
    currentUser.lifts.push(req.body)
    currentUser.save()
    res.locals.title = "My Lifts"
    res.locals.currentUser = currentUser
    res.render('lifts/index')
    }
    catch {
        res.locals.title = "My Lifts"
        res.redirect('/')
    }
})

// Show
router.get('/:liftId/', async (req, res) => {
    try {
        let currentUser = await User.findById(req.session.user._id)
        lift = currentUser.lifts.id(req.params.liftId)
        res.locals.currentUser = currentUser
        res.locals.lift = lift
        res.locals.title = lift.name
        res.render('lifts/show')
    } catch(error) {
        res.locals.title = "My Lifts"
        redirect('lifts/index')
    }
})

// Edit
router.get('/:liftId/edit', async (req, res) => {
    try {
        let currentUser = await User.findById(req.session.user._id)
        lift = currentUser.lifts.id(req.params.liftId)
        res.locals.currentUser = currentUser
        res.locals.lift = lift
        res.locals.title = lift.name
        res.render('lifts/edit')
    } catch(error) {
        res.locals.title = "My Lifts"
        redirect('lifts/index')
    }
})

// Update
router.put('/:liftId/', async (req, res) => {
    try {
        let currentUser = await User.findById(req.session.user._id)
        lift = currentUser.lifts.id(req.params.liftId)
        lift.set(req.body)
        await currentUser.save()
        res.locals.currentUser = currentUser
        res.locals.title = lift.name
        res.locals.lift = lift
        res.render('lifts/show')
    } catch(error) {
        res.redirect('/')
    }
})

// Delete
router.delete('/:liftId/', async (req, res) => {
    try {
        let currentUser = await User.findById(req.session.user._id)
        currentUser.lifts.id(req.params.liftId).deleteOne()
        await currentUser.save()
        res.locals.currentUser = currentUser
        res.locals.title = "My Lifts"
        res.render('lifts/index')
    } catch (error) {
        res.redirect('/lifts/')
    }
})

module.exports = router