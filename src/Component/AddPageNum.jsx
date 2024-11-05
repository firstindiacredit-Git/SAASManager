// src/App.jsx
import React, { useState } from "react";
import { PDFDocument, rgb } from "pdf-lib";
import { saveAs } from "file-saver";

const AddPageNum = () => {
  const [pdfFile, setPdfFile] = useState(null);

  const handleFileChange = (e) => {
    setPdfFile(e.target.files[0]);
  };

  const addPageNumbers = async () => {
    if (!pdfFile) return;

    const fileData = await pdfFile.arrayBuffer();
    const pdfDoc = await PDFDocument.load(fileData);

    // Embed the standard font (Helvetica)
    const font = await pdfDoc.embedStandardFont("Helvetica");
    const totalPages = pdfDoc.getPageCount();

    for (let i = 0; i < totalPages; i++) {
      const page = pdfDoc.getPage(i);
      const { width, height } = page.getSize();

      // Add page number text
      page.drawText(`Page ${i + 1}`, {
        x: width / 2 - 20,
        y: 20,
        size: 12,
        font: font,
        color: rgb(0, 0, 0),
      });
    }

    const modifiedPdf = await pdfDoc.save();
    const blob = new Blob([modifiedPdf], { type: "application/pdf" });
    saveAs(blob, "pdf_with_page_numbers.pdf");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-6">Add Page Numbers to PDF</h1>

      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        className="mb-4 p-2 border border-gray-300 rounded"
      />

      <button
        onClick={addPageNumbers}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300"
        disabled={!pdfFile}
      >
        Add Page Numbers and Download PDF
      </button>
    </div>
  );
};

export default AddPageNum;
