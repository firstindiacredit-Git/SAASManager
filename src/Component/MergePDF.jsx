// Merge.js
import React, { useState } from "react";
import { PDFDocument } from "pdf-lib";

const MergePDF = () => {
  const [files, setFiles] = useState([null]); // Initialize with one file input
  const [mergedPdf, setMergedPdf] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // State for error messages

  // Handle file change
  const handleFileChange = (index, event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      const newFiles = [...files];
      newFiles[index] = selectedFile;
      setFiles(newFiles);

      // Add a new input field if all previous fields are filled
      if (newFiles.every((file) => file !== null) && index === files.length - 1) {
        setFiles([...newFiles, null]);
      }
    } else {
      setError("Please upload a valid PDF file.");
    }
    setMergedPdf(null);
  };

  // Merge PDFs logic
  const handleMerge = async () => {
    const validFiles = files.filter((file) => file !== null);

    if (validFiles.length < 2) {
      setError("Please select at least two PDF files to merge.");
      return;
    }

    setLoading(true);
    setError(null); // Clear any previous errors

    try {
      const mergedPdfDoc = await PDFDocument.create();

      for (const file of validFiles) {
        const fileData = await file.arrayBuffer();
        const pdfDoc = await PDFDocument.load(fileData);
        const copiedPages = await mergedPdfDoc.copyPages(
          pdfDoc,
          pdfDoc.getPageIndices()
        );

        copiedPages.forEach((page) => mergedPdfDoc.addPage(page));
      }

      const mergedPdfBytes = await mergedPdfDoc.save();
      const blob = new Blob([mergedPdfBytes], { type: "application/pdf" });
      const downloadUrl = URL.createObjectURL(blob);

      setMergedPdf(downloadUrl);
    } catch (error) {
      console.error("Error merging PDFs:", error);
      setError("An error occurred while merging PDFs.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">Merge PDFs</h1>

        {/* File Inputs */}
        {files.map((file, index) => (
          <input
            key={index}
            type="file"
            accept="application/pdf"
            onChange={(e) => handleFileChange(index, e)}
            className="mb-4 block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
        ))}

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {/* Merge Button */}
        <button
          onClick={handleMerge}
          className={`w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded ${
            loading || files.filter((file) => file !== null).length < 2
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
          disabled={loading || files.filter((file) => file !== null).length < 2}
        >
          {loading ? "Merging..." : "Merge PDFs"}
        </button>

        {/* Download Merged PDF */}
        {mergedPdf && (
          <a
            href={mergedPdf}
            download="merged.pdf"
            className="block mt-4 text-center text-blue-500 hover:underline"
          >
            Download Merged PDF
          </a>
        )}
      </div>
    </div>
  );
};

export default MergePDF;
