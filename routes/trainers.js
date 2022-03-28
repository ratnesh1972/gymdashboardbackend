const express = require("express");
const router = express.Router();
const Trainer = require("../models/Trainer");
const { check, validationResult } = require("express-validator");
const auth = require('../auth/auth');

//@Route GET /trainers
//@Desc Get all trainers
//@Type Private
router.get("/", auth, async (req, res) => {
  try {
    const trainers = await Trainer.find({});
    res.json(trainers);
  } catch (error) {
    res.status(500).json({ msg: 'Something went wrong, please try again.' });
  }
});

//@Route POST /trainers
//@Desc Register a new trainer
//@Type Private
router.post("/", auth, async (req, res) => {
  const { name, phone, email, address, password } = req.body;

  try {
    let trainer = {
      name,
      phone,
      email,
      address,
      password,
    };

    trainer = new Trainer(trainer);

    await trainer.save();

    res.json(trainer);
  } catch (error) {
    res.status(500).json({ msg: 'Something went wrong, please try again.' });
  }
});

//@Route GET /trainers/:id
//@Desc Get a single trainer details
//@Type Private
router.get("/:id", auth, async (req, res) => {
  try {
    const trainer = await Trainer.findById(req.params.id);

    if (!trainer) {
      return res.status(404).json({ msg: "Member Not Found" });
    }

    res.json(trainer);
  } catch (error) {
    res.status(500).json({ msg: 'Something went wrong, please try again.' });
  }
});

//@Route PUT /trainer/:id
//@Desc Update a single trainer details
//@Type Private
router.put(
  "/:id", auth,
  [
    check("name", "Please provide member name.").not().isEmpty(),
    check("phone", "Please provide valid phone no.").isLength({
      min: 10,
      max: 10,
    }),
    check("email", "Please provide valid email address.").isEmail(),
    check("address", "Please provide address.").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, phone, email, address, password } = req.body;

    const memberFields = {
      name,
      phone,
      email,
      address,
      password,
    };

    try {
      let trainer = Trainer.findById(req.params.id);

      if (!trainer) {
        return res.status(404).json({ msg: "Trainer Not Found" });
      }

      trainer = await Trainer.findByIdAndUpdate(
        req.params.id,
        { $set: memberFields },
        { new: true }
      );

      res.json(trainer);
    } catch (error) {

      res.status(500).json({ msg: 'Something went wrong, please try again.' });
    }
  }
);

//@Route /trainer/:id
//@Desc Delete a single trainer details
//@Type DELETE
router.delete("/:id", auth, async (req, res) => {
  try {
    const trainer = await Trainer.findById(req.params.id);

    if (!trainer) {
      return res.status(404).json({ msg: "Trainer Not Found" });
    }

    await Trainer.findByIdAndDelete(req.params.id);
    res.json("Trainer Deleted Successfully!");
  } catch (error) {
    res.status(500).json({ msg: 'Something went wrong, please try again.' });
  }
});

module.exports = router;
