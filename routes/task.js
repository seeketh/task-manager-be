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

taskRouter.route('/:page/:limit').get(getAllTasks);
taskRouter.route('/:id').get(getOneTask).patch(updateOneTask).delete(deleteOneTask);
taskRouter.route('/').get(getAllTasks).post(createOneTask);

module.exports = taskRouter;