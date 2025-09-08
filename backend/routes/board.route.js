const express = require('express');
const { getAllBoards, getBoardById, createBoard, updateBoard, deleteBoard } = require('../controllers/board.controller');
const jwtAuth = require('../middlewares/jwtAuth');

const router = express.Router();
// router.use(jwtAuth);

// GET /api/boards/:id: Get a specific board by ID
router.get('/api/:id', getAllBoards);

router.get('/:id', getBoardById);

// POST /api/boards: Create a new board
router.post('/', createBoard);

// PUT /api/boards/:id: Update board details
// router.put('/:id', updateBoard);

// DELETE /api/boards/:id: Delete a board
router.delete('/:id', deleteBoard);

module.exports = router;