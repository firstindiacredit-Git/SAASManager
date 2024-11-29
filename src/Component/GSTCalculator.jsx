import React, { useState } from 'react';
import { Back } from './back';

const GSTCalculator = () => {
  const [amount, setAmount] = useState('');
  const [gstRate, setGstRate] = useState('');
  const [calculationType, setCalculationType] = useState('add'); // 'add' for adding GST, 'remove' for removing GST
  const [gstAmount, setGstAmount] = useState(null);
  const [finalAmount, setFinalAmount] = useState(null);

  const calculateGST = (e) => {
    e.preventDefault();
    const value = parseFloat(amount);
    const gst = parseFloat(gstRate);

    if (isNaN(value) || isNaN(gst) || value < 0 || gst < 0) {
      alert('Please enter valid and non-negative inputs.');
      setGstAmount(null);
      setFinalAmount(null);
      return;
    }

    if (calculationType === 'add') {
      // Add GST
      const gstValue = (value * gst) / 100;
      const total = value + gstValue;
      setGstAmount(gstValue);
      setFinalAmount(total);
    } else if (calculationType === 'remove') {
      // Remove GST
      const baseAmount = value / (1 + gst / 100);
      const gstValue = value - baseAmount;
      setGstAmount(gstValue);
      setFinalAmount(baseAmount);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-lg">
        <Back/>
      <h2 className="text-2xl font-bold text-center mb-4">GST Calculator (India)</h2>
      <form onSubmit={calculateGST} className="space-y-4">
        <div>
          <label htmlFor="amount" className="block text-sm font-medium">Amount</label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full mt-1 p-2 border rounded-md"
            placeholder="Enter the amount"
          />
        </div>
        <div>
          <label htmlFor="gstRate" className="block text-sm font-medium">GST Rate (%)</label>
          <input
            id="gstRate"
            type="number"
            value={gstRate}
            onChange={(e) => setGstRate(e.target.value)}
            className="w-full mt-1 p-2 border rounded-md"
            placeholder="Enter GST rate (e.g., 5, 12, 18, 28)"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Calculation Type</label>
          <div className="flex items-center space-x-4 mt-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="calculationType"
                value="add"
                checked={calculationType === 'add'}
                onChange={() => setCalculationType('add')}
                className="mr-2"
              />
              Add GST
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="calculationType"
                value="remove"
                checked={calculationType === 'remove'}
                onChange={() => setCalculationType('remove')}
                className="mr-2"
              />
              Remove GST
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        >
          Calculate
        </button>
      </form>
      {gstAmount !== null && finalAmount !== null && (
        <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-md">
          {calculationType === 'add' ? (
            <>
              <p>
                GST Amount: <strong>₹{gstAmount.toFixed(2)}</strong>
              </p>
              <p>
                Total Amount (Including GST): <strong>₹{finalAmount.toFixed(2)}</strong>
              </p>
            </>
          ) : (
            <>
              <p>
                GST Amount: <strong>₹{gstAmount.toFixed(2)}</strong>
              </p>
              <p>
                Base Amount (Excluding GST): <strong>₹{finalAmount.toFixed(2)}</strong>
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default GSTCalculator;
