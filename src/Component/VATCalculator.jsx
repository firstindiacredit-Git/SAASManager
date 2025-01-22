import React, { useState } from "react";
import { Back } from "./back";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const VATCalculator = () => {
  const [amount, setAmount] = useState("");
  const [vatRate, setVatRate] = useState("");
  const [calculationType, setCalculationType] = useState("add");
  const [result, setResult] = useState(null);
  const [showTooltip, setShowTooltip] = useState({ add: false, remove: false });

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

  // Chart options
  const chartOptions = {
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Amount Distribution",
        position: "bottom",
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  const calculateVAT = (e) => {
    e.preventDefault();
    const value = parseFloat(amount);
    const vat = parseFloat(vatRate);

    if (isNaN(value) || isNaN(vat) || value < 0 || vat < 0) {
      alert("Please enter valid and non-negative inputs.");
      setResult(null);
      return;
    }

    let baseAmount, vatAmount, totalAmount;

    if (calculationType === "add") {
      baseAmount = value;
      vatAmount = (value * vat) / 100;
      totalAmount = value + vatAmount;
    } else {
      totalAmount = value;
      baseAmount = value / (1 + vat / 100);
      vatAmount = value - baseAmount;
    }

    // Prepare chart data
    const chartData = {
      labels: ["Base Amount", "VAT Amount"],
      datasets: [
        {
          data: [baseAmount, vatAmount],
          backgroundColor: ["#818cf8", "#4ade80"],
          borderColor: ["#6366f1", "#22c55e"],
          borderWidth: 1,
        },
      ],
    };

    setResult({
      baseAmount,
      vatAmount,
      totalAmount,
      vatRate: vat,
      chartData,
    });
  };

  const handleCountryChange = (e) => {
    const country = e.target.value;
    setSelectedCountry(country);
    setVatRate(countries[country].vat);
    setCurrency(countries[country].currency);
  };

  const handleReset = () => {
    setAmount("");
    setVatRate(countries[selectedCountry].vat);
    setResult(null);
  };

  const formatCurrency = (value) => {
    return `${currency}${value.toFixed(2)}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-4">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-[30px] shadow-md border-2 border-gray-100">
          <Back />
          <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
            VAT Calculator
          </h1>

          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Left Column - Input Form */}
              <div className="space-y-6">
                <form onSubmit={calculateVAT} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      Select Country
                    </label>
                    <select
                      value={selectedCountry}
                      onChange={handleCountryChange}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-colors"
                    >
                      {Object.keys(countries).map((country) => (
                        <option key={country} value={country}>
                          {country} ({countries[country].vat}% VAT)
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      Calculation Type
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setCalculationType("add")}
                          onMouseEnter={() => setShowTooltip({ ...showTooltip, add: true })}
                          onMouseLeave={() => setShowTooltip({ ...showTooltip, add: false })}
                          className={`w-full px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                            calculationType === "add"
                              ? "bg-indigo-600 text-white"
                              : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                          }`}
                        >
                          VAT Exclusive
                        </button>
                        {showTooltip.add && (
                          <div className="absolute z-10 w-64 p-2 mt-2 text-sm text-white bg-gray-900 rounded-lg shadow-lg">
                            When VAT is exclusive, the tax is added to the base amount. 
                            Example: Base {currency}100 + {countries[selectedCountry].vat}% VAT = Total {currency}{(100 * (1 + countries[selectedCountry].vat / 100)).toFixed(2)}
                          </div>
                        )}
                      </div>
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setCalculationType("remove")}
                          onMouseEnter={() => setShowTooltip({ ...showTooltip, remove: true })}
                          onMouseLeave={() => setShowTooltip({ ...showTooltip, remove: false })}
                          className={`w-full px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                            calculationType === "remove"
                              ? "bg-indigo-600 text-white"
                              : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                          }`}
                        >
                          VAT Inclusive
                        </button>
                        {showTooltip.remove && (
                          <div className="absolute z-10 w-64 p-2 mt-2 text-sm text-white bg-gray-900 rounded-lg shadow-lg">
                            When VAT is inclusive, the tax is already included in the total amount. 
                            Example: Total {currency}120 includes {countries[selectedCountry].vat}% VAT (Base {currency}100)
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      {calculationType === "add" ? "Base Amount" : "Total Amount"} ({currency})
                    </label>
                    <input
                      type="text"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-colors"
                      placeholder={`Enter ${calculationType === "add" ? "base" : "total"} amount`}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      VAT Rate (%)
                    </label>
                    <input
                      type="text"
                      value={vatRate}
                      onChange={(e) => setVatRate(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-colors"
                      placeholder="Enter VAT rate"
                      required
                    />
                  </div>

                  <div className="flex space-x-3 pt-2">
                    <button
                      type="submit"
                      className="flex-1 bg-indigo-600 text-white px-4 py-3 rounded-xl hover:bg-indigo-700 transition-colors duration-200"
                    >
                      Calculate
                    </button>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors duration-200"
                    >
                      Reset
                    </button>
                  </div>
                </form>
              </div>

              {/* Right Column - Results */}
              <div className="space-y-6">
                {result ? (
                  <>
                    <div className="bg-white p-6 rounded-xl border border-gray-200">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-indigo-50 rounded-lg h-32 flex flex-col justify-center">
                          <p className="text-sm text-gray-600">Base Amount</p>
                          <p className="text-2xl font-bold text-indigo-600 mt-2">
                            {formatCurrency(result.baseAmount)}
                          </p>
                        </div>
                        <div className="p-4 bg-green-50 rounded-lg h-32 flex flex-col justify-center">
                          <p className="text-sm text-gray-600">VAT Amount</p>
                          <p className="text-2xl font-bold text-green-600 mt-2">
                            {formatCurrency(result.vatAmount)}
                          </p>
                        </div>
                        <div className="p-4 bg-orange-50 rounded-lg h-32 flex flex-col justify-center">
                          <p className="text-sm text-gray-600">Final Amount</p>
                          <p className="text-2xl font-bold text-orange-600 mt-2">
                            {formatCurrency(result.totalAmount)}
                          </p>
                        </div>
                        <div className="p-4 bg-purple-50 rounded-lg h-32 flex flex-col justify-center">
                          <p className="text-sm text-gray-600">VAT Rate</p>
                          <p className="text-2xl font-bold text-purple-600 mt-2">
                            {result.vatRate}%
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Distribution Chart
                      </h3>
                      <div className="h-64">
                        <Pie data={result.chartData} options={chartOptions} />
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="bg-white p-6 rounded-xl border border-gray-200 h-full flex flex-col items-center justify-center text-gray-500">
                    <svg
                      className="w-16 h-16 mb-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                    <p className="text-lg">Enter values and calculate to see the results</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VATCalculator;
