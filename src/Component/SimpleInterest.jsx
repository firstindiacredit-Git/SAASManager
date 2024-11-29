import React, { useState } from 'react';
import { Back } from './back';

const SimpleInterestCalculator = () => {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [time, setTime] = useState('');
  const [interest, setInterest] = useState(null);
  const [totalAmount, setTotalAmount] = useState(null);

  const calculateInterest = (e) => {
    e.preventDefault();
    const P = parseFloat(principal);
    const R = parseFloat(rate);
    const T = parseFloat(time);

    if (!isNaN(P) && !isNaN(R) && !isNaN(T)) {
      const calculatedInterest = (P * R * T) / 100;
      setInterest(calculatedInterest);
      setTotalAmount(P + calculatedInterest);
    } else {
      setInterest(null);
      setTotalAmount(null);
      alert('Please enter valid inputs');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-lg">
        <Back/>
      <h2 className="text-2xl font-bold text-center mb-4">Simple Interest Calculator</h2>
      <form onSubmit={calculateInterest} className="space-y-4">
        <div>
          <label htmlFor="principal" className="block text-sm font-medium">Principal Amount</label>
          <input
            id="principal"
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            className="w-full mt-1 p-2 border rounded-md"
            placeholder="Enter principal amount"
          />
        </div>
        <div>
          <label htmlFor="rate" className="block text-sm font-medium">Rate of Interest (%)</label>
          <input
            id="rate"
            type="number"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            className="w-full mt-1 p-2 border rounded-md"
            placeholder="Enter interest rate"
          />
        </div>
        <div>
          <label htmlFor="time" className="block text-sm font-medium">Time Period (years)</label>
          <input
            id="time"
            type="number"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full mt-1 p-2 border rounded-md"
            placeholder="Enter time period"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        >
          Calculate
        </button>
      </form>
      {interest !== null && totalAmount !== null && (
        <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-md">
          <p>
            Simple Interest: <strong>{interest.toFixed(2)}</strong>
          </p>
          <p>
            Total Amount: <strong>{totalAmount.toFixed(2)}</strong>
          </p>
        </div>
      )}
    </div>
  );
};

export default SimpleInterestCalculator;
