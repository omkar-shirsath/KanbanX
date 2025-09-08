const mongoose = require('mongoose');
const columnSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    boardId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Board'
    },
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    }],
});

columnSchema.pre('remove', async function (next) {
    const Column = this;
    const Board = mongoose.model('Board');

    try {
        // Remove the column reference from all parent documents
        await Board.updateMany(
            { columns: Column._id }, // Match parents containing the column
            { $pull: { columns: Column._id } } // Pull the column from the array
        );
        next();
    } catch (error) {
        next(error);
    }
});
module.exports = mongoose.model('Column', columnSchema);
