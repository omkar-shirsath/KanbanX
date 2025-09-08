const Board = require('../models/board.model');
const Column = require('../models/column.model')
// Get all boards for the logged-in user
exports.getAllBoards = async (req, res) => {
    try {
        const id = req.params.id;
        const boards = await Board.find({ createdBy: id });
        res.status(200).json(boards);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching boards', error });
    }
};

// Get a specific board by ID
exports.getBoardById = async (req, res) => {
    try {
        const board = await Board.findById(req.params.id).populate({
            path: 'columns',
            populate: {
                path: 'tasks'
            }
        }); // Ensure 'columns' is the correct field name in the Board model

        if (!board) {
            return res.status(404).json({ message: 'Board not found' });
        }
        // res.cookie('board', JSON.stringify(board), {
        //     httpOnly: false,
        //     secure: false,
        //     sameSite: 'Strict',   // Required for cross-origin cookies
        //     maxAge: 24 * 60 * 60 * 1000 // 1 day
        // });

        res.status(200).json(board);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching board', error });
    }
};



// Create a new board
exports.createBoard = async (req, res) => {
    try {

        const { title, desc, userId } = req.body;

        const newBoard = new Board({
            title,
            description: desc,
            createdBy: userId,
        });

        await newBoard.save();

        const defaultColumns = [
            { title: 'To Do', boardId: newBoard._id },
            { title: 'In Progress', boardId: newBoard._id },
            { title: 'Done', boardId: newBoard._id }
        ];

        // Step 3: Create the columns and save them
        const columns = await Column.insertMany(defaultColumns);

        newBoard.columns = columns.map(col => col._id);

        const savedBoard = await newBoard.save();

        res.status(201).json(savedBoard);
    } catch (error) {
        res.status(500).json({ message: 'Error creating board', error });
    }
};

// Update board details
exports.updateBoard = async (req, res) => {
    try {
        const { title, desc } = req.body;
        const updatedBoard = await Board.findByIdAndUpdate(
            req.params.id,
            {
                title, description: desc
            },
            { new: true }
        );
        if (!updatedBoard) {
            return res.status(404).json({ message: 'Board not found' });
        }
        res.status(200).json(updatedBoard);
    } catch (error) {
        res.status(500).json({ message: 'Error updating board', error });
    }
};

// Delete a board
exports.deleteBoard = async (req, res) => {
    try {
        const boardId = req.params.id;
        await Column.deleteMany({ boardId });

        const deletedBoard = await Board.findByIdAndDelete(boardId);
        if (!deletedBoard) {
            return res.status(404).json({ message: 'Board not found' });
        }

        res.status(200).json({ message: 'Board deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting board', error });
    }
};