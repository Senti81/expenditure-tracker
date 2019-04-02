const mongoose = require('mongoose');
const moment = require ('moment')

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
        default: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    }
});

module.exports = mongoose.model('expenditure', Expenditure);
