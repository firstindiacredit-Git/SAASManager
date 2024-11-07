import React, { useState, useRef, useEffect } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import { PDFDocument } from 'pdf-lib';
import 'pdfjs-dist/web/pdf_viewer.css';

pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';

const PdfCropper = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [cropData, setCropData] = useState({ startX: 0, startY: 0, endX: 0, endY: 0 });
  const [isCropping, setIsCropping] = useState(false);
  const canvasRef = useRef(null);
  const offscreenCanvasRef = useRef(null);
  const [pdfWidth, setPdfWidth] = useState(0);
  const [pdfHeight, setPdfHeight] = useState(0);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      const reader = new FileReader();
      reader.onload = async () => {
        const pdfData = new Uint8Array(reader.result);
        const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
        setPdfFile(pdf);
        renderPageToOffscreenCanvas(pdf, 1);
      };
      reader.readAsArrayBuffer(file);
    } else {
      alert('Please upload a valid PDF file.');
    }
  };

  const renderPageToOffscreenCanvas = async (pdf, pageNum) => {
    const page = await pdf.getPage(pageNum);
    const viewport = page.getViewport({ scale: 1.5 });

    // Set the size of the main canvas
    const canvas = canvasRef.current;
    canvas.width = viewport.width;
    canvas.height = viewport.height;

    const offscreenCanvas = offscreenCanvasRef.current;
    offscreenCanvas.width = viewport.width;
    offscreenCanvas.height = viewport.height;

    // Store the dimensions for the crop logic
    setPdfWidth(viewport.width);
    setPdfHeight(viewport.height);

    const offscreenContext = offscreenCanvas.getContext('2d');
    const renderContext = {
      canvasContext: offscreenContext,
      viewport: viewport,
    };

    await page.render(renderContext).promise;
    updateMainCanvas();
  };

  const updateMainCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const offscreenCanvas = offscreenCanvasRef.current;

    // Clear the canvas and redraw the offscreen content
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(offscreenCanvas, 0, 0);
    
    // Draw the crop rectangle if cropping is active
    if (isCropping) drawCropRect(context);
  };

  const drawCropRect = (context) => {
    const { startX, startY, endX, endY } = cropData;
    context.strokeStyle = 'red';
    context.lineWidth = 2;
    context.setLineDash([5, 5]);
    context.strokeRect(startX, startY, endX - startX, endY - startY);
  };

  const handleMouseDown = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    setCropData({
      startX: e.clientX - rect.left,
      startY: e.clientY - rect.top,
      endX: 0,
      endY: 0,
    });
    setIsCropping(true);
  };

  const handleMouseMove = (e) => {
    if (isCropping) {
      const rect = canvasRef.current.getBoundingClientRect();
      setCropData((prevData) => ({
        ...prevData,
        endX: e.clientX - rect.left,
        endY: e.clientY - rect.top,
      }));
      updateMainCanvas(); // Refresh with crop rectangle overlay
    }
  };

  const handleMouseUp = () => {
    setIsCropping(false);
  };

  const handleCrop = async () => {
    if (!pdfFile) return;
    const { startX, startY, endX, endY } = cropData;
    const width = Math.abs(endX - startX);
    const height = Math.abs(endY - startY);

    const pdfDoc = await PDFDocument.create();
    const copiedPage = pdfDoc.addPage([width, height]);

    // Get the cropped image from the offscreen canvas
    const originalCanvas = offscreenCanvasRef.current;
    const croppedCanvas = document.createElement('canvas');
    croppedCanvas.width = width;
    croppedCanvas.height = height;
    const croppedContext = croppedCanvas.getContext('2d');

    croppedContext.drawImage(
      originalCanvas,
      startX, startY, width, height,
      0, 0, width, height
    );

    try {
      // Embed the cropped image into the PDF
      const croppedImage = croppedCanvas.toDataURL("image/png");
      const image = await pdfDoc.embedPng(croppedImage);

      copiedPage.drawImage(image, {
        x: 0,
        y: 0,
        width: width,
        height: height,
      });

      // Save the PDF and download
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "cropped.pdf";
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error embedding PNG image into PDF:", error);
      alert("Failed to crop and embed the image. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-center text-black mb-4">PDF Cropper</h1>
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-full">
        
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="mb-4 p-2 border border-gray-300 rounded-md w-full"
        />
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          className="border border-black mb-4 cursor-crosshair"
        />
        <button
          onClick={handleCrop}
          disabled={!cropData.endX || !cropData.endY}
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition"
        >
          Crop Selected Area
        </button>
        <p className="text-center text-gray-600 mt-2">
          Draw a rectangle on the canvas to crop the selected area.
        </p>
      </div>

      {/* Offscreen canvas for storing PDF content */}
      <canvas ref={offscreenCanvasRef} style={{ display: 'none' }} />
    </div>
  );
};

export default PdfCropper;
