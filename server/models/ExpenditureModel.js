const mongoose = require('mongoose');

const Expenditure = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true,
        min: [0, 'Must be a positive number']
    },
    created: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('expenditure', Expenditure);
