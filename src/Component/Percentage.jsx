import React, { useState } from 'react';

function Percentage() {
  // States for "What is X% of Y"
  const [percentage, setPercentage] = useState('');
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  const [out, setOut] = useState('');

  // States for "Percentage Change"
  const [initialValue, setInitialValue] = useState('');
  const [finalValue, setFinalValue] = useState('');
  const [percentageChange, setPercentageChange] = useState('');

  // States for "X is what percent of Y"
  const [partValue, setPartValue] = useState('');
  const [wholeValue, setWholeValue] = useState('');
  const [whatPercentResult, setWhatPercentResult] = useState('');

  // States for "X is Y% of what?"
  const [part, setPart] = useState('');
  const [percentOfWhat, setPercentOfWhat] = useState('');
  const [wholeFromPercent, setWholeFromPercent] = useState('');

  // Calculation for "What is X% of Y"
  const calculatePercentage = (e) => {
    e.preventDefault();
    if (percentage && value) {
      const calcResult = (percentage / 100) * value;
      setResult(calcResult);
      setOut(`${percentage}% of ${value} is ${calcResult}`);
    }
  };

  // Calculation for "Percentage Change"
  const calculatePercentageChange = (e) => {
    e.preventDefault();
    if (initialValue && finalValue) {
      const change = ((finalValue - initialValue) / initialValue) * 100;
      setPercentageChange(change);
    }
  };

  // Calculation for "X is what percent of Y"
  const calculateWhatPercent = (e) => {
    e.preventDefault();
    if (partValue && wholeValue) {
      const calcResult = (partValue / wholeValue) * 100;
      setWhatPercentResult(calcResult);
    }
  };

  // Calculation for "X is Y% of what?"
  const calculateWholeFromPercent = (e) => {
    e.preventDefault();
    if (part && percentOfWhat) {
      const calcWhole = (part / percentOfWhat) * 100;
      setWholeFromPercent(calcWhole);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-xl font-bold text-center mb-6">Percentage Calculator</h1>
        
        {/* Form for "What is X% of Y" */}
        <form onSubmit={calculatePercentage} className="space-y-4">
          <div>
            <label htmlFor="percentage" className="block text-sm font-medium text-gray-700">
              What is
            </label>
            <input
              type="number"
              id="percentage"
              value={percentage}
              onChange={(e) => setPercentage(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Percentage"
              required
            />
          </div>

          <div>
            <label htmlFor="value" className="block text-sm font-medium text-gray-700">
              % of
            </label>
            <input
              type="number"
              id="value"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Value"
              required
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600"
            >
              Calculate
            </button>
          </div>

          {result && (
            <div className="text-center">
              <p className="text-lg font-bold text-blue-600">{result}</p>
              <p className="text-gray-600">{out}</p>
            </div>
          )}
        </form>

        {/* Form for "Percentage Change" */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold">Percentage Change</h2>
          <form onSubmit={calculatePercentageChange} className="space-y-4">
            <div>
              <label htmlFor="initialValue" className="block text-sm font-medium text-gray-700">
                From (Initial Value)
              </label>
              <input
                type="number"
                id="initialValue"
                value={initialValue}
                onChange={(e) => setInitialValue(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Initial Value"
                required
              />
            </div>

            <div>
              <label htmlFor="finalValue" className="block text-sm font-medium text-gray-700">
                To (Final Value)
              </label>
              <input
                type="number"
                id="finalValue"
                value={finalValue}
                onChange={(e) => setFinalValue(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Final Value"
                required
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600"
              >
                Calculate
              </button>
            </div>

            {percentageChange && (
              <div className="text-center">
                <p className="text-lg font-bold text-blue-600">{percentageChange}%</p>
                <p className="text-gray-600">
                  The percentage change from {initialValue} to {finalValue} is {percentageChange}%.
                </p>
              </div>
            )}
          </form>
        </div>

        {/* Form for "X is what percent of Y" */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold">X is what percent of Y?</h2>
          <form onSubmit={calculateWhatPercent} className="space-y-4">
            <div>
              <label htmlFor="partValue" className="block text-sm font-medium text-gray-700">
                X (Part Value)
              </label>
              <input
                type="number"
                id="partValue"
                value={partValue}
                onChange={(e) => setPartValue(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Part Value (X)"
                required
              />
            </div>

            <div>
              <label htmlFor="wholeValue" className="block text-sm font-medium text-gray-700">
                Y (Whole Value)
              </label>
              <input
                type="number"
                id="wholeValue"
                value={wholeValue}
                onChange={(e) => setWholeValue(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Whole Value (Y)"
                required
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600"
              >
                Calculate
              </button>
            </div>

            {whatPercentResult && (
              <div className="text-center">
                <p className="text-lg font-bold text-blue-600">{whatPercentResult}%</p>
                <p className="text-gray-600">
                  {partValue} is {whatPercentResult}% of {wholeValue}.
                </p>
              </div>
            )}
          </form>
        </div>

        {/* Form for "X is Y% of what?" */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold">X is Y% of what?</h2>
          <form onSubmit={calculateWholeFromPercent} className="space-y-4">
            <div>
              <label htmlFor="part" className="block text-sm font-medium text-gray-700">
                X (Part Value)
              </label>
              <input
                type="number"
                id="part"
                value={part}
                onChange={(e) => setPart(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Part Value (X)"
                required
              />
            </div>

            <div>
              <label htmlFor="percentOfWhat" className="block text-sm font-medium text-gray-700">
                Y% (Percentage)
              </label>
              <input
                type="number"
                id="percentOfWhat"
                value={percentOfWhat}
                onChange={(e) => setPercentOfWhat(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Percentage (Y%)"
                required
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600"
              >
                Calculate
              </button>
            </div>

            {wholeFromPercent && (
              <div className="text-center">
                <p className="text-lg font-bold text-blue-600">{wholeFromPercent}</p>
                <p className="text-gray-600">
                  {part} is {percentOfWhat}% of {wholeFromPercent}.
                </p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Percentage;
