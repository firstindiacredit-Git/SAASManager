import React, { useState } from "react";
import { Back } from "./back";

const AverageCalculator = () => {
  const [numbers, setNumbers] = useState("");
  const [average, setAverage] = useState(null);

  const calculateAverage = () => {
    const numArray = numbers
      .split(",")
      .map((num) => parseFloat(num.trim()))
      .filter((num) => !isNaN(num)); // Filter out invalid inputs

    if (numArray.length === 0) {
      setAverage(null);
      return;
    }

    const total = numArray.reduce((acc, curr) => acc + curr, 0);
    setAverage((total / numArray.length).toFixed(2));
  };

  const reset = () => {
    setNumbers("");
    setAverage(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-gray-800">
        <Back/>
      <header className="text-3xl font-extrabold mb-6 text-green-800">
        Average Calculator
      </header>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex flex-col space-y-4">
          {/* Input */}
          <div>
            <label
              htmlFor="numbers"
              className="block text-sm font-medium text-gray-700"
            >
              Enter Numbers (comma-separated):
            </label>
            <input
              id="numbers"
              type="text"
              value={numbers}
              onChange={(e) => setNumbers(e.target.value)}
              className="mt-1 px-3 py-2 border border-gray-300 rounded-lg shadow-sm w-full focus:ring-green-500 focus:border-green-500"
              placeholder="e.g., 10, 20, 30"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-between space-x-4">
            <button
              onClick={calculateAverage}
              className="btn bg-green-500 hover:bg-green-600"
            >
              Calculate
            </button>
            <button onClick={reset} className="btn bg-red-500 hover:bg-red-600">
              Reset
            </button>
          </div>
        </div>

        {/* Result */}
        {average !== null && (
          <div className="mt-6 text-center text-lg font-semibold">
            Average: <span className="text-green-700">{average}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AverageCalculator;
