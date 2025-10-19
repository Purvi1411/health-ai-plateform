const express = require('express');
const router = express.Router();
const SymptomLog = require('../models/symptomLogModel');
const { protect } = require('../middleware/authMiddleware'); // Our security guard
const { getAIDiagnosis } = require('../services/aiSymptomAnalyzer'); // Import the AI "brain"

// @desc    Get all symptom logs for the logged-in user
// @route   GET /api/symptoms
// @access  Private
router.get('/', protect, async (req, res) => {
  // "protect" gives us req.user
  // We find all logs that belong to this user
  try {
    const logs = await SymptomLog.find({ user: req.user.id });
    res.status(200).json(logs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Create a new symptom log
// @route   POST /api/symptoms
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    // 1. Get ONLY the symptoms from the user
    const { symptoms } = req.body;

    if (!symptoms || symptoms.length === 0) {
      return res.status(400).json({ message: 'Please add symptoms' });
    }

    // 2. Call our AI "brain" to get a diagnosis
    const aiDiagnosis = getAIDiagnosis(symptoms);

    // 3. Create the log with the AI's diagnosis
    const log = await SymptomLog.create({
      user: req.user.id, // We get this from the 'protect' middleware
      symptoms: symptoms,
      diagnosis: aiDiagnosis, // <-- We use the AI's response here
    });

    res.status(201).json(log);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;