// import React, { useState } from "react";
// import * as pdfjsLib from "pdfjs-dist/webpack";

// const PdfToImage = () => {
//   const [images, setImages] = useState([]);
  
//   // Load PDF from file input
//   const handlePdfUpload = async (event) => {
//     const file = event.target.files[0];
//     if (file && file.type === "application/pdf") {
//       const pdfData = await file.arrayBuffer();
//       const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;

//       const pages = [];
//       for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
//         const page = await pdf.getPage(pageNum);
//         const canvas = document.createElement("canvas");
//         const context = canvas.getContext("2d");
        
//         const viewport = page.getViewport({ scale: 1.5 });
//         canvas.width = viewport.width;
//         canvas.height = viewport.height;

//         await page.render({ canvasContext: context, viewport }).promise;
//         pages.push(canvas.toDataURL("image/png"));
//       }
//       setImages(pages);
//     } else {
//       alert("Please upload a valid PDF file.");
//     }
//   };

//   return (
//     <div className="p-4 max-w-xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4 text-center">Upload PDF to Convert to Images</h1>
      
//       <input
//         type="file"
//         accept="application/pdf"
//         onChange={handlePdfUpload}
//         className="mb-4 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//       />

//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
//         {images.map((image, index) => (
//           <div key={index} className="border rounded-lg overflow-hidden shadow-md">
//             <img
//               src={image}
//               alt={`Page ${index + 1}`}
//               className="w-full h-auto object-cover"
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PdfToImage;

// import React, { useState, useEffect, useRef } from 'react';
// import { PDFDocument } from 'pdf-lib';
// import { FaTrash, FaSearchPlus, FaRedo, FaClone, FaDownload } from 'react-icons/fa';
// import * as pdfjsLib from 'pdfjs-dist';
// import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';

// pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

// const PdfToImage = () => {
//   const [file, setFile] = useState(null);
//   const [splitPages, setSplitPages] = useState([]);
//   const [pdfInstances, setPdfInstances] = useState([]);
//   const [rotations, setRotations] = useState({});
//   const [showPopup, setShowPopup] = useState(false);
//   const [currentPage, setCurrentPage] = useState(null);
//   const [zoomLevel, setZoomLevel] = useState(1);
//   const [fileName, setFileName] = useState('');
//   const [selectedPages, setSelectedPages] = useState({});
//   const canvasRef = useRef();

//   const handleFileChange = (e) => {
//     const uploadedFile = e.target.files[0];
//     if (uploadedFile) {
//       setFile(uploadedFile);
//     }
//   };

//   useEffect(() => {
//     if (file) {
//       splitPdf();
//     }
//   }, [file]);

//   const splitPdf = async () => {
//     if (!file) return;
//     const arrayBuffer = await file.arrayBuffer();
//     const pdfDoc = await PDFDocument.load(arrayBuffer);
//     const totalPages = pdfDoc.getPageCount();
//     const newDocuments = [];
//     const pdfData = [];

//     for (let i = 0; i < totalPages; i++) {
//       const newPdfDoc = await PDFDocument.create();
//       const [copiedPage] = await newPdfDoc.copyPages(pdfDoc, [i]);
//       newPdfDoc.addPage(copiedPage);
//       const pdfBytes = await newPdfDoc.save();
//       const blob = new Blob([pdfBytes], { type: 'application/pdf' });
//       newDocuments.push(URL.createObjectURL(blob));
//       pdfData.push(pdfBytes);
//     }

//     setSplitPages(newDocuments);
//     setPdfInstances(pdfData);
//   };

//   const deletePage = (index) => {
//     const updatedPages = [...splitPages];
//     updatedPages[index] = null;
//     setSplitPages(updatedPages);
//     setSelectedPages((prev) => {
//       const newSelected = { ...prev };
//       delete newSelected[index];
//       return newSelected;
//     });
//   };

//   const rotatePage = (index) => {
//     setRotations((prev) => ({
//       ...prev,
//       [index]: (prev[index] || 0) + 90,
//     }));
//   };

//   const duplicatePage = (index) => {
//     const duplicatedPage = splitPages[index];
//     const duplicatedPdf = pdfInstances[index];
//     const newSplitPages = [...splitPages];
//     const newPdfInstances = [...pdfInstances];

//     newSplitPages.splice(index + 1, 0, duplicatedPage);
//     newPdfInstances.splice(index + 1, 0, duplicatedPdf);

//     setSplitPages(newSplitPages);
//     setPdfInstances(newPdfInstances);
//   };

//   const handlePageSelection = (index) => {
//     setSelectedPages((prev) => ({
//       ...prev,
//       [index]: !prev[index],
//     }));
//   };

//   const mergeAndDownload = async () => {
//     const mergedPdf = await PDFDocument.create();
    
//     for (let i = 0; i < pdfInstances.length; i++) {
//       if (selectedPages[i]) {
//         const pdf = await PDFDocument.load(pdfInstances[i]);
//         const [page] = await mergedPdf.copyPages(pdf, [0]);
//         mergedPdf.addPage(page);
//       }
//     }

//     const mergedPdfBytes = await mergedPdf.save();
//     const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement('a');
//     link.href = url;
//     link.download = `${fileName || 'merged'}.pdf`;
//     link.click();
//     setFileName('');
//     setSelectedPages({});
//     setFile('');
//   };

//   const renderPageToCanvas = async (index) => {
//     const pdfData = pdfInstances[index];
//     const pdfDoc = await pdfjsLib.getDocument({ data: pdfData }).promise;
//     const page = await pdfDoc.getPage(1); // 1-based index

//     const canvas = canvasRef.current;
//     const context = canvas.getContext('2d');

//     const viewport = page.getViewport({ scale: 1 });
//     canvas.width = viewport.width;
//     canvas.height = viewport.height;

//     await page.render({ canvasContext: context, viewport }).promise;
//   };

//   const downloadPageAsImage = async (index) => {
//     await renderPageToCanvas(index);
//     const canvas = canvasRef.current;
//     const link = document.createElement('a');
//     link.href = canvas.toDataURL('image/jpeg');
//     link.download = `page-${index + 1}.jpg`;
//     link.click();
//   };

//   const openZoomPopup = (index) => {
//     setCurrentPage(splitPages[index]);
//     setShowPopup(true);
//     setZoomLevel(1);
//   };

//   const closePopup = () => setShowPopup(false);

//   const zoomIn = () => setZoomLevel((prev) => prev * 1.2);
//   const zoomOut = () => setZoomLevel((prev) => prev / 1.2);

//   return (
//     <div className="min-h-screen flex flex-col items-center bg-gray-50 p-6">
//       <h1 className="text-3xl font-bold mb-8 text-gray-800">📄 Extract Page and Merge PDF Tool</h1>
//       <input type="file" accept="application/pdf" onChange={handleFileChange} />

//       <div className="mt-6 flex flex-wrap gap-4">
//         {splitPages.map((pageUrl, index) =>
//           pageUrl && (
//             <div key={index} className="relative border rounded p-2 bg-white shadow">
//               <iframe
//                 src={pageUrl}
//                 title={`Page ${index + 1}`}
//                 className="w-44 h-56 mt-6"
//                 style={{
//                   transform: `rotate(${rotations[index] || 0}deg)`,
//                   transformOrigin: 'center',
//                   transition: 'transform 0.3s ease',
//                 }}
//               ></iframe>

//               <div className="absolute top-2 right-2 flex gap-2">
//                 <FaDownload onClick={() => downloadPageAsImage(index)} className="text-green-500 cursor-pointer" size={15} />
//                 <FaSearchPlus onClick={() => openZoomPopup(index)} className="text-blue-500 cursor-pointer" size={15} />
//                 <FaRedo onClick={() => rotatePage(index)} className="text-yellow-500 cursor-pointer" size={15} />
//                 <FaClone onClick={() => duplicatePage(index)} className="text-green-500 cursor-pointer" size={15} />
//                 <FaTrash onClick={() => deletePage(index)} className="text-red-500 cursor-pointer" size={15} />
//               </div>

//               <span>Page {index + 1}</span>
//             </div>
//           )
//         )}
//       </div>

//       <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>

//       {showPopup && (
//         <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
//           <div className="relative bg-white w-[180mm] h-[180mm] shadow-lg rounded-lg overflow-hidden">
//             <button onClick={closePopup} className="absolute top-4 right-4 text-red-500 text-5xl">×</button>
//             <iframe src={currentPage} className="w-full h-full" style={{ transform: `scale(${zoomLevel})` }} />
//             <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
//               <button onClick={zoomOut} className="bg-gray-300 px-4 py-2 rounded">Zoom Out</button>
//               <button onClick={zoomIn} className="bg-gray-300 px-4 py-2 rounded">Zoom In</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PdfToImage;


import React, { useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import { FaDownload } from "react-icons/fa"; // Download icon
import { Back } from "./back";

// Create a Blob URL for the PDF worker
const pdfWorkerBlob = new Blob(
  [
    `
      importScripts('https://cdn.jsdelivr.net/npm/pdfjs-dist@2.16.105/build/pdf.worker.min.js');
    `
  ],
  { type: "application/javascript" }
);
pdfjsLib.GlobalWorkerOptions.workerSrc = URL.createObjectURL(pdfWorkerBlob);

const PdfToImage = () => {
  const [images, setImages] = useState([]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      const fileReader = new FileReader();
      fileReader.onload = async () => {
        const typedArray = new Uint8Array(fileReader.result);
        const pdf = await pdfjsLib.getDocument(typedArray).promise;

        const pdfImages = [];
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          const page = await pdf.getPage(pageNum);
          const scale = 2; // Adjust scale for image quality
          const viewport = page.getViewport({ scale });

          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          canvas.width = viewport.width;
          canvas.height = viewport.height;

          await page.render({ canvasContext: context, viewport }).promise;
          pdfImages.push(canvas.toDataURL("image/jpeg"));
        }

        setImages(pdfImages);
      };
      fileReader.readAsArrayBuffer(file);
    }
  };

  return (
    <div className="flex flex-col items-center p-8 bg-gray-100 min-h-screen mt-18">
      <Back/>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">PDF to Image Converter</h1>
      <p className="text-gray-600 mb-4">Upload a PDF file to convert each page into an image.</p>
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        className="mb-5 p-2 border border-gray-300 rounded-md cursor-pointer text-gray-700 hover:bg-gray-200"
      />
      <div className="flex flex-wrap justify-center gap-8 mt-6">
        {images.map((imgSrc, index) => (
          <div key={index} className="relative border shadow-lg rounded-lg overflow-hidden">
            <img
              src={imgSrc}
              alt={`Page ${index + 1}`}
              className="w-64 h-auto"
            />
            <a
              href={imgSrc}
              download={`page-${index + 1}.jpg`}
              className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
              title="Download Image"
            >
              <FaDownload className="text-gray-600" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PdfToImage;
