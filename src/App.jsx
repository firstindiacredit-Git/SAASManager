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
import PdfToWord from './Component/PdfToWord.jsx';
import Scientific from './Component/Scientific.jsx';
import BulkEmailChecker from './Component/BulkEmailChecker.jsx';
import BulkEmailSender from './Component/BulkEmailSender.jsx';
import GoogleMap from './Component/GoogleMap.jsx';
import CardValidation from './Component/CardValidation.jsx';
import CardGenerator from './Component/CardGenerator.jsx';
import TemplateGenerator from './Component/TemplateGenerator.jsx';
import CompareLoan from './Component/CompareLoan.jsx';
import CurrencyConverter from './Component/CurrencyConverter.jsx';
import TextToSpeech from './Component/TextToSpeech.jsx';
import SpeechToText from './Component/SpeechToText.jsx';
import OnlineVoiceRecorder from './Component/OnlineVoiceRecorder.jsx';
import OnlineScreenrecoder from './Component/OnlineScreenrecoder.jsx';
import OnlineScreenshot from './Component/OnlineScreenshot.jsx';
import OnlineWebcamTest from './Component/OnlineWebcamTest.jsx';
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
          <Route path="/pdftoword" element={<PdfToWord />} />
          <Route path="/scientific" element={<Scientific />} />
          <Route path="/bulkemailchecker" element={<BulkEmailChecker />} />
          <Route path="/bulkemailsender" element={<BulkEmailSender />} />
          <Route path="/googlemap" element={<GoogleMap />} />
          <Route path="/cardvalidation" element={<CardValidation />} />
          <Route path="/cardgenerator" element={<CardGenerator />} />
          <Route path="/templategenerator" element={<TemplateGenerator />} />
          <Route path="/compareloan" element={<CompareLoan />} />
          <Route path="/currencyconverter" element={<CurrencyConverter />} />
          <Route path="/texttospeech" element={<TextToSpeech />} />
          <Route path="/speechtotext" element={<SpeechToText />} />
          <Route path="/onlinevoiceRecorder" element={<OnlineVoiceRecorder />} />
          <Route path="/onlinescreenRecorder" element={<OnlineScreenrecoder />} />
          <Route path="/onlinescreenshot" element={<OnlineScreenshot />} />
          <Route path="/onlinewebcamtest" element={<OnlineWebcamTest />} />
        </Routes>
      </div>
    
  );
}

export default App;

