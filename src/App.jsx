
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Calculator from './Component/Calculator.jsx';
import FarenToCelciusAndCelciusToFaren from './Component/FarenToCelciusAndCelciusToFaren.jsx';
//import Convert from './Component/Convert.jsx';
import Second from './Component/Second.jsx';
import Paypal from './Component/Paypal.jsx';
import Beautifier from './Component/Beautifier.jsx';
import ResumeBuild from './Component/ResumeBuild.jsx';
import Grocery from './Component/Grocery.jsx';
import Bmi from './Component/Bmi.jsx';
import LinkChecker from './Component/LinkChecker.jsx';
import Percentage from './Component/Percentage.jsx';
import ImageToPdf from './Component/ImageToPdf.jsx';
import SplitPdf from './Component/SplitPdf.jsx';

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

          {/* <Link to="/convert">
            <button className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600">
              Convert HH:MM:SS to seconds
            </button>
          </Link> */}

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
          <Link to="/grocery">
            <button className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600">
              Grocery List
            </button>
          </Link>
          <Link to="/bmi">
            <button className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600">
              BMI Calculator
            </button>
          </Link>
          <Link to="/linkchecker">
            <button className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600">
              Link Checker
            </button>
          </Link>
          <Link to="/percentage">
            <button className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600">
              Percentage Calculator
            </button>
          </Link>
          <Link to="/imagetopdf">
            <button className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600">
              Image To PDF
            </button>
          </Link>
          <Link to="/splitpdf">
            <button className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600">
              Split PDF
            </button>
          </Link>
          
        </div>

        {/* Routes for Components */}
        <Routes>
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/faren-to-celcius" element={<FarenToCelciusAndCelciusToFaren />} />
          {/* <Route path="/convert" element={<Convert />} /> */}
          <Route path="/second" element={<Second />} />
          <Route path="/paypal" element={<Paypal />} />
          <Route path="/beautifier" element={<Beautifier />} />
          <Route path="/resumebuild" element={<ResumeBuild />} />
          <Route path="/grocery" element={<Grocery/>} />
          <Route path="/bmi" element={<Bmi/>} />
          <Route path="/linkchecker" element={<LinkChecker/>} />
          <Route path="/percentage" element={<Percentage/>} />
          <Route path="/imagetopdf" element={<ImageToPdf/>} />
          <Route path="/splitpdf" element={<SplitPdf/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

