import React, { useState } from "react";
import { Back } from "./back";

// Fraction utility functions
const addFractions = (num1, den1, num2, den2) => {
  const commonDenominator = den1 * den2;
  const numerator = num1 * den2 + num2 * den1;
  return simplifyFraction(numerator, commonDenominator);
};

const subtractFractions = (num1, den1, num2, den2) => {
  const commonDenominator = den1 * den2;
  const numerator = num1 * den2 - num2 * den1;
  return simplifyFraction(numerator, commonDenominator);
};

const multiplyFractions = (num1, den1, num2, den2) => {
  const numerator = num1 * num2;
  const denominator = den1 * den2;
  return simplifyFraction(numerator, denominator);
};

const divideFractions = (num1, den1, num2, den2) => {
  const numerator = num1 * den2;
  const denominator = den1 * num2;
  return simplifyFraction(numerator, denominator);
};

const simplifyFraction = (num, den) => {
  const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
  const divisor = gcd(num, den);
  return { numerator: num / divisor, denominator: den / divisor };
};

// Main Component
const FractionCalculator = () => {
  const [result, setResult] = useState({ numerator: 0, denominator: 1 });

  const handleOperation = (operation) => {
    const num1 = parseInt(document.querySelector("[name='numerator1']").value) || 0;
    const den1 = parseInt(document.querySelector("[name='denominator1']").value) || 1;
    const num2 = parseInt(document.querySelector("[name='numerator2']").value) || 0;
    const den2 = parseInt(document.querySelector("[name='denominator2']").value) || 1;

    let res;
    switch (operation) {
      case "add":
        res = addFractions(num1, den1, num2, den2);
        break;
      case "subtract":
        res = subtractFractions(num1, den1, num2, den2);
        break;
      case "multiply":
        res = multiplyFractions(num1, den1, num2, den2);
        break;
      case "divide":
        res = divideFractions(num1, den1, num2, den2);
        break;
      default:
        res = { numerator: 0, denominator: 1 };
    }
    setResult(res);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-gray-800">
        <Back/>
      <header className="text-3xl font-extrabold mb-6 text-blue-800">
        Fraction Calculator
      </header>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <form className="flex flex-col space-y-6">
          {/* Fraction Inputs */}
          <div className="flex space-x">
            <Input label="Numerator 1" name="numerator1" />
            <Input label="Denominator 1" name="denominator1" />
          </div>
          <div className="flex space-x">
            <Input label="Numerator 2" name="numerator2" />
            <Input label="Denominator 2" name="denominator2" />
          </div>

          {/* Operation Buttons */}
          <div className="grid grid-cols-2 gap-4">
            {["Add", "Subtract", "Multiply", "Divide"].map((op) => (
              <button
                key={op}
                type="button"
                className="btn"
                onClick={() => handleOperation(op.toLowerCase())}
              >
                {op}
              </button>
            ))}
          </div>
        </form>

        {/* Result */}
        <div className="mt-6 text-center text-lg font-semibold">
          Result:{" "}
          <span className="text-blue-700">
            {result.numerator}/{result.denominator}
          </span>
        </div>
      </div>
    </div>
  );
};

// Input Component
const Input = ({ label, name }) => (
  <div className="flex flex-col w-full">
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <input
      type="number"
      name={name}
      className="mt-1 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
    />
  </div>
);

export default FractionCalculator;
