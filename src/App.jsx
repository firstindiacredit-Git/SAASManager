// import React from 'react';
// import Calculator from './Component/Calculator';
// import FarenToCelciusAndCelciusToFaren from './Component/FarenToCelciusAndCelciusToFaren';
// import Convert from './Component/convert';
// import Second from './Component/Second';
// import Paypal from './Component/Paypal';
// import Beautifier from './Component/Beautifier';


// function App() {
//   return (
//     <div className="App">
//       <Calculator />
//       <FarenToCelciusAndCelciusToFaren/>
//       <Convert/>
//       <Second/>
//       <Paypal/>
//       <Beautifier/>

//     </div>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Calculator from './Component/Calculator';
import FarenToCelciusAndCelciusToFaren from './Component/FarenToCelciusAndCelciusToFaren';
import Convert from './Component/Convert';
import Second from './Component/Second';
import Paypal from './Component/Paypal';
import Beautifier from './Component/Beautifier';
import ResumeBuild from './Component/ResumeBuild';

function App() {
  return (
    <Router>
      <div className="App min-h-screen bg-gray-100 p-6 border-solid border-2 border-sky-500">
        <h1 className="text-3xl font-bold text-center mb-8">App Navigation</h1>

        {/* Navigation Buttons */}
        <div className="flex justify-center space-x-4 mb-8">
          <Link to="/calculator">
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Calculator
            </button>
          </Link>

          <Link to="/faren-to-celcius">
            <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
              Farenheit to Celcius
            </button>
          </Link>

          <Link to="/convert">
            <button className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600">
              Convert HH:MM:SS to seconds
            </button>
          </Link>

          <Link to="/second">
            <button className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
              Convert seconds to HH:MM:SS
            </button>
          </Link>

          <Link to="/paypal">
            <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
              Paypal Link Generator
            </button>
          </Link>

          <Link to="/beautifier">
            <button className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600">
              HTML Beautifier
            </button>
          </Link>

          <Link to="/resumebuild">
            <button className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600">
              Resume
            </button>
          </Link>
        </div>

        {/* Routes for Components */}
        <Routes>
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/faren-to-celcius" element={<FarenToCelciusAndCelciusToFaren />} />
          <Route path="/convert" element={<Convert />} />
          <Route path="/second" element={<Second />} />
          <Route path="/paypal" element={<Paypal />} />
          <Route path="/beautifier" element={<Beautifier />} />
          <Route path="/resumebuild" element={<ResumeBuild />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

