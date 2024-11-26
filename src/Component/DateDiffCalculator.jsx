import React, { useState } from "react";
import { Back } from "./back";

// Function to calculate the difference between two dates
const calculateDateDiff = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Calculate the difference in milliseconds
  const diff = end - start;

  if (diff < 0) return null; // Handle future dates

  // Convert milliseconds to days
  const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
  const years = Math.floor(totalDays / 365);
  const months = Math.floor((totalDays % 365) / 30);
  const days = totalDays % 30;
  const totalHours = Math.floor(diff / (1000 * 60 * 60));
  const totalMinutes = Math.floor(diff / (1000 * 60));
  const totalSeconds = Math.floor(diff / 1000);

  return { years, months, days, totalDays, totalHours, totalMinutes, totalSeconds };
};

const DateDiffCalculator = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [dateDiff, setDateDiff] = useState(null);

  const handleCalculate = () => {
    if (!startDate || !endDate) return;

    const diff = calculateDateDiff(startDate, endDate);
    setDateDiff(diff);
  };

  const handleReset = () => {
    setStartDate("");
    setEndDate("");
    setDateDiff(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-100 to-green-300 text-gray-800">
        <Back/>
      <header className="text-3xl font-extrabold mb-6 text-green-800">Date Difference Calculator</header>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex flex-col space-y-4">
          {/* Start Date */}
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">First Date:</label>
            <input
              id="startDate"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="mt-1 px-3 py-2 border border-gray-300 rounded-lg shadow-sm w-full focus:ring-green-500 focus:border-green-500"
            />
          </div>

          {/* End Date */}
          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">Second Date:</label>
            <input
              id="endDate"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="mt-1 px-3 py-2 border border-gray-300 rounded-lg shadow-sm w-full focus:ring-green-500 focus:border-green-500"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-between space-x-4">
            <button onClick={handleCalculate} className="btn bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded">
              Calculate
            </button>
            <button onClick={handleReset} className="btn bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded">
              Reset
            </button>
          </div>
        </div>

        {/* Result */}
        {dateDiff && (
          <div className="mt-6 text-center text-lg font-semibold space-y-2">
            <div className="flex justify-between">
              <label className="font-bold text-green-700">Years</label>
              <input type="text" value={dateDiff.years} readOnly className="text-center border px-4 py-2 w-full" />
            </div>
            <div className="flex justify-between">
              <label className="font-bold text-green-700">Months</label>
              <input type="text" value={dateDiff.months} readOnly className="text-center border px-4 py-2 w-full" />
            </div>
            <div className="flex justify-between">
              <label className="font-bold text-green-700">Days</label>
              <input type="text" value={dateDiff.days} readOnly className="text-center border px-4 py-2 w-full" />
            </div>
            <div className="flex justify-between">
              <label className="font-bold text-green-700">Total Days</label>
              <input type="text" value={dateDiff.totalDays} readOnly className="text-center border px-4 py-2 w-full" />
            </div>
            <div className="flex justify-between">
              <label className="font-bold text-green-700">Hours</label>
              <input type="text" value={dateDiff.totalHours} readOnly className="text-center border px-4 py-2 w-full" />
            </div>
            <div className="flex justify-between">
              <label className="font-bold text-green-700">Minutes</label>
              <input type="text" value={dateDiff.totalMinutes} readOnly className="text-center border px-4 py-2 w-full" />
            </div>
            <div className="flex justify-between">
              <label className="font-bold text-green-700">Seconds</label>
              <input type="text" value={dateDiff.totalSeconds} readOnly className="text-center border px-4 py-2 w-full" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DateDiffCalculator;
