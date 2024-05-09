const mongoose = require('mongoose')
const Activity = require('/activity.js')

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
  });

const workoutSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    acitivies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Acivitiy'
    },],
});

module.exports = mongoose.model('Workout', workoutSchema)