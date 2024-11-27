import React, { useState } from 'react';
import { Back } from './back';

const AgeCalculator = () => {
  const [birthDate, setBirthDate] = useState('');
  const [ageDetails, setAgeDetails] = useState(null);

  const calculateAge = () => {
    if (!birthDate) return;

    const today = new Date();
    const birthDateObj = new Date(birthDate);
    const diffInMilliseconds = today.getTime() - birthDateObj.getTime();
    const totalDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));

    const years = Math.floor(totalDays / 365);
    const months = Math.floor((totalDays % 365) / 30);
    const days = Math.floor((totalDays % 365) % 30);

    setAgeDetails({ years, months, days });
  };

  const handleReset = () => {
    setBirthDate('');
    setAgeDetails(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-zink-100 to-zink-300 text-gray-800">
      <Back/>
      <header className="text-3xl font-extrabold mb-6 text-blue-800">
        Age Calculator
      </header>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex flex-col space-y-4">
          <div>
            <label
              htmlFor="birthDate"
              className="block text-sm font-medium text-gray-700"
            >
              Enter Your Birth Date:
            </label>
            <input
              id="birthDate"
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="mt-1 px-3 py-2 border border-gray-300 rounded-lg shadow-sm w-full focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex justify-between space-x-4">
            <button
              onClick={calculateAge}
              className="btn bg-blue-500 hover:bg-blue-600"
            >
              Calculate
            </button>
            <button
              onClick={handleReset}
              className="btn bg-red-500 hover:bg-red-600"
            >
              Reset
            </button>
          </div>
        </div>
        {ageDetails && (
          <div className="mt-6 text-center text-lg font-semibold space-y-2">
            <div className="space-y-1">
              <div className="flex justify-between">
                <label className="font-bold text-blue-700">Years</label>
                <input
                  type="text"
                  value={ageDetails.years}
                  readOnly
                  className="text-center border px-4 py-2 w-full"
                />
              </div>
              <div className="flex justify-between">
                <label className="font-bold text-blue-700">Months</label>
                <input
                  type="text"
                  value={ageDetails.months}
                  readOnly
                  className="text-center border px-4 py-2 w-full"
                />
              </div>
              <div className="flex justify-between">
                <label className="font-bold text-blue-700">Days</label>
                <input
                  type="text"
                  value={ageDetails.days}
                  readOnly
                  className="text-center border px-4 py-2 w-full"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgeCalculator;