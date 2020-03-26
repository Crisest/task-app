const mongoose = require('mongoose')

const Task = mongoose.model('Task', {
    description: {
        type: String,
        trime: true,
        require: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'User'
    }
})

module.exports = Task