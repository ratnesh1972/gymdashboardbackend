const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const auth = require('../auth/auth');

//@Route GET /transactiondetails/pending
//@Desc Get all pending transactions
//@Type Private
router.get('/notifications', auth, async (req, res) => {
    try {
        const transactions = await Transaction.find({ credit: { $gt: 0 }, end_date: { $lt: Date.now() } }).populate('member');
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ msg: 'Something went wrong, please try again.' });
    }
});

router.get('/totalinfo', auth, async (req, res) => {
    try {
        let total_charged = 0;
        let total_paid = 0;
        let total_balance = 0;
        const transactions = await Transaction.find({});
        if (transactions.length !== 0) {
            transactions.forEach(transaction => {
                total_charged += transaction.fees;
                total_paid += transaction.paid;
                total_balance += transaction.credit;
            })
        }
        res.json({ total_charged, total_balance, total_paid });
    } catch (error) {
        res.status(500).json({ msg: 'Something went wrong, please try again.' });
    }
});



module.exports = router;