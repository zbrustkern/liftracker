const mongoose = require('mongoose')
const User = require('./user.js')

const activitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    sets:  {
        type: Number,
        required: true,
    },
    reps:  {
        type: Number,
        required: true,
        },
    weight: {
        type: Number,
        required: true,
    },
  })

const workoutSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    activities: [activitySchema],
})

module.exports = mongoose.model('Workout', workoutSchema)