import React, { useState } from 'react';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import { Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

// Set the worker source for pdf.js
//GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js`;
pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';

function App() {
  const [pdfFile, setPdfFile] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [modifiedText, setModifiedText] = useState('');
  const [textContent, setTextContent] = useState([]);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        setPdfFile(URL.createObjectURL(file));
        const arrayBuffer = await file.arrayBuffer();
        const { text, positions } = await extractTextFromPdf(arrayBuffer);
        setModifiedText(text);
        setTextContent(positions);
      } catch (error) {
        console.error('Error reading PDF file:', error);
        alert('Failed to read the PDF file. Please try again.');
      }
    }
  };

  const extractTextFromPdf = async (arrayBuffer) => {
    try {
      const pdf = await getDocument({ data: arrayBuffer }).promise;
      const numPages = pdf.numPages;
      let fullText = '';
      let positions = [];

      for (let i = 1; i <= numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();

        const pageText = content.items.map((item) => item.str).join(' ');
        fullText += `\n\n${pageText}`;

        content.items.forEach((item) => {
          positions.push({
            text: item.str,
            x: item.transform[4],
            y: item.transform[5],
            fontSize: item.height,
          });
        });
      }

      return { text: fullText, positions };
    } catch (error) {
      console.error('Error extracting text from PDF:', error);
      alert('Failed to extract text from the PDF. Please check the file.');
      return { text: '', positions: [] };
    }
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const handleSavePdf = async () => {
    if (pdfFile && modifiedText) {
      try {
        const existingPdfBytes = await fetch(pdfFile).then((res) => res.arrayBuffer());
        const pdfDoc = await PDFDocument.load(existingPdfBytes);

        const pages = pdfDoc.getPages();
        const firstPage = pages[0];
        const { width, height } = firstPage.getSize();

        const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

        firstPage.drawRectangle({
          x: 0,
          y: 0,
          width: width,
          height: height,
          color: rgb(1, 1, 1),
        });

        const lines = modifiedText.split('\n');
        let cursorY = height - 40;

        lines.forEach((line) => {
          firstPage.drawText(line, {
            x: 50,
            y: cursorY,
            size: 12,
            font: helveticaFont,
            color: rgb(0, 0, 0),
            maxWidth: width - 100,
          });
          cursorY -= 16;
        });

        const modifiedPdfBytes = await pdfDoc.save();
        downloadModifiedPdf(modifiedPdfBytes, 'modified.pdf');
      } catch (error) {
        console.error('Error saving PDF:', error);
        alert('An error occurred while saving the PDF. Please try again.');
      }
    }
  };

  const downloadModifiedPdf = (pdfBytes, filename) => {
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">PDF Text Editor</h1>
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileUpload}
        className="mb-4"
      />
      {pdfFile && (
        <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
          {Array.from(new Array(numPages), (el, index) => (
            <Page key={`page_${index + 1}`} pageNumber={index + 1} />
          ))}
        </Document>
      )}
      <textarea
        value={modifiedText}
        onChange={(e) => setModifiedText(e.target.value)}
        rows={15}
        className="w-full max-w-4xl mb-4 p-2 border border-gray-300 rounded"
      />
      <button
        onClick={handleSavePdf}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Download Modified PDF
      </button>
    </div>
  );
}

export default App;
