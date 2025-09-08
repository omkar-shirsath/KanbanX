const mongoose = require('mongoose');
const Column = require('./column.model')

const boardSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // members: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User'
    // }],
    columns: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Column'
    }], 
}, {
    timestamps: true
});


module.exports = mongoose.model('Board', boardSchema);
