import React, { useState } from "react";
import { PDFDocument } from "pdf-lib"; // Import PDF-lib

const Compress = () => {
  const [file, setFile] = useState(null);
  const [compressedPdf, setCompressedPdf] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle PDF upload
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setCompressedPdf(null); // Reset compressed PDF on new upload
  };

  // Compress PDF logic
  const handleCompress = async () => {
    if (!file) {
      alert("Please upload a PDF file.");
      return;
    }

    setLoading(true);

    try {
      const fileData = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(fileData);

      // Optional: Remove unused parts to reduce size
      pdfDoc.setTitle("Compressed PDF");
      pdfDoc.setCreator("");

      const compressedPdfBytes = await pdfDoc.save();

      // Create a Blob and store the compressed file
      const blob = new Blob([compressedPdfBytes], { type: "application/pdf" });
      const downloadUrl = URL.createObjectURL(blob);

      setCompressedPdf(downloadUrl);
    } catch (error) {
      console.error("Error compressing PDF:", error);
      alert("Failed to compress PDF.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">PDF Compressor</h1>

        {/* File Upload */}
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="mb-4 block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
        />

        {/* Compress Button */}
        <button
          onClick={handleCompress}
          className={`w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Compressing..." : "Compress PDF"}
        </button>

        {/* Download Button */}
        {compressedPdf && (
          <a
            href={compressedPdf}
            download="compressed.pdf"
            className="block mt-4 text-center text-blue-500 hover:underline"
          >
            Download Compressed PDF
          </a>
        )}
      </div>
    </div>
  );
};

export default Compress;

