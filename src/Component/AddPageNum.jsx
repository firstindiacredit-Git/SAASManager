import React, { useState } from "react";
import { PDFDocument, rgb } from "pdf-lib";
import { saveAs } from "file-saver";
import { Back } from "./back";

const AddPageNum = () => {
  const [pdfFile, setPdfFile] = useState(null);

  const handleFileChange = (e) => {
    setPdfFile(e.target.files[0]);
  };

  const addPageNumbers = async () => {
    if (!pdfFile) return;

    const fileData = await pdfFile.arrayBuffer();
    const pdfDoc = await PDFDocument.load(fileData);
    const font = await pdfDoc.embedStandardFont("Helvetica");
    const totalPages = pdfDoc.getPageCount();

    for (let i = 0; i < totalPages; i++) {
      const page = pdfDoc.getPage(i);
      const { width, height } = page.getSize();

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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <Back />
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-700">
          Add Page Numbers to PDF
        </h1>
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={addPageNumbers}
          className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed"
          disabled={!pdfFile}
        >
          Add Page Numbers and Download PDF
        </button>
      </div>
    </div>
  );
};

export default AddPageNum;
