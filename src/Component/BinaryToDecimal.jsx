import React, { useState } from "react";
import { Back } from "./back";

const BinaryToDecimal = () => {
  const [inputValue, setInputValue] = useState(""); // Store input value
  const [outputValue, setOutputValue] = useState(""); // Store output value
  const [isBinaryToDecimal, setIsBinaryToDecimal] = useState(true); // Track conversion direction

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Convert Binary to Decimal
  const convertBinaryToDecimal = (binary) => {
    if (/^[01]+$/.test(binary)) {
      return parseInt(binary, 2);
    }
    return "Invalid Binary";
  };

  // Convert Decimal to Binary
  const convertDecimalToBinary = (decimal) => {
    if (!isNaN(decimal) && decimal >= 0) {
      return parseInt(decimal, 10).toString(2);
    }
    return "Invalid Decimal";
  };

  const handleConversion = () => {
    if (isBinaryToDecimal) {
      setOutputValue(convertBinaryToDecimal(inputValue));
    } else {
      setOutputValue(convertDecimalToBinary(inputValue));
    }
  };

  const handleSwap = () => {
    setIsBinaryToDecimal(!isBinaryToDecimal);
    setInputValue(""); // Clear input when swapping
    setOutputValue(""); // Clear output when swapping
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-900 p-6">
      <div className="w-full max-w-lg bg-gray-800 p-6 rounded-lg shadow-lg">
        <Back/>
        <h1 className="text-4xl font-bold text-center text-white mb-6">
          Binary / Decimal Converter
        </h1>

        <div className="space-y-6">
          {/* Input Field */}
          <div>
            <label className="block text-white mb-2">
              {isBinaryToDecimal ? "Binary" : "Decimal"} Input:
            </label>
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              className="w-full p-4 text-lg bg-gray-700 text-white rounded focus:outline-none"
              placeholder={isBinaryToDecimal ? "Enter binary" : "Enter decimal"}
            />
          </div>

          {/* Output Field */}
          <div>
            <label className="block text-white mb-2">Converted Output:</label>
            <input
              type="text"
              value={outputValue}
              readOnly
              className="w-full p-4 text-lg bg-gray-700 text-white rounded focus:outline-none cursor-not-allowed"
              placeholder="Output will be shown here"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-between items-center space-x-4">
            <button
              onClick={handleConversion}
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 focus:outline-none"
            >
              Convert
            </button>
            <button
              onClick={handleSwap}
              className="w-full bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 focus:outline-none"
            >
              Swap
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BinaryToDecimal;
