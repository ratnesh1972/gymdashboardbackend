const express = require('express');
const router = express.Router();
const Member = require('../models/Member');
const Transaction = require('../models/Transaction');
const { check, validationResult } = require('express-validator');
const auth = require('../auth/auth');
//@Route GET /members
//@Desc Get all members
//@Type Private
router.get('/', auth, async (req, res) => {
    try {
        const members = await Member.find({});
        res.json(members);
    } catch (error) {
        res.status(500).json({ msg: 'Something went wrong, please try again.' });
    }
});

//@Route POST /members
//@Desc Register a new member
//@Type Private
router.post('/', auth,
    async (req, res) => {

        const { name, phone, email, address, weight, height, age, status, reference, reg_date } = req.body;

        try {

            let member = {
                name,
                phone,
                email,
                address,
                weight,
                height,
                age,
                status,
                reference,
                reg_date
            }

            member = new Member(member);

            await member.save();

            res.json(member);

        } catch (error) {
            res.status(500).json({ msg: 'Something went wrong, please try again.' });
        }
    });


//@Route GET /members/:id
//@Desc Get a single member details
//@Type Private
router.get('/:id', auth, async (req, res) => {
    try {
        const member = await Member.findById(req.params.id);

        if (!member) {
            return res.status(404).json({ msg: 'Member Not Found' });
        }

        res.json(member);

    } catch (error) {
        res.status(500).json({ msg: 'Something went wrong, please try again.' });
    }
});

//@Route PUT /members/:id
//@Desc Update a single member details
//@Type Private
router.put('/:id', auth, async (req, res) => {

    const { name, phone, email, address, weight, height, age, status, refernce } = req.body;

    const memberFields = {};

    if (name) memberFields.name = name;
    if (phone) memberFields.phone = phone;
    if (email) memberFields.email = email;
    if (address) memberFields.address = address;
    if (weight) memberFields.weight = weight;
    if (height) memberFields.height = height;
    if (age) memberFields.age = age;
    if (status) memberFields.status = status;
    if (refernce) memberFields.refernce = refernce;


    try {

        let member = Member.findById(req.params.id);

        if (!member) {
            return res.status(404).json({ msg: 'Member Not Found' });
        }

        member = await Member.findByIdAndUpdate(req.params.id, { $set: memberFields }, { new: true });

        res.json(member);

    } catch (error) {
        res.status(500).json({ msg: 'Something went wrong, please try again.' });
    }
});

//@Route /members/:id
//@Desc Delete a single member details
//@Type DELETE
router.delete('/:id', auth, async (req, res) => {
    try {
        const member = await Member.findById(req.params.id);

        if (!member) {
            return res.status(404).json({ msg: 'Member Not Found' });
        }

        await Transaction.deleteMany({ member: member._id })
        await Member.findByIdAndDelete(req.params.id);

        res.json('Member Deleted Successfully!');

    } catch (error) {
        res.status(500).json({ msg: 'Something went wrong, please try again.' });
    }
});

module.exports = router;