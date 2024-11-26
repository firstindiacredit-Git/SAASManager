import React, { useState } from "react";
import { Back } from "./back";

// Utility function to calculate age
const calculateAge = (birthDate) => {
  const today = new Date();
  const birth = new Date(birthDate);

  if (birth > today) return "Invalid date!";

  const years = today.getFullYear() - birth.getFullYear();
  const months = today.getMonth() - birth.getMonth();
  const days = today.getDate() - birth.getDate();

  const correctedYears = months < 0 || (months === 0 && days < 0) ? years - 1 : years;

  return correctedYears;
};

const AgeCalculator = () => {
  const [birthDate, setBirthDate] = useState("");
  const [age, setAge] = useState(null);

  const handleCalculate = () => {
    const result = calculateAge(birthDate);
    setAge(result);
  };

  const handleReset = () => {
    setBirthDate("");
    setAge(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-300 text-gray-800">
      <Back/>
      <header className="text-3xl font-extrabold mb-6 text-blue-800">
        Age Calculator
      </header>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex flex-col space-y-4">
          {/* Input */}
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

          {/* Buttons */}
          <div className="flex justify-between space-x-4">
            <button
              onClick={handleCalculate}
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

        {/* Result */}
        {age !== null && (
          <div className="mt-6 text-center text-lg font-semibold">
            {isNaN(age) || age === "Invalid date!" ? (
              <span className="text-red-600">Invalid date entered!</span>
            ) : (
              <>
                Your Age: <span className="text-blue-700">{age}</span> years
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AgeCalculator;
