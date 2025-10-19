const mongoose = require('mongoose');

const symptomLogSchema = mongoose.Schema(
  {
    // This is the link back to the user
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', // This connects it to our 'User' model
    },
    symptoms: {
      type: [String], // An array of strings
      required: [true, 'Please add at least one symptom'],
    },
    diagnosis: {
      type: String,
      required: false, // This will be the AI's "prediction"
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

module.exports = mongoose.model('SymptomLog', symptomLogSchema);