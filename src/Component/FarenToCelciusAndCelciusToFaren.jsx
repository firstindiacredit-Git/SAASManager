import React, { useState } from 'react';
import { Back } from './back';

const TemperatureConverter = () => {
  const [temperature, setTemperature] = useState('');
  const [result, setResult] = useState('');
  const [unit, setUnit] = useState('C'); // Default unit is Celsius

  const handleTemperatureChange = (e) => {
    setTemperature(e.target.value);
  };

  const handleUnitChange = (e) => {
    setUnit(e.target.value);
    setTemperature(''); // Reset temperature when unit changes
    setResult(''); // Reset result when unit changes
  };

  const convertTemperature = () => {
    let temp = parseFloat(temperature);
    if (isNaN(temp)) {
      setResult('Please enter a valid number');
      return;
    }

    if (unit === 'C') {
      // Celsius to Fahrenheit
      const fahrenheit = (temp * 9) / 5 + 32;
      setResult(`${fahrenheit.toFixed(2)} °F`);
    } else {
      // Fahrenheit to Celsius
      const celsius = ((temp - 32) * 5) / 9;
      setResult(`${celsius.toFixed(2)} °C`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded p-6 max-w-sm w-full">
       <Back/>
        <h1 className="text-2xl font-semibold mb-4 text-center">Temperature Converter</h1>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter Temperature:
          </label>
          <input
            type="number"
            value={temperature}
            onChange={handleTemperatureChange}
            placeholder="Enter value"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Unit:
          </label>
          <select
            value={unit}
            onChange={handleUnitChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="C">Celsius to Fahrenheit</option>
            <option value="F">Fahrenheit to Celsius</option>
          </select>
        </div>

        <button
          onClick={convertTemperature}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Convert
        </button>

        {result && (
          <div className="mt-4 p-2 bg-gray-100 text-center text-lg font-semibold text-gray-800">
            {result}
          </div>
        )}
      </div>
    </div>
  );
};

export default TemperatureConverter;

// import React, { useState } from 'react';

// const TemperatureConverter = () => {
//   const [celsius, setCelsius] = useState(0);
//   const [fahrenheit, setFahrenheit] = useState(32);
//   const [result, setResult] = useState('');

//   const handleCelsiusChange = (e) => {
//     const value = parseFloat(e.target.value);
//     setCelsius(value);

//     const fahrenheitValue = (value * 9) / 5 + 32;
//     setFahrenheit(fahrenheitValue.toFixed(2));
//     setResult(`${value}°C is equal to ${fahrenheitValue.toFixed(2)}°F`);
//   };

//   const handleFahrenheitChange = (e) => {
//     const value = parseFloat(e.target.value);
//     setFahrenheit(value);

//     const celsiusValue = ((value - 32) * 5) / 9;
//     setCelsius(celsiusValue.toFixed(2));
//     setResult(`${value}°F is equal to ${celsiusValue.toFixed(2)}°C`);
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-yellow-100 shadow-md rounded p-6 max-w-md w-full">
//         <h1 className="text-2xl font-semibold mb-4 text-center">Temperature Converter</h1>

//         <div className="grid grid-cols-2 gap-4 mb-4">
//           {/* Celsius Input */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Celsius
//             </label>
//             <div className="relative">
//               <input
//                 type="number"
//                 value={celsius}
//                 onChange={handleCelsiusChange}
//                 className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               <span className="absolute inset-y-0 right-2 flex items-center">°C</span>
//             </div>
//           </div>

//           {/* Fahrenheit Input */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Fahrenheit
//             </label>
//             <div className="relative">
//               <input
//                 type="number"
//                 value={fahrenheit}
//                 onChange={handleFahrenheitChange}
//                 className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               <span className="absolute inset-y-0 right-2 flex items-center">°F</span>
//             </div>
//           </div>
//         </div>

//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Conversion Result
//           </label>
//           <textarea
//             value={result}
//             readOnly
//             className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TemperatureConverter;
