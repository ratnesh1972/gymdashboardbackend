const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const { check, validationResult } = require('express-validator');
const auth = require('../auth/auth');

//@Route /api/transactions
//@Desc Get all transactions
//@Type GET
router.get('/', auth, async (req, res) => {
    try {
        const transactions = await Transaction.find({});
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ msg: 'Something went wrong, please try again.' });
    }
});

//@Route /api/transactions
//@Desc Register a new transaction
//@Type POST
router.post('/', auth, async (req, res) => {

    const { member, trainer, start_date, end_date, package, slot, paid, recieved_date,
        recieved_by } = req.body;

    let fees;

    if (package === '1') fees = 1200;
    if (package === '3') fees = 3000;
    if (package === '6') fees = 5000;
    if (package === '12') fees = 10000;

    try {

        let transaction = {
            member,
            trainer,
            start_date: new Date(start_date),
            end_date: new Date(end_date),
            package,
            slot,
            fees,
            paid,
            credit: fees - paid,
            recieved_date: recieved_date !== '' ? new Date(recieved_date) : '',
            recieved_by
        }

        transaction = new Transaction(transaction);

        await transaction.save();

        res.json(transaction);

    } catch (error) {
        res.status(500).json({ msg: 'Something went wrong, please try again.' });
    }
});


//@Route /api/transactions/:id
//@Desc Get a single transaction details
//@Type GET
router.get('/:id', auth, async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        if (!transaction) {
            return res.status(404).json({ msg: 'Transaction Not Found' });
        }
        res.json(transaction);
    } catch (error) {
        res.status(500).json({ msg: 'Something went wrong, please try again.' });
    }
});


//@Route /api/transactions/:id
//@Desc Update a single transaction details
//@Type PUT
router.put('/:id', auth, async (req, res) => {

    const { member, trainer, start_date, end_date, package, slot, paid, recieved_date,
        recieved_by } = req.body;

    let fees;
    if (package === '1') fees = 1200;
    if (package === '3') fees = 3000;
    if (package === '6') fees = 5000;
    if (package === '12') fees = 10000;

    const transactionFields = {
        member,
        trainer,
        start_date: new Date(start_date),
        end_date: new Date(end_date),
        package,
        slot,
        fees,
        paid,
        credit: fees - paid,
        recieved_date: recieved_date !== '' ? new Date(recieved_date) : '',
        recieved_by
    };

    try {

        let transaction = Transaction.findById(req.params.id);

        if (!transaction) {
            return res.status(404).json({ msg: 'transaction Not Found' });
        }

        transaction = await Transaction.findByIdAndUpdate(req.params.id, { $set: transactionFields }, { new: true });

        res.json(transaction);

    } catch (error) {
        res.status(500).json({ msg: 'Something went wrong, please try again.' });
    }
});

//@Route /api/transactions/:id
//@Desc Delete a single transaction details
//@Type DELETE
router.delete('/:id', auth, async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);

        if (!transaction) {
            return res.status(404).json({ msg: 'Transaction Not Found' });
        }

        await Transaction.findByIdAndDelete(req.params.id);

        res.json('Transaction Deleted');

    } catch (error) {
        res.status(500).json({ msg: 'Something went wrong, please try again.' });
    }
});

//@Route /api/transactions/member/:id
//@Desc Get transaction details for single member
//@Type GET
router.get('/member/:id', auth, async (req, res) => {

    try {
        console.log('In member routes');
        const transactions = await Transaction.find({ member: req.params.id });

        if (!transactions) {
            return res.status(404).json({ msg: 'Transactions Not Found' });
        }

        res.json(transactions);

    } catch (error) {
        res.status(500).json({ msg: 'Something went wrong, please try again.' });
    }
});


module.exports = router;