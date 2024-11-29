import React, { useState } from "react";
import { Back } from "./back";

const VATCalculator = () => {
  const [amount, setAmount] = useState("");
  const [vatRate, setVatRate] = useState("");
  const [calculationType, setCalculationType] = useState("add"); // 'add' or 'remove'
  const [vatAmount, setVatAmount] = useState(null);
  const [finalAmount, setFinalAmount] = useState(null);

  const countries = {
    India: { vat: 18, currency: "₹" },
    USA: { vat: 10, currency: "$" },
    UK: { vat: 20, currency: "£" },
    Germany: { vat: 19, currency: "€" },
    France: { vat: 20, currency: "€" },
    Canada: { vat: 5, currency: "$" },
    Australia: { vat: 10, currency: "A$" },
    Japan: { vat: 10, currency: "¥" },
  };

  const [selectedCountry, setSelectedCountry] = useState("India");
  const [currency, setCurrency] = useState(countries["India"].currency);

  const calculateVAT = (e) => {
    e.preventDefault();
    const value = parseFloat(amount);
    const vat = parseFloat(vatRate);

    if (isNaN(value) || isNaN(vat) || value < 0 || vat < 0) {
      alert("Please enter valid and non-negative inputs.");
      setVatAmount(null);
      setFinalAmount(null);
      return;
    }

    if (calculationType === "add") {
      const vatValue = (value * vat) / 100;
      const total = value + vatValue;
      setVatAmount(vatValue);
      setFinalAmount(total);
    } else if (calculationType === "remove") {
      const baseAmount = value / (1 + vat / 100);
      const vatValue = value - baseAmount;
      setVatAmount(vatValue);
      setFinalAmount(baseAmount);
    }
  };

  const handleCountryChange = (e) => {
    const country = e.target.value;
    setSelectedCountry(country);
    setVatRate(countries[country].vat);
    setCurrency(countries[country].currency);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
        <Back/>
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
        VAT Calculator
      </h2>
      <form onSubmit={calculateVAT} className="space-y-6">
        {/* Country Selection */}
        <div>
          <label htmlFor="country" className="block text-sm font-medium text-gray-700">
            Select Country
          </label>
          <select
            id="country"
            value={selectedCountry}
            onChange={handleCountryChange}
            className="w-full mt-1 p-2 border rounded-md"
          >
            {Object.keys(countries).map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>

        {/* Amount Input */}
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
            Amount ({currency})
          </label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full mt-1 p-2 border rounded-md"
            placeholder="Enter the amount"
          />
        </div>

        {/* VAT Rate Input */}
        <div>
          <label htmlFor="vatRate" className="block text-sm font-medium text-gray-700">
            VAT Rate (%)
          </label>
          <input
            id="vatRate"
            type="number"
            value={vatRate}
            onChange={(e) => setVatRate(e.target.value)}
            className="w-full mt-1 p-2 border rounded-md"
            placeholder="Enter VAT rate"
          />
        </div>

        {/* Calculation Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Calculation Type
          </label>
          <div className="flex items-center space-x-4 mt-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="calculationType"
                value="add"
                checked={calculationType === "add"}
                onChange={() => setCalculationType("add")}
                className="mr-2"
              />
              Add VAT
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="calculationType"
                value="remove"
                checked={calculationType === "remove"}
                onChange={() => setCalculationType("remove")}
                className="mr-2"
              />
              Remove VAT
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        >
          Calculate
        </button>
      </form>

      {/* Results */}
      {vatAmount !== null && finalAmount !== null && (
        <div className="mt-6 p-4 bg-green-100 text-green-800 rounded-md">
          {calculationType === "add" ? (
            <>
              <p>
                VAT Amount: <strong>{currency}{vatAmount.toFixed(2)}</strong>
              </p>
              <p>
                Total Amount (Including VAT): <strong>{currency}{finalAmount.toFixed(2)}</strong>
              </p>
            </>
          ) : (
            <>
              <p>
                VAT Amount: <strong>{currency}{vatAmount.toFixed(2)}</strong>
              </p>
              <p>
                Base Amount (Excluding VAT): <strong>{currency}{finalAmount.toFixed(2)}</strong>
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default VATCalculator;
