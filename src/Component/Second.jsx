import React, { useState } from 'react';
import { Back } from './back';

const Second = () => {
  const [secondsInput, setSecondsInput] = useState('');
  const [formattedTime, setFormattedTime] = useState('');
  const [error, setError] = useState('');

  const convertToHHMMSS = (seconds) => {
    if (seconds < 0 || isNaN(seconds)) {
      setError('Please enter a valid number of seconds.');
      return;
    }

    setError('');
    let hrs = Math.floor(seconds / 3600);
    let mins = Math.floor((seconds % 3600) / 60);
    let secs = seconds % 60;

    // Add leading zero if necessary
    let hoursStr = hrs.toString().padStart(2, '0');
    let minsStr = mins.toString().padStart(2, '0');
    let secsStr = secs.toString().padStart(2, '0');

    setFormattedTime(`${hoursStr}:${minsStr}:${secsStr}`);
  };

  const handleConvert = () => {
    const seconds = parseInt(secondsInput, 10);
    convertToHHMMSS(seconds);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <Back/>
        <h1 className="text-2xl font-bold mb-4 text-center">Convert Seconds to HH:MM:SS</h1>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Enter Seconds</label>
          <input
            type="text"
            value={secondsInput}
            onChange={(e) => setSecondsInput(e.target.value)}
            placeholder="Enter seconds"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <button
          onClick={handleConvert}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Convert
        </button>
        {formattedTime && (
          <div className="mt-4 p-2 bg-green-100 text-green-700 text-center rounded">
            Converted Time: {formattedTime}
          </div>
        )}
      </div>
    </div>
  );
};

export default Second;
