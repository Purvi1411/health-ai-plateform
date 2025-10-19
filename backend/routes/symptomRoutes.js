const express = require('express');
const router = express.Router();
const SymptomLog = require('../models/symptomLogModel');
const { protect } = require('../middleware/authMiddleware'); // Our security guard

// @desc    Get all symptom logs for the logged-in user
// @route   GET /api/symptoms
// @access  Private
router.get('/', protect, async (req, res) => {
  // "protect" gives us req.user
  // We find all logs that belong to this user
  const logs = await SymptomLog.find({ user: req.user.id });
  res.status(200).json(logs);
});

// @desc    Create a new symptom log
// @route   POST /api/symptoms
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { symptoms, diagnosis } = req.body;

    if (!symptoms || symptoms.length === 0) {
      return res.status(400).json({ message: 'Please add symptoms' });
    }

    const log = await SymptomLog.create({
      user: req.user.id, // Link the log to the logged-in user
      symptoms: symptoms,
      diagnosis: diagnosis || 'Pending review', // Add a default
    });

    res.status(201).json(log);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;