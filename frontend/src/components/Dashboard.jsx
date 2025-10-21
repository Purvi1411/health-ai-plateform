import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

function Dashboard() {
  const [symptoms, setSymptoms] = useState('');
  const [result, setResult] = useState(null); // To show the AI's diagnosis
  const [error, setError] = useState('');
  const { user } = useAuth(); // Get user data from our "global brain"

  // This function runs when the user submits their symptoms
  const onSubmit = async (e) => {
    e.preventDefault();
    setResult(null); // Clear old results
    setError(''); // Clear old errors

    // 1. Get the token from the user object
    const token = user.token;

    // 2. Format the symptoms into an array for the AI
    const symptomsArray = symptoms.split(',').map(symptom => symptom.trim());

    try {
      // 3. Set up the authorization header
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // 4. Send the data to the backend (make sure your port is correct)
      const response = await axios.post(
        'http://localhost:5004/api/symptoms',
        { symptoms: symptomsArray },
        config
      );

      // 5. Success! Show the AI's diagnosis
      setResult(response.data.diagnosis);
      setSymptoms(''); // Clear the input field

    } catch (err) {
      setError('Failed to submit symptoms. Please try again.');
      console.error(err);
    }
  };

  return (
    // Here is the new Tailwind styling
    // Added text-gray-900 to force dark text
    <div className="max-w-4xl mx-auto my-10 p-8 bg-white rounded-lg shadow-xl text-gray-900">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">
        Welcome, {user.username}!
      </h2>
      <p className="text-gray-600 mb-6">
        Enter your symptoms below, separated by commas.
      </p>

      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label
            htmlFor="symptoms"
            className="block text-gray-700 text-sm font-semibold mb-2"
          >
            Symptoms
          </label>
          <input
            type="text"
            id="symptoms"
            placeholder="e.g., headache, fever, cough"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            required
            // Added text-gray-900 to the input
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Get AI Diagnosis
        </button>
      </form>

      {/* Show the AI's response on success */}
      {result && (
        <div className="mt-6 p-4 bg-green-100 border border-green-300 text-green-800 rounded-md">
          <strong className="font-semibold">AI Diagnosis:</strong> {result}
        </div>
      )}

      {/* Show an error message on failure */}
      {error && (
        <div className="mt-6 p-4 bg-red-100 border border-red-300 text-red-800 rounded-md">
          {error}
        </div>
      )}
    </div>
  );
}

export default Dashboard;