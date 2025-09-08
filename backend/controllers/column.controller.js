const Column = require('../models/column.model');
const Board = require('../models/board.model');
const Task = require('../models/task.model');


// Add a new column to a board
exports.addColumn = async (req, res) => {
    try {
        const { title, boardId } = req.body;
        // const boardId = req.cookies.board._id;
        const newColumn = new Column({
            title,
            boardId
        });
        await newColumn.save();

        await Board.findByIdAndUpdate(
            boardId,
            { $push: { columns: newColumn._id } }, // Push the new column ID to the array
            { new: true } // Return the updated board
        );

        res.status(201).json(newColumn);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update column title
exports.updateColumn = async (req, res) => {
    try {
        const { title } = req.body;
        const updatedColumn = await Column.findByIdAndUpdate(req.params.id, { title }, { new: true });
        if (!updatedColumn) {
            return res.status(404).json({ message: 'Column not found' });
        }
        res.status(200).json(updatedColumn);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Remove a column
exports.deleteColumn = async (req, res) => {
    try {
        // const boardId = req.cookies.board._id;
        // console.log(boardId);
        const { boardId } = req.body;
        const columnId = req.params.id;
        await Board.findByIdAndUpdate(
            boardId,
            { $pull: { columns: columnId } }, // Pull the columnId from the columns array
            { new: true } // Return the updated document
        );

        const column = await Column.findById(columnId);
        if (column && column.tasks.length > 0) {
            await Task.deleteMany({ _id: { $in: column.tasks } });
        }

        await Column.updateOne(
            { _id: columnId },
            { $set: { tasks: [] } } // Clear the tasks array
        );
        const deletedColumn = await Column.findByIdAndDelete(columnId);
        if (!deletedColumn) {
            return res.status(404).json({ message: 'Column not found' });
        }
        res.status(200).json({ message: 'Column deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};