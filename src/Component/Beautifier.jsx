// import React, { useState } from 'react';
// import beautify from 'js-beautify';


// function Beautifier() {
//   const [htmlInput, setHtmlInput] = useState('');
//   const [beautifiedHtml, setBeautifiedHtml] = useState('');

//   // Function to beautify the HTML
//   const beautifyHtml = () => {
//     const formattedHtml = beautify.html(htmlInput, { indent_size: 2, wrap_line_length: 80 });
//     setBeautifiedHtml(formattedHtml);
//   };

//   // Function to copy beautified HTML to clipboard
//   const copyToClipboard = () => {
//     navigator.clipboard.writeText(beautifiedHtml);
//     alert('Beautified HTML copied to clipboard');
//   };

//   // Function to clear inputs
//   const clearInput = () => {
//     setHtmlInput('');
//     setBeautifiedHtml('');
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
//         <h1 className="text-2xl font-bold mb-6 text-center">HTML Beautifier</h1>

//         {/* HTML Input Area */}
//         <textarea
//           value={htmlInput}
//           onChange={(e) => setHtmlInput(e.target.value)}
//           placeholder="Paste your HTML here..."
//           className="w-full h-40 p-4 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />

//         {/* Beautify and Clear Buttons */}
//         <div className="flex justify-between mb-6">
//           <button
//             onClick={beautifyHtml}
//             className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
//           >
//             Beautify
//           </button>
//           <button
//             onClick={clearInput}
//             className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
//           >
//             Clear
//           </button>
//         </div>

//         {/* Beautified Output */}
//         {beautifiedHtml && (
//           <>
//             <textarea
//               readOnly
//               value={beautifiedHtml}
//               className="w-full h-40 p-4 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//             />
//             <div className="flex justify-between">
//               <button
//                 onClick={copyToClipboard}
//                 className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600"
//               >
//                 Copy Beautified HTML
//               </button>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Beautifier;

import React, { useState } from 'react';
// Correctly import 'html' from 'js-beautify'
import { html as beautifyHtmlFunc } from 'js-beautify';
import { Back } from './back';

function Beautifier() {
  const [htmlInput, setHtmlInput] = useState('');
  const [beautifiedHtml, setBeautifiedHtml] = useState('');

  // Function to beautify the HTML
  const beautifyHtml = () => {
    // Ensure you're using the correct beautify function
    const formattedHtml = beautifyHtmlFunc(htmlInput, { indent_size: 2, wrap_line_length: 80 });
    setBeautifiedHtml(formattedHtml);
  };

  // Function to copy beautified HTML to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(beautifiedHtml);
    alert('Beautified HTML copied to clipboard');
  };

  // Function to clear inputs
  const clearInput = () => {
    setHtmlInput('');
    setBeautifiedHtml('');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
      <Back/>
        <h1 className="text-2xl font-bold mb-6 text-center">HTML Beautifier</h1>

        {/* HTML Input Area */}
        <textarea
          value={htmlInput}
          onChange={(e) => setHtmlInput(e.target.value)}
          placeholder="Paste your HTML here..."
          className="w-full h-40 p-4 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Beautify and Clear Buttons */}
        <div className="flex justify-between mb-6">
          <button
            onClick={beautifyHtml}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Beautify
          </button>
          <button
            onClick={clearInput}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            Clear
          </button>
        </div>

        {/* Beautified Output */}
        {beautifiedHtml && (
          <>
            <textarea
              readOnly
              value={beautifiedHtml}
              className="w-full h-40 p-4 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <div className="flex justify-between">
              <button
                onClick={copyToClipboard}
                className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600"
              >
                Copy Beautified HTML
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Beautifier;

