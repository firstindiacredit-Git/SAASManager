// import React, { useState } from 'react';
// import { PDFDocument } from 'pdf-lib';

// const SplitPdf = () => {
//   const [file, setFile] = useState(null);
//   const [splitPages, setSplitPages] = useState([]);
//   const [pdfInstances, setPdfInstances] = useState([]);

//   // Handle file upload
//   const handleFileChange = (e) => {
//     const uploadedFile = e.target.files[0];
//     if (uploadedFile) {
//       setFile(uploadedFile);
//     }
//   };

//   // Split PDF file into separate pages
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
//     setPdfInstances(pdfData); // Save the byte data for merging later
//   };

//   // Delete page from the splitPages array
//   const deletePage = (index) => {
//     const updatedPages = splitPages.filter((_, i) => i !== index);
//     const updatedPdfInstances = pdfInstances.filter((_, i) => i !== index);
//     setSplitPages(updatedPages);
//     setPdfInstances(updatedPdfInstances);
//   };

//   // Merge remaining pages into a single PDF
//   const mergePdf = async () => {
//     const mergedPdf = await PDFDocument.create();

//     for (let pdfBytes of pdfInstances) {
//       const pdfDoc = await PDFDocument.load(pdfBytes);
//       const [copiedPage] = await mergedPdf.copyPages(pdfDoc, [0]);
//       mergedPdf.addPage(copiedPage);
//     }

//     const pdfBytes = await mergedPdf.save();
//     const blob = new Blob([pdfBytes], { type: 'application/pdf' });
//     const pdfUrl = URL.createObjectURL(blob);
    
//     // Trigger download
//     const link = document.createElement('a');
//     link.href = pdfUrl;
//     link.download = 'merged.pdf';
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
//       <h1 className="text-2xl font-bold mb-6">Split and Merge PDF Tool</h1>

//       <input
//         type="file"
//         accept="application/pdf"
//         onChange={handleFileChange}
//         className="mb-4"
//       />

//       <button
//         onClick={splitPdf}
//         className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//       >
//         Split PDF
//       </button>

//       <div className="mt-6 flex flex-wrap gap-4">
//         {splitPages.map((pageUrl, index) => (
//           <div key={index} className="relative border border-gray-300 rounded p-2 bg-white shadow hover:shadow-lg">
//             <iframe 
//               src={pageUrl}
//               title={`Page ${index + 1}`}
//               className="w-full h-64"
//             ></iframe>
//             <button
//               onClick={() => deletePage(index)}
//               className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded"
//             >
//               Delete Page
//             </button>
//             <p className="text-center mt-2">Page {index + 1}</p>
//           </div>
//         ))}
//       </div>

//       {splitPages.length > 0 && (
//         <button
//           onClick={mergePdf}
//           className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mt-6"
//         >
//           Merge Remaining Pages and Download PDF
//         </button>
//       )}
//     </div>
//   );
// };

// export default SplitPdf;

import React, { useState, useEffect } from 'react';
import { PDFDocument } from 'pdf-lib';
import { FaTrash, FaSearchPlus, FaRedo, FaClone, FaDownload, FaSyncAlt } from 'react-icons/fa';


const SplitPdf = () => {
  const [file, setFile] = useState(null);
  const [splitPages, setSplitPages] = useState([]);
  const [pdfInstances, setPdfInstances] = useState([]);
  const [rotations, setRotations] = useState({}); // Track rotation for each page
  const [showPopup, setShowPopup] = useState(false); // Control popup visibility
  const [currentPage, setCurrentPage] = useState(null); // Track current page to show in popup
  const [zoomLevel, setZoomLevel] = useState(1); // Track zoom level

  // Handle file upload
  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  // Automatically split the PDF when file is selected
  useEffect(() => {
    if (file) {
      splitPdf();
    }
  }, [file]);

  // Split PDF file into separate pages
  const splitPdf = async () => {
    if (!file) return;

    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    const totalPages = pdfDoc.getPageCount();
    const newDocuments = [];
    const pdfData = [];

    for (let i = 0; i < totalPages; i++) {
      const newPdfDoc = await PDFDocument.create();
      const [copiedPage] = await newPdfDoc.copyPages(pdfDoc, [i]);
      newPdfDoc.addPage(copiedPage);
      const pdfBytes = await newPdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      newDocuments.push(URL.createObjectURL(blob));
      pdfData.push(pdfBytes);
    }

    setSplitPages(newDocuments);
    setPdfInstances(pdfData);
  };

  // Delete page without changing the index numbers of other pages
  const deletePage = (index) => {
    const updatedPages = [...splitPages];
    updatedPages[index] = null; // Mark the page as deleted by setting it to null
    setSplitPages(updatedPages);
  };

  // Rotate functionality for individual pages
  const rotatePage = (index) => {
    setRotations((prev) => ({
      ...prev,
      [index]: (prev[index] || 0) + 90,
    }));
  };

  // Rotate all pages to the left or right
  const rotateAllPages = (direction) => {
    setRotations((prev) => {
      const newRotations = { ...prev };
      splitPages.forEach((_, index) => {
        newRotations[index] = (newRotations[index] || 0) + (direction === 'left' ? -90 : 90);
      });
      return newRotations;
    });
  };

  // Duplicate page and insert it right after the original page
  const duplicatePage = (index) => {
    const duplicatedPage = splitPages[index];
    const duplicatedPdf = pdfInstances[index];
    const newSplitPages = [...splitPages];
    const newPdfInstances = [...pdfInstances];

    // Insert duplicated page right after the original
    newSplitPages.splice(index + 1, 0, duplicatedPage);
    newPdfInstances.splice(index + 1, 0, duplicatedPdf);

    setSplitPages(newSplitPages);
    setPdfInstances(newPdfInstances);
  };

  // Merge non-deleted pages and download
  const mergeAndDownload = async () => {
    const mergedPdf = await PDFDocument.create();
    for (let i = 0; i < pdfInstances.length; i++) {
      if (splitPages[i] !== null) {
        const pdf = await PDFDocument.load(pdfInstances[i]);
        const [page] = await mergedPdf.copyPages(pdf, [0]);
        mergedPdf.addPage(page);
      }
    }
    const mergedPdfBytes = await mergedPdf.save();
    const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'merged.pdf';
    link.click();
  };

  // Open the popup with the selected page
  const openZoomPopup = (index) => {
    setCurrentPage(splitPages[index]);
    setShowPopup(true);
    setZoomLevel(1); // Reset zoom level to default when opening
  };

  // Close the popup
  const closePopup = () => {
    setShowPopup(false);
  };

  // Zoom in and out
  const zoomIn = () => {
    setZoomLevel((prev) => prev * 1.2);
  };

  const zoomOut = () => {
    setZoomLevel((prev) => prev / 1.2);
  };

  return (
    <>
    
    
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      
      <h1 className="text-2xl font-bold mb-6">Split and Merge PDF Tool</h1>

      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        className="mb-4"
      />

      <div className="flex gap-4 mb-4">
        <button
          onClick={() => rotateAllPages('left')}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Rotate Left
        </button>
        <button
          onClick={() => rotateAllPages('right')}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Rotate Right
        </button>
        <button
          onClick={mergeAndDownload}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Merge and Download
        </button>
      </div>

      <div className="mt-6 flex flex-wrap gap-4">
        {splitPages.map((pageUrl, index) => (
          pageUrl && (
            <div
              key={index}
              className="relative border border-gray-300 rounded p-2 bg-white shadow hover:shadow-lg"
            >
              <iframe
                src={pageUrl}
                title={`Page ${index + 1}`}
                className="w-full h-64"
                style={{
                  transform: `rotate(${rotations[index] || 0}deg)`,
                  transformOrigin: 'center',
                  transition: 'transform 0.3s ease',
                }}
              ></iframe>

              <div className="absolute top-2 right-2 flex gap-2">
                <FaSearchPlus
                  onClick={() => openZoomPopup(index)}
                  className="text-blue-500 cursor-pointer"
                  size={24}
                />
                <FaRedo
                  onClick={() => rotatePage(index)}
                  className="text-yellow-500 cursor-pointer"
                  size={24}
                />
                <FaClone
                  onClick={() => duplicatePage(index)}
                  className="text-green-500 cursor-pointer"
                  size={24}
                />
                <FaTrash
                  onClick={() => deletePage(index)}
                  className="text-red-500 cursor-pointer"
                  size={24}
                />
              </div>

              <p className="text-center mt-2">Page {index + 1}</p>
            </div>
          )
        ))}
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative bg-white w-[180mm] h-[180mm] shadow-lg rounded-lg overflow-hidden">
            <button
              onClick={closePopup}
              className="absolute top-4 right-4 text-red-500 text-4xl"
              style={{ zIndex: 10 }}
            >
              &times;
            </button>

            <div className="absolute bottom-2 right-2 flex gap-2">
              <button
                onClick={zoomIn}
                className="bg-blue-500 text-white px-2 py-1 rounded"
              >
                Zoom In
              </button>
              <button
                onClick={zoomOut}
                className="bg-blue-500 text-white px-2 py-1 rounded"
              >
                Zoom Out
              </button>
            </div>

            <iframe
              src={currentPage}
              title="Zoomed Page"
              className="w-full h-full"
              style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center' }}
            ></iframe>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default SplitPdf;