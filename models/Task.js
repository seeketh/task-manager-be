// The task Model

const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    task: {
        type: String,
        trim: true,
        required: [true, 'Task is reqired'],
        minLength: [5, 'Task has to be atleast 5 characters long']
    },
    completed: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});


module.exports = mongoose.model('Task', taskSchema);