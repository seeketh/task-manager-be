const Task = require('../models/Task'); // The task model
const status = require('../config/status'); // HTPPS status codes.
require('dotenv').config();

// Task controllers
// TODO: Work on better error handling.

const getAllTasks = async (req, res) => {
    console.log('received a request to get all tasks');
    console.log(req.params);
    try {
        const loadLimit = req.params.limit || process.env.LOAD_lIMIT;
        const skipSize = (req.params.page - 1) * req.params.limit || process.env.NO_SKIP;
        const tasks = await Task.find({ userId: req.userId })
        .limit(loadLimit)
        .skip(skipSize)
        .sort({ updatedAt: -1});
        //TODO: Not really sure if i should count each time
        const count = await Task.estimatedDocumentCount({userId: req.userId});
        res.status(status.OK).json({tasks, count});
    } catch(error) {
        console.log(error);
        res.status(status.NOTFOUND).json({success: false, msg: 'No tasks found'});
    } 
}

const getOneTask = async (req, res) => {
    console.log('received a request to get a task with id ', req.params.id);
    try {
        // Note: if no id is provided, getAllTask controller will be hit.
        const task = await Task.find({
            _id: req.params.id,
            userId: req.userId
        });
        if (!task.length) {
            return res.status(status.OK).json({success: true, msg: "Task not found"})
        } // avoiding using else block? acceptable coding practise??
        res.status(status.OK).json(task);
    }catch (error) {
        console.log(error);
        res.status(status.BADREQUEST).json({success: false, msg: 'Bad request'});
    }
}

const createOneTask = async (req, res) => {
    console.log('received a request to create a task');
    // Attempt to create task
    try {
        await Task.create({...req.body, userId: req.userId});
        res.status(status.CREATED).json({success: true, msg: "New task created"});
        

    } catch (error) {
        console.log(error);
        res.status(status.BADREQUEST).json({success: false, msg: 'Bad request'});
    }
}

const updateOneTask = async (req, res) => {
    if (req.params.id) {
        if (!req.body.task && !req.body.completed) {
            return res.status(status.BADREQUEST).json({success: false, msg: "Nothing to update"});
        }
        try {
            await Task.findOneAndUpdate(
                {
                    _id: req.params.id,
                    userId: req.userId
                },
                req.body,
                {
                    runValidators: true,
                    new: true 
                }
            );
            res.status(status.OK).json({success: true, msg: "Task updated"});
        } catch (error) {
            console.log(error);
            res.status(status.SERVERERROR).json({sucess: false, msg: "Failed to update Task, please try again later"});
        }
    } else {
        res.status(status.BADREQUEST).json({success: false, msg: "Task ID is required" });
    }
}

const deleteOneTask = async (req, res) => {
    console.log('received a request to delete at task with id ', req.params.id);
    try {
        if (!req.params.id) res.status(status.BADREQUEST).json({success: false, msg: "Task ID is required"});
        await Task.deleteOne({
            _id: req.params.id,
            userId: req.userId
        });
        res.status(status.OK).json({success: true, msg: "Task deleted'"});
    }catch (error) {
        console.log(error);
        res.status(status.BADREQUEST).json({success: false, msg: 'Bad request'});
    }
}

module.exports = {
    getAllTasks,
    getOneTask,
    createOneTask,
    updateOneTask,
    deleteOneTask
}