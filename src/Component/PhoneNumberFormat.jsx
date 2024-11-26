// import { useState } from "react";
// import axios from "axios";

// function PhoneNumberFormat() {
//   const [numbers, setNumbers] = useState("");
//   const [results, setResults] = useState([]);

//   const handleSubmit = async () => {
//     try {
//       const response = await axios.post("http://localhost:5000/api/validate", {
//         numbers: numbers, // Send the numbers as a single string
//       });
//       setResults(response.data.results);
//     } catch (error) {
//       console.error("Error validating numbers", error);
//     }
//   };

//   // Split results into valid and invalid categories
//   const validResults = results.filter(result => result.isValid);
//   const invalidResults = results.filter(result => !result.isValid);

//   return (
//     <div className="container">
//       <h1>Mobile Number Validator</h1>

//       <textarea
//         value={numbers}
//         onChange={(e) => setNumbers(e.target.value)}
//         placeholder="Enter mobile numbers separated by commas or new lines"
//         className="input-field"
//       />

//       <div className="button-container">
//         <button onClick={handleSubmit} className="validate-btn">Validate Numbers</button>
//       </div>

//       <div className="results-container">
//         <div className="results valid-results">
//           <h2>Valid Numbers:</h2>
//           <ul>
//             {validResults.map((result, index) => (
//               <li key={index} className="valid">
//                 {result.formattedNumber} ({result.countryCode ? `+${result.countryCode}` : "Unknown"})
//               </li>
//             ))}
//           </ul>
//         </div>

//         <div className="results invalid-results">
//           <h2>Invalid Numbers:</h2>
//           <ul>
//             {invalidResults.map((result, index) => (
//               <li key={index} className="invalid">
//                 {result.formattedNumber} ({result.countryCode ? `+${result.countryCode}` : "Unknown"})
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default PhoneNumberFormat;


import { useState } from "react";
import axios from "axios";
import { Back } from "./back";

function PhoneNumberFormat() {
  const [numbers, setNumbers] = useState("");
  const [results, setResults] = useState([]);

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:4000/api/validate", {
        numbers: numbers, // Send the numbers as a single string
      });
      setResults(response.data.results);
    } catch (error) {
      console.error("Error validating numbers", error);
    }
  };

  // Split results into valid and invalid categories
  const validResults = results.filter((result) => result.isValid);
  const invalidResults = results.filter((result) => !result.isValid);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 py-8 px-4">
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
        <Back/>
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          📱 Mobile Number Validator
        </h1>

        <textarea
          value={numbers}
          onChange={(e) => setNumbers(e.target.value)}
          placeholder="Enter mobile numbers separated by commas or new lines"
          className="w-full border border-gray-300 rounded-lg p-4 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none mb-6"
          rows={6}
        />

        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600 transition duration-300"
          >
            Validate Numbers
          </button>
        </div>

        <div className="mt-8">
          {/* Valid Numbers Section */}
          <div className="mb-6">
            <h2 className="text-xl font-medium text-green-600 mb-4">
              ✅ Valid Numbers:
            </h2>
            <ul className="space-y-2">
              {validResults.length > 0 ? (
                validResults.map((result, index) => (
                  <li
                    key={index}
                    className="bg-green-50 border border-green-200 rounded-lg p-3 text-green-700"
                  >
                    {result.formattedNumber} (
                    {result.countryCode ? `+${result.countryCode}` : "Unknown"})
                  </li>
                ))
              ) : (
                <p className="text-gray-500">No valid numbers found.</p>
              )}
            </ul>
          </div>

          {/* Invalid Numbers Section */}
          <div>
            <h2 className="text-xl font-medium text-red-600 mb-4">
              ❌ Invalid Numbers:
            </h2>
            <ul className="space-y-2">
              {invalidResults.length > 0 ? (
                invalidResults.map((result, index) => (
                  <li
                    key={index}
                    className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700"
                  >
                    {result.formattedNumber} (
                    {result.countryCode ? `+${result.countryCode}` : "Unknown"})
                  </li>
                ))
              ) : (
                <p className="text-gray-500">No invalid numbers found.</p>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PhoneNumberFormat;
