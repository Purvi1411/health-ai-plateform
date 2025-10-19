// This function will act as our simple "AI"
const getAIDiagnosis = (symptoms) => {
  // Create a set for fast lookup
  const symptomSet = new Set(symptoms.map(s => s.toLowerCase()));

  // --- Rule 1: Check for Flu/Cold ---
  if (symptomSet.has('fever') && (symptomSet.has('cough') || symptomSet.has('sore throat'))) {
    return 'AI Diagnosis: High probability of Influenza (Flu) or a common cold. Recommend rest and hydration.';
  }

  // --- Rule 2: Check for Allergies ---
  if ((symptomSet.has('rash') || symptomSet.has('itchy eyes')) && symptomSet.has('sneezing')) {
    return 'AI Diagnosis: Symptoms are consistent with an allergic reaction. Recommend tracking recent food or environmental exposure.';
  }

  // --- Rule 3: Check for Migraine ---
  if (symptomSet.has('headache') && (symptomSet.has('nausea') || symptomSet.has('sensitivity to light'))) {
    return 'AI Diagnosis: Possible migraine. Recommend resting in a dark, quiet room.';
  }

  // --- Default Rule ---
  return 'AI Diagnosis: Symptoms do not match a clear pattern. Please consult a doctor for a professional opinion.';
};

module.exports = { getAIDiagnosis };