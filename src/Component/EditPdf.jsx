import React, { useState, useEffect } from "react";
import { PDFDocument, rgb } from "pdf-lib"; // For PDF editing
import { Document, Page, pdfjs } from "react-pdf"; // For rendering PDFs
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

// Dynamically load the PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

function EditPdf() {
  const [pdfFile, setPdfFile] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pdfText, setPdfText] = useState("");
  const [modifiedText, setModifiedText] = useState("");
  const [modifiedPdfUrl, setModifiedPdfUrl] = useState(null);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileBytes = await file.arrayBuffer();
    setPdfFile(URL.createObjectURL(file));

    const loadingTask = pdfjs.getDocument({ data: fileBytes });
    const pdf = await loadingTask.promise;
    const text = await extractTextFromPdf(pdf);
    setPdfText(text);
    setModifiedText(text);
  };

  const extractTextFromPdf = async (pdf) => {
    const textPromises = [];
    for (let i = 0; i < pdf.numPages; i++) {
      const page = await pdf.getPage(i + 1);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map((item) => item.str).join(" ");
      textPromises.push(pageText);
    }
    return textPromises.join("\n\n");
  };

  const handleTextChange = (e) => setModifiedText(e.target.value);

  const modifyPdf = async () => {
    const fileBytes = await (await fetch(pdfFile)).arrayBuffer();
    const pdfDoc = await PDFDocument.load(fileBytes);
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    firstPage.drawText(modifiedText, {
      x: 50,
      y: 700,
      size: 12,
      color: rgb(0, 0, 0),
    });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    setModifiedPdfUrl(url);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">PDF Text Extractor & Editor</h1>

      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileUpload}
        className="mb-4"
      />

      {pdfFile && (
        <div className="mb-4">
          <Document
            file={pdfFile}
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
            className="border"
          >
            {Array.from(new Array(numPages), (el, index) => (
              <Page key={`page_${index + 1}`} pageNumber={index + 1} />
            ))}
          </Document>
        </div>
      )}

      {pdfText && (
        <textarea
          value={modifiedText}
          onChange={handleTextChange}
          rows={10}
          className="border rounded mb-4 p-2 w-1/2"
        />
      )}

      <button
        onClick={modifyPdf}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Download Modified PDF
      </button>

      {modifiedPdfUrl && (
        <a
          href={modifiedPdfUrl}
          download="modified.pdf"
          className="mt-4 text-blue-700 underline"
        >
          Download Modified PDF
        </a>
      )}
    </div>
  );
}

export default EditPdf;
