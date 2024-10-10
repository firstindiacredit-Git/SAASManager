import React, { useState } from 'react';

const Convert = () => {
  const [time, setTime] = useState('');
  const [seconds, setSeconds] = useState(null);
  const [error, setError] = useState('');

  const convertToSeconds = (time) => {
    const regex = /^(\d{1,2}):([0-5]?\d):([0-5]?\d)$/;  // HH:MM:SS format validation
    const match = time.match(regex);

    if (match) {
      const hours = parseInt(match[1], 10);
      const minutes = parseInt(match[2], 10);
      const secs = parseInt(match[3], 10);

      const totalSeconds = hours * 3600 + minutes * 60 + secs;
      setSeconds(totalSeconds);
      setError('');
    } else {
      setError('Please enter a valid time in HH:MM:SS format');
      setSeconds(null);
    }
  };

  const handleChange = (e) => {
    setTime(e.target.value);
  };

  const handleConvert = () => {
    convertToSeconds(time);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold mb-4 text-center">Convert HH:MM:SS to Seconds</h1>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Time (HH:MM:SS)</label>
          <input
            type="text"
            value={time}
            onChange={handleChange}
            placeholder="Enter time (HH:MM:SS)"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <button
          onClick={handleConvert}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Convert to Seconds
        </button>
        {seconds !== null && (
          <div className="mt-4 p-2 bg-green-100 text-green-700 text-center rounded">
            Total Seconds: {seconds}
          </div>
        )}
      </div>
    </div>
  );
};

export default Convert;
