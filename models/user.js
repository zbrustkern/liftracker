const mongoose = require('mongoose')

const liftSchema = new mongoose.Schema({
    name: {
    type: String,
    required: true,
    },
    oneRepMax: Number,
    trainingMax: Number,
    threeRepMax: Number,
    fiveRepMax: Number,
})

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    lifts: [liftSchema],
})

module.exports = mongoose.model('User', userSchema)