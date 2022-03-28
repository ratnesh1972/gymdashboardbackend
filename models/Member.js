const mongoose = require('mongoose');
const { Schema } = mongoose;

const memberSchema = Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    height: {
        type: Number,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    reference: {
        type: String
    },
    reg_date: {
        type: Date,
        default: Date.now(),
        required: true
    },

})

module.exports = mongoose.model('member', memberSchema);