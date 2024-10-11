import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';

const SplitPdf = () => {
  const [file, setFile] = useState(null);
  const [splitPages, setSplitPages] = useState([]);
  const [pdfInstances, setPdfInstances] = useState([]);

  // Handle file upload
  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

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
    setPdfInstances(pdfData); // Save the byte data for merging later
  };

  // Delete page from the splitPages array
  const deletePage = (index) => {
    const updatedPages = splitPages.filter((_, i) => i !== index);
    const updatedPdfInstances = pdfInstances.filter((_, i) => i !== index);
    setSplitPages(updatedPages);
    setPdfInstances(updatedPdfInstances);
  };

  // Merge remaining pages into a single PDF
  const mergePdf = async () => {
    const mergedPdf = await PDFDocument.create();

    for (let pdfBytes of pdfInstances) {
      const pdfDoc = await PDFDocument.load(pdfBytes);
      const [copiedPage] = await mergedPdf.copyPages(pdfDoc, [0]);
      mergedPdf.addPage(copiedPage);
    }

    const pdfBytes = await mergedPdf.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const pdfUrl = URL.createObjectURL(blob);
    
    // Trigger download
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'merged.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">Split and Merge PDF Tool</h1>

      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        className="mb-4"
      />

      <button
        onClick={splitPdf}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Split PDF
      </button>

      <div className="mt-6 flex flex-wrap gap-4">
        {splitPages.map((pageUrl, index) => (
          <div key={index} className="relative border border-gray-300 rounded p-2 bg-white shadow hover:shadow-lg">
            <iframe 
              src={pageUrl}
              title={`Page ${index + 1}`}
              className="w-full h-64"
            ></iframe>
            <button
              onClick={() => deletePage(index)}
              className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded"
            >
              Delete Page
            </button>
            <p className="text-center mt-2">Page {index + 1}</p>
          </div>
        ))}
      </div>

      {splitPages.length > 0 && (
        <button
          onClick={mergePdf}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mt-6"
        >
          Merge Remaining Pages and Download PDF
        </button>
      )}
    </div>
  );
};

export default SplitPdf;
