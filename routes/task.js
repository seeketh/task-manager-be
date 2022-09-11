// The Task Management routes
const express = require('express');
const taskRouter = express.Router();

const {
    getAllTasks,
    getOneTask,
    createOneTask,
    updateOneTask,
    deleteOneTask
} = require('../controllers/task'); // Task controllers

taskRouter.route('/').get(getAllTasks).post(createOneTask);
taskRouter.route('/:id').get(getOneTask).patch(updateOneTask).delete(deleteOneTask);

module.exports = taskRouter;