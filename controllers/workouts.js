// Need express, router, bcrypt and user
const express = require('express')
const router = express.Router()
const Workout = require('../models/workout.js')
const User = require('../models/user.js')

// Routes
// Index
router.get('/', async (req, res) => {
    res.locals.workouts = await Workout.find({owner: req.session.user._id})
    res.locals.title = "My Workouts"
    res.render('workouts/index')
})

// New
router.get('/new', async (req, res) => {
    res.locals.numberOfActivities = 3
    res.locals.currentUser = await User.findById(req.session.user._id)
    res.locals.workout = []
    res.locals.title = "New Workout"
    res.render('workouts/new')
})
// New with additional activities
router.post('/new/:numberOfActivities', async (req, res) => {
    res.locals.numberOfActivities = Number(req.params.numberOfActivities) + 1
    res.locals.currentUser = await User.findById(req.session.user._id)
    res.locals.workout = []
    res.locals.title = "New Workout"
    res.render('workouts/new')
})

//  Create 
router.post('/', async (req, res) => {
    try {
        let currentWorkout = await Workout.create({name: req.body.name, owner: req.session.user._id})
        req.body.activities.forEach((activity, idx) => {
            currentWorkout.activities.push({
                name: req.body.activities[idx],
                sets: req.body.sets[idx],
                reps: req.body.reps[idx],
                weight: req.body.weight[idx],})
        })
        currentWorkout.save()
        res.locals.title = "All Workouts "
        res.redirect('/workouts')
    }
    catch {
        res.locals.title = "All Workouts "
        res.redirect('/')
    }
})

// Show
router.get('/:workoutId', async (req, res) => {
    let foundWorkout = await Workout.findById(req.params.workoutId)
    res.locals.currentUser = await User.findById(req.session.user._id)
    res.locals.title = foundWorkout.name
    res.locals.workout = foundWorkout
    res.render('workouts/show')
})

// Edit
router.get('/:workoutId/edit', async (req, res) => {
    let foundWorkout = await Workout.findById(req.params.workoutId)
    res.locals.currentUser = await User.findById(req.session.user._id)
    res.locals.title = `Edit ${foundWorkout.name}`
    res.locals.workout = foundWorkout
    res.render('workouts/edit')
})

// Update

router.put('/:workoutId', async (req, res) => {
    let currentWorkout = await Workout.findByIdAndUpdate(
        req.params.workoutId,
        {
        name: req.body.name,
        activities: [],
        })
    req.body.activities.forEach((activity, idx) => {
        currentWorkout.activities.push({
            name: req.body.activities[idx],
            sets: req.body.sets[idx],
            reps: req.body.reps[idx],
            weight: req.body.weight[idx],})
    })
    currentWorkout.save()
    res.locals.title = currentWorkout.name
    res.redirect(`/workouts/${currentWorkout._id}`)
})

// Delete
router.delete('/:workoutId', async (req, res) => {
        await Workout.findByIdAndDelete(req.params.workoutId)
        res.redirect('/workouts')
})


module.exports = router