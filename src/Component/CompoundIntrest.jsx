import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Back } from "./back";

ChartJS.register(ArcElement, Tooltip, Legend);

const CompoundIntrest = () => {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [timesCompounded, setTimesCompounded] = useState("");
  const [time, setTime] = useState("");
  const [result, setResult] = useState(null);
  const [totalDeposit, setTotalDeposit] = useState(null);
  const [totalInterest, setTotalInterest] = useState(null);
  const [interestPercentage, setInterestPercentage] = useState(null);

  const formatCurrency = (amount) => {
    return `₹${Number(amount).toLocaleString()}`;
  };

  const calculateCompoundInterest = () => {
    const P = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const n = parseFloat(timesCompounded);
    const t = parseFloat(time);

    if (isNaN(P) || isNaN(r) || isNaN(n) || isNaN(t)) {
      alert("Please enter valid numbers for all fields.");
      return;
    }

    const A = P * Math.pow(1 + r / n, n * t); // Compound interest formula
    const totalDeposit = P * t; // Total deposit amount
    const totalInterest = A - totalDeposit; // Interest earned
    const interestPercentage = (totalInterest / totalDeposit) * 100; // Interest as a percentage

    setResult(A.toFixed(2));
    setTotalDeposit(totalDeposit.toFixed(2));
    setTotalInterest(totalInterest.toFixed(2));
    setInterestPercentage(interestPercentage.toFixed(2));
  };

  const chartData = {
    labels: ["Total Deposits", "Total Interest"],
    datasets: [
      {
        label: "Amount",
        data: [totalDeposit, totalInterest],
        backgroundColor: ["#4CAF50", "#FFC107"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-lg bg-gray-800 rounded-lg shadow-lg p-6">
        <Back/>
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Compound Interest Calculator (INR)
        </h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            calculateCompoundInterest();
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-white mb-2">Principal Amount (₹)</label>
            <input
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              className="w-full p-2 bg-gray-700 text-white rounded"
              placeholder="Enter principal amount"
              required
            />
          </div>

          <div>
            <label className="block text-white mb-2">
              Annual Interest Rate (%) (r)
            </label>
            <input
              type="number"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              className="w-full p-2 bg-gray-700 text-white rounded"
              placeholder="Enter interest rate"
              required
            />
          </div>

          <div>
            <label className="block text-white mb-2">
              Times Compounded Per Year (n)
            </label>
            <input
              type="number"
              value={timesCompounded}
              onChange={(e) => setTimesCompounded(e.target.value)}
              className="w-full p-2 bg-gray-700 text-white rounded"
              placeholder="Enter times compounded per year"
              required
            />
          </div>

          <div>
            <label className="block text-white mb-2">Time in Years (t)</label>
            <input
              type="number"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full p-2 bg-gray-700 text-white rounded"
              placeholder="Enter time in years"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Calculate
          </button>
        </form>

        {result !== null && (
          <div className="mt-6 p-4 bg-gray-700 text-white rounded-lg">
            <h2 className="text-lg font-semibold">Results:</h2>
            <p className="mt-2">
              <span className="font-bold">Future Value (A):</span>{" "}
              {formatCurrency(result)}
            </p>
            <p className="mt-2">
              <span className="font-bold">Total Deposit Amount:</span>{" "}
              {formatCurrency(totalDeposit)}
            </p>
            <p className="mt-2">
              <span className="font-bold">Total Interest Earned:</span>{" "}
              {formatCurrency(totalInterest)}
            </p>
            <p className="mt-2">
              <span className="font-bold">Interest Percentage:</span>{" "}
              {interestPercentage}%
            </p>
          </div>
        )}
      </div>

      {result !== null && (
        <div className="mt-10 w-full max-w-lg bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4 text-center">
            Visual Breakdown
          </h2>
          <Pie data={chartData} />
        </div>
      )}
    </div>
  );
};

export default CompoundIntrest;
