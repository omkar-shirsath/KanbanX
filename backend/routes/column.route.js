const express = require('express');
const { addColumn, updateColumn, deleteColumn } = require('../controllers/column.controller');

const jwtAuth = require('../middlewares/jwtAuth');

const router = express.Router();
// router.use(jwtAuth);

// POST /api/columns: Add a new column to a board
router.post('/', addColumn);

// PUT /api/columns/:id: Update column title
router.put('/:id', updateColumn);

// DELETE /api/columns/:id: Remove a column
router.delete('/:id', deleteColumn);

module.exports = router;