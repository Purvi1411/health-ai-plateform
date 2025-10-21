import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

function SymptomHistory() {
  const [logs, setLogs] = useState([]); // To store the list of logs
  const [loading, setLoading] = useState(true); // To show a loading message
  const [error, setError] = useState('');
  const { user } = useAuth(); // Get the current user to access their token

  useEffect(() => {
    // This function will run once when the component loads
    const fetchHistory = async () => {
      try {
        // 1. Get the token
        const token = user.token;

        // 2. Set up the authorization header
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        // 3. Fetch the data from our "get all logs" endpoint
        const response = await axios.get(
          'http://localhost:5004/api/symptoms', // Use your backend port
          config
        );

        // 4. Save the logs in our state
        setLogs(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch history. Please try again.');
        console.error(err);
        setLoading(false);
      }
    };

    fetchHistory();
  }, [user.token]); // The empty array [] means "run this once"

  // --- Show messages based on state ---
  if (loading) {
    return <div className="text-center mt-10">Loading your history...</div>;
  }

  if (error) {
    return <div className="mt-6 p-4 bg-red-100 text-red-800 rounded-md">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto my-10 p-8 bg-white rounded-lg shadow-xl text-gray-900">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Your Symptom History</h2>

      {logs.length === 0 ? (
        <p>You have not submitted any symptoms yet.</p>
      ) : (
        <div className="space-y-4">
          {/* Loop over each log and display it */}
          {logs.map((log) => (
            <div key={log._id} className="p-4 border border-gray-200 rounded-lg">
              <p className="text-sm text-gray-500">
                {/* Format the date to be more readable */}
                Submitted on: {new Date(log.createdAt).toLocaleString()}
              </p>
              <p className="font-semibold mt-2">
                Symptoms Reported: {log.symptoms.join(', ')}
              </p>
              <p className="mt-2">
                <strong className="text-blue-600">AI Diagnosis:</strong> {log.diagnosis}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SymptomHistory;