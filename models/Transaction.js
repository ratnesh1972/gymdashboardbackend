const mongoose = require('mongoose');
const { Schema } = mongoose;

const transactionSchema = Schema({
    member: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'member'
    },
    trainer: {
        type: String,
        required: true
    },
    package: {
        type: String,
        required: true
    },
    slot: {
        type: String,
        required: true
    },
    start_date: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date,
        required: true
    },
    fees: {
        type: Number,
        required: true
    },
    paid: {
        type: Number,
        required: true
    },
    credit: {
        type: Number
    },
    recieved_date: {
        type: Date
    },
    recieved_by: {
        type: String
    }
});

module.exports = mongoose.model('transaction', transactionSchema);