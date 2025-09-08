const Task = require('../models/task.model');
const Column = require('../models/column.model');

// Create a new task and add it to the board's columns array
exports.createTask = async (req, res) => {
    try {
        const { boardId, columnId, title } = req.body;

        // Create a new task
        const newTask = new Task({ title, columnId, boardId });
        await newTask.save();

        // Find the board and update the columns array
        const column = await Column.findById(columnId);
        // const column = board.columns.id(columnId);
        column.tasks.push(newTask._id);

        await column.save();

        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ message: 'Error creating task', error });
    }
};
// Get all tasks for a specific board
exports.getTasksByBoard = async (req, res) => {
    try {
        const { boardId } = req.params;
        const board = await Board.findById(boardId).populate('columns.tasks');
        if (!board) {
            return res.status(404).json({ message: 'Board not found' });
        }
        const tasks = board.columns.reduce((acc, column) => {
            return acc.concat(column.tasks);
        }, []);
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tasks', error });
    }
};

// Update a task
exports.updateTask = async (req, res) => {
    try {
        const { id } = req.params;

        const oldTask = await Task.findById(id);
        if (!oldTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        const oldColumn = await Column.findById(oldTask.columnId);
        if (oldColumn) {
            oldColumn.tasks.pull(id);
            await oldColumn.save();
        }
        const { columnId } = req.body;
        if (columnId) {
            const column = await Column.findById(columnId);
            if (!column.tasks.includes(id)) {
                column.tasks.push(id);
                await column.save();
            }
        }

        const updatedTask = await Task.findByIdAndUpdate(id, { columnId }, { new: true });
        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(updatedTask);

    } catch (error) {
        res.status(500).json({ message: 'Error updating task', error });
    }
};

// Delete a task
exports.deleteTask = async (req, res) => {
    try {
        const id = req.params.id;

        // const columnId = req.params;

        const { columnId } = req.query;

        const column = await Column.findById(columnId);
        column.tasks.pull(id);

        await column.save();

        // Delete the task
        const deletedTask = await Task.findByIdAndDelete(id);
        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting task', error });
    }
};