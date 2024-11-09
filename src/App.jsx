import React from 'react';
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom'; 
import Calculator from './Component/Calculator.jsx';
import FarenToCelciusAndCelciusToFaren from './Component/FarenToCelciusAndCelciusToFaren.jsx';
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
import NewTab from './NewTab.jsx';
import Hours from './Component/Hours.jsx';
import Header from './Component/Header.jsx';
import Compress from './Component/Compress.jsx';
import MergePDF from './Component/MergePDF.jsx';
import PdfConverter from './Component/PdfConverter.jsx';
import SearchPDF from './Component/SearchPDF.jsx';
//import SearchExcelPdf from './Component/SearchExcelPdf.jsx';
import Upload from './Component/EditableImage/Upload.jsx'
import EditPdf from './Component/EditPdf.jsx';
import ExtractPages from './Component/ExtractPages.jsx';
import PdfCropper from './Component/PdfCropper.jsx';
import AddPageNum from './Component/AddPageNum.jsx';
import Protect from './Component/Protect.jsx';
import UnlockPdf from './Component/UnlockPdf.jsx';
import PdfToImage from './Component/PdfToImage.jsx';
function App() {
  return (
    <div className='mt-14'>

        {/* Routes */}
      
        <Routes>
          {/* Define your routes here */}
          <Route path="/" element={<NewTab />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/faren-to-celcius" element={<FarenToCelciusAndCelciusToFaren />} />
          <Route path="/second" element={<Second />} />
          <Route path="/hours" element={<Hours />} />
          <Route path="/paypal" element={<Paypal />} />
          <Route path="/beautifier" element={<Beautifier />} />
          <Route path="/resumebuild" element={<ResumeBuild />} />
          <Route path="/grocery" element={<Grocery />} />
          <Route path="/bmi" element={<Bmi />} />
          <Route path="/linkchecker" element={<LinkChecker />} />
          <Route path="/percentage" element={<Percentage />} />
          <Route path="/imagetopdf" element={<ImageToPdf />} />
          <Route path="/splitpdf" element={<SplitPdf />} />
          <Route path="/compress" element={<Compress />} />
          <Route path="/mergepdf" element={<MergePDF />} />
          <Route path="/pdfconverter" element={<PdfConverter />} />
          <Route path="/searchpdf" element={<SearchPDF />} />
          {/* <Route path="/searchexcelpdf" element={<SearchExcelPdf />} /> */}
          <Route path="/upload" element={<Upload />} />
          <Route path="/editpdf" element={<EditPdf />} />
          <Route path="/extractpages" element={<ExtractPages />} />
          <Route path="/pdfcropper" element={<PdfCropper />} />
          <Route path="/addpagenum" element={<AddPageNum />} />
          <Route path="/protect" element={<Protect />} />
          <Route path="/unlockpdf" element={<UnlockPdf />} />
          <Route path="/pdftoimage" element={<PdfToImage />} />
        </Routes>
      </div>
    
  );
}

export default App;

