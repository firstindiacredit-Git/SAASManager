import React, { useState, useEffect } from 'react';
import { PDFDocument } from 'pdf-lib';
import { FaTrash, FaSearchPlus, FaRedo, FaClone, FaDownload } from 'react-icons/fa';
import { Back } from './back';

const ExtractPages = () => {
  const [file, setFile] = useState(null);
  const [splitPages, setSplitPages] = useState([]);
  const [pdfInstances, setPdfInstances] = useState([]);
  const [rotations, setRotations] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [currentPage, setCurrentPage] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [fileName, setFileName] = useState('');
  const [selectedPages, setSelectedPages] = useState({}); // Store selected pages

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  useEffect(() => {
    if (file) {
      splitPdf();
    }
  }, [file]);

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

  const deletePage = (index) => {
    const updatedPages = [...splitPages];
    updatedPages[index] = null;
    setSplitPages(updatedPages);
    // Remove selection if the page is deleted
    setSelectedPages((prev) => {
      const newSelected = { ...prev };
      delete newSelected[index];
      return newSelected;
    });
  };

  const rotatePage = (index) => {
    setRotations((prev) => ({
      ...prev,
      [index]: (prev[index] || 0) + 90,
    }));
  };

  const rotateAllPages = (direction) => {
    setRotations((prev) => {
      const newRotations = { ...prev };
      splitPages.forEach((_, index) => {
        newRotations[index] = (newRotations[index] || 0) + (direction === 'left' ? -90 : 90);
      });
      return newRotations;
    });
  };

  const duplicatePage = (index) => {
    const duplicatedPage = splitPages[index];
    const duplicatedPdf = pdfInstances[index];
    const newSplitPages = [...splitPages];
    const newPdfInstances = [...pdfInstances];

    newSplitPages.splice(index + 1, 0, duplicatedPage);
    newPdfInstances.splice(index + 1, 0, duplicatedPdf);

    setSplitPages(newSplitPages);
    setPdfInstances(newPdfInstances);
  };

  const handlePageSelection = (index) => {
    setSelectedPages((prev) => ({
      ...prev,
      [index]: !prev[index], // Toggle selection
    }));
  };

  const mergeAndDownload = async () => {
    const mergedPdf = await PDFDocument.create();
    
    // Loop through selected pages
    for (let i = 0; i < pdfInstances.length; i++) {
      if (selectedPages[i]) { // Only include selected pages
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
    link.download = `${fileName}(pizeonfly)` || 'merged(pizeonfly).pdf';
    link.click();
    setFileName('');
    setSelectedPages({}); // Reset selections
    setFile('');
  };

  const openZoomPopup = (index) => {
    setCurrentPage(splitPages[index]);
    setShowPopup(true);
    setZoomLevel(1);
  };

  const closePopup = () => setShowPopup(false);

  const zoomIn = () => setZoomLevel((prev) => prev * 1.2);
  const zoomOut = () => setZoomLevel((prev) => prev / 1.2);

  return (
    <>
      <div className="min-h-screen flex flex-col items-center bg-gray-50 p-6">
        <Back/>
        <h1 className="text-3xl font-bold mb-8 text-gray-800">📄 Extract Page and Merge PDF Tool</h1>

        <div className="w-full max-w-xl bg-white shadow-lg rounded-lg p-6">
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="w-full mb-4 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <button
              onClick={() => rotateAllPages('left')}
              className="w-full md:w-auto flex-grow bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
            >
              Rotate Left
            </button>
            <button
              onClick={() => rotateAllPages('right')}
              className="w-full md:w-auto flex-grow bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
            >
              Rotate Right
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-4 items-center mb-6">
            <input
              type="text"
              placeholder="Enter file name (optional)"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              className="w-full md:flex-grow p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <button
              onClick={mergeAndDownload}
              className="w-full md:w-auto bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition"
            >
              Merge and Download
            </button>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-4">
          {splitPages.map((pageUrl, index) =>
            pageUrl && (
              <div
                key={index}
                className="relative border border-gray-300 rounded p-2 bg-white shadow hover:shadow-lg"
              >
                <iframe
                  src={pageUrl}
                  title={`Page ${index + 1}`}
                  className="w-44 h-56 mt-6"
                  style={{
                    transform: `rotate(${rotations[index] || 0}deg)`,
                    transformOrigin: 'center',
                    transition: 'transform 0.3s ease',
                  }}
                ></iframe>

                <div className="absolute top-2 right-2 flex gap-2">
                <input
                    type="checkbox"
                    checked={!!selectedPages[index]}
                    onChange={() => handlePageSelection(index)}
                    className="mr-2"
                  />
                   
                  <FaSearchPlus
                    onClick={() => openZoomPopup(index)}
                    className="text-blue-500 cursor-pointer"
                    size={15}
                  />
                  <FaRedo
                    onClick={() => rotatePage(index)}
                    className="text-yellow-500 cursor-pointer"
                    size={15}
                  />
                  <FaClone
                    onClick={() => duplicatePage(index)}
                    className="text-green-500 cursor-pointer"
                    size={15}
                  />
                  <FaTrash
                    onClick={() => deletePage(index)}
                    className="text-red-500 cursor-pointer"
                    size={15}
                  />
                   
                </div>

                <span> {index + 1}</span>
                
              </div>
            )
          )}
        </div>

        {showPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="relative bg-white w-[180mm] h-[180mm] shadow-lg rounded-lg overflow-hidden">
              <button onClick={closePopup} className="absolute top-4 right-4 text-red-500 text-5xl"
                style={{ zIndex: 10 }}
              >
                &times;
              </button>

              <div className="flex items-center justify-center h-full">
                <iframe
                  src={currentPage}
                  className="w-full h-full"
                  style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top left' }}
                />
              </div>

              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
                <button onClick={zoomOut} className="bg-gray-300 px-4 py-2 rounded">Zoom Out</button>
                <button onClick={zoomIn} className="bg-gray-300 px-4 py-2 rounded">Zoom In</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ExtractPages;
