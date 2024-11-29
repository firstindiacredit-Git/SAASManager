import React, { useState } from "react";
import { Back } from "./back";

const TestCalculator = () => {
  const [totalQuestions, setTotalQuestions] = useState(10);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [percentage, setPercentage] = useState(100);
  const [letterGrade, setLetterGrade] = useState("A");
  const [fractionGrade, setFractionGrade] = useState("10/10");

  // Function to handle wrong answer increment
  const addWrongAnswer = () => {
    if (wrongAnswers < totalQuestions) {
      setWrongAnswers(wrongAnswers + 1);
    }
  };

  // Function to handle reset
  const resetCalculator = () => {
    setWrongAnswers(0);
    setTotalQuestions(10);
    setPercentage(100);
    setLetterGrade("A");
    setFractionGrade("10/10");
  };

  // Function to calculate the percentage and grades
  const calculateResults = () => {
    const correctAnswers = totalQuestions - wrongAnswers;
    const percentageValue = (correctAnswers / totalQuestions) * 100;
    setPercentage(percentageValue.toFixed(2));
    setFractionGrade(`${correctAnswers}/${totalQuestions}`);

    // Calculate Letter grade based on percentage
    if (percentageValue >= 90) {
      setLetterGrade("A");
    } else if (percentageValue >= 80) {
      setLetterGrade("B+");
    } else if (percentageValue >= 70) {
      setLetterGrade("B");
    } else if (percentageValue >= 60) {
      setLetterGrade("C");
    } else if (percentageValue >= 50) {
      setLetterGrade("D");
    } else {
      setLetterGrade("F");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
        <Back/>
      <h2 className="text-3xl font-bold text-center mb-4 text-gray-700">Test Calculator</h2>
      
      <div className="mb-4">
        <span className="font-medium text-gray-600">Grades scale:</span>
        <span className="ml-2 text-gray-500">A+, A, A-, B+, B, C, D,...</span>
      </div>
      
      {/* Input for number of questions */}
      <div className="mb-4">
        <label className="block text-gray-600">Number of questions</label>
        <input
          type="number"
          value={totalQuestions}
          onChange={(e) => setTotalQuestions(e.target.value)}
          className="mt-2 p-2 w-full border rounded-md"
        />
      </div>
      
      {/* Input for number of wrong answers */}
      <div className="mb-4">
        <label className="block text-gray-600">Number of wrong answers</label>
        <input
          type="number"
          value={wrongAnswers}
          onChange={(e) => setWrongAnswers(e.target.value)}
          className="mt-2 p-2 w-full border rounded-md"
        />
      </div>

      {/* Button to add wrong answer */}
      <div className="mb-4">
        <button
          onClick={addWrongAnswer}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          + Wrong
        </button>
      </div>

      {/* Button to reset the calculator */}
      <div className="mb-6">
        <button
          onClick={resetCalculator}
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
        >
          Reset
        </button>
      </div>

      {/* Results Section */}
      <div className="mt-6">
        <div className="mb-2">
          <span className="font-semibold text-gray-700">Percentage grade: </span>
          <span className="text-gray-600">{percentage}%</span>
        </div>

        <div className="mb-2">
          <span className="font-semibold text-gray-700">Letter grade: </span>
          <span className="text-gray-600">{letterGrade}</span>
        </div>

        <div className="mb-2">
          <span className="font-semibold text-gray-700">Fraction grade: </span>
          <span className="text-gray-600">{fractionGrade}</span>
        </div>
      </div>

      {/* Calculate Results Button */}
      <div className="mt-4">
        <button
          onClick={calculateResults}
          className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Calculate
        </button>
      </div>
    </div>
  );
};

export default TestCalculator;
