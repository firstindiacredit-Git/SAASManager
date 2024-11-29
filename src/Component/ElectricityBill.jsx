import React, { useState } from "react";
import { Back } from "./back";

const ElectricityBillCalculator = () => {
  const [units, setUnits] = useState("");
  const [ratePerUnit, setRatePerUnit] = useState("");
  const [fixedCharges, setFixedCharges] = useState(0);
  const [totalBill, setTotalBill] = useState(null);

  // Calculate the electricity bill
  const calculateBill = (e) => {
    e.preventDefault();
    let unitsConsumed = parseFloat(units);
    let rate = parseFloat(ratePerUnit);

    // Check if the values are valid
    if (isNaN(unitsConsumed) || unitsConsumed < 0 || isNaN(rate) || rate < 0) {
      alert("Please enter valid units and rate per unit.");
      setTotalBill(null);
      return;
    }

    // Calculate the total bill based on units consumed and rate per unit
    let billAmount = unitsConsumed * rate;

    // Add fixed charges if any
    billAmount += parseFloat(fixedCharges);

    setTotalBill(billAmount);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg border">
        <Back/>
      <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">Electricity Bill Calculator</h2>
      <form onSubmit={calculateBill} className="space-y-6">
        {/* Units Consumed */}
        <div>
          <label htmlFor="units" className="block text-sm font-medium text-gray-700">
            Units Consumed
          </label>
          <input
            id="units"
            type="number"
            value={units}
            onChange={(e) => setUnits(e.target.value)}
            className="w-full mt-2 p-2 border rounded-md"
            placeholder="Enter units consumed"
          />
        </div>

        {/* Rate per Unit */}
        <div>
          <label htmlFor="ratePerUnit" className="block text-sm font-medium text-gray-700">
            Rate per Unit
          </label>
          <input
            id="ratePerUnit"
            type="number"
            value={ratePerUnit}
            onChange={(e) => setRatePerUnit(e.target.value)}
            className="w-full mt-2 p-2 border rounded-md"
            placeholder="Enter rate per unit"
          />
        </div>

        {/* Fixed Charges */}
        <div>
          <label htmlFor="fixedCharges" className="block text-sm font-medium text-gray-700">
            Fixed Charges (Optional)
          </label>
          <input
            id="fixedCharges"
            type="number"
            value={fixedCharges}
            onChange={(e) => setFixedCharges(e.target.value)}
            className="w-full mt-2 p-2 border rounded-md"
            placeholder="Enter fixed charges"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        >
          Calculate Bill
        </button>
      </form>

      {/* Result Display */}
      {totalBill !== null && (
        <div className="mt-6 p-4 bg-green-100 text-green-800 rounded-md">
          <p>
            <strong>Total Bill:</strong> ₹{totalBill.toFixed(2)}
          </p>
        </div>
      )}
    </div>
  );
};

export default ElectricityBillCalculator;
