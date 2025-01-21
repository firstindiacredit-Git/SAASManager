import React, { useState, useEffect } from 'react';
import { PDFDocument } from 'pdf-lib';
import { FaTrash, FaSearchPlus, FaRedo, FaClone, FaDownload } from 'react-icons/fa';
import { Back } from './back';

const SplitPdf = () => {
  const [file, setFile] = useState(null);
  const [splitPages, setSplitPages] = useState([]);
  const [pdfInstances, setPdfInstances] = useState([]);
  const [rotations, setRotations] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [currentPage, setCurrentPage] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [fileName, setFileName] = useState('');
  const [range, setRange] = useState({ start: '', end: '' });
  const [totalPages, setTotalPages] = useState(0);
  const [pageNumbers, setPageNumbers] = useState('');

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      const originalName = uploadedFile.name.replace(/\.[^/.]+$/, ''); // Remove file extension
      setFileName(originalName);
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
    const numPages = pdfDoc.getPageCount();
    setTotalPages(numPages);
    const newDocuments = [];
    const pdfData = [];

    for (let i = 0; i < numPages; i++) {
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

  const handleRangeChange = (e) => {
    const { name, value } = e.target;
    setRange((prev) => ({ ...prev, [name]: value }));
  };

  const validatePageRange = (e) => {
    const { name, value } = e.target;
    const numValue = parseInt(value);
    
    if (numValue < 1) return;
    if (numValue > totalPages) return;
    
    if (name === 'start') {
      if (range.end && numValue > parseInt(range.end)) return;
    } else if (name === 'end') {
      if (range.start && numValue < parseInt(range.start)) return;
    }
    
    setRange(prev => ({ ...prev, [name]: value }));
  };

  const validatePageNumbers = (input) => {
    if (!input) return [];
    
    try {
      return input.split(',')
        .map(num => num.trim())
        .map(num => parseInt(num))
        .filter(num => !isNaN(num) && num > 0 && num <= totalPages);
    } catch (error) {
      return [];
    }
  };

  const mergeAndDownload = async () => {
    const mergedPdf = await PDFDocument.create();
    const [start, end] = pageNumbers.split(',').map(num => parseInt(num));
    
    if (!start || !end || start > end) {
      // If invalid range, merge all pages
      for (let i = 0; i < pdfInstances.length; i++) {
        if (splitPages[i] !== null) {
          const pdf = await PDFDocument.load(pdfInstances[i]);
          const [page] = await mergedPdf.copyPages(pdf, [0]);
          mergedPdf.addPage(page);
        }
      }
    } else {
      // Merge pages in range
      for (let i = start - 1; i < end; i++) {
        if (splitPages[i] !== null) {
          const pdf = await PDFDocument.load(pdfInstances[i]);
          const [page] = await mergedPdf.copyPages(pdf, [0]);
          mergedPdf.addPage(page);
        }
      }
    }

    const mergedPdfBytes = await mergedPdf.save();
    const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);

    // Add range to filename
    const rangeText = start && end ? `_pages_${start}-${end}` : '';
    const downloadFileName = `${fileName}${rangeText}(pizeonfly).pdf`;

    const link = document.createElement('a');
    link.href = url;
    link.download = downloadFileName;
    link.click();

    setFileName('');
    setPageNumbers('');
    setFile(null);
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
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.12)] 
          rounded-xl transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.16)]"
        >
          <div className="p-4 border-b border-gray-100">
            <Back/>
          </div>

          <div className="p-6">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Split PDF</h1>
              <p className="mt-2 text-sm text-gray-600">Split, merge and organize your PDF pages</p>
            </div>

            {!file ? (
              <div
                className="relative border-2 border-dashed rounded-lg p-12 text-center 
                  border-gray-300 hover:border-gray-400"
              >
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  className="hidden"
                  id="fileInput"
                />
                <label 
                  htmlFor="fileInput" 
                  className="cursor-pointer"
                >
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <div className="mt-4">
                    <span className="mt-2 block text-sm font-medium text-gray-900">
                      Choose PDF file or
                      <span className="text-blue-500 hover:text-blue-600 ml-1">
                        browse
                      </span>
                    </span>
                    <p className="mt-1 text-xs text-gray-500">
                      PDF files only
                    </p>
                  </div>
                </label>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex justify-between items-center mb-6 border-b pb-4">
                  <div className="flex items-center">
                    <span className="text-lg font-semibold text-gray-700">{file.name}</span>
                    <button 
                      onClick={() => {
                        setFile(null);
                        setSplitPages([]);
                        setPdfInstances([]);
                      }}
                      className="ml-4 text-red-500 hover:text-red-600"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => rotateAllPages('left')}
                      className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                    >
                      Rotate Left
                    </button>
                    <button
                      onClick={() => rotateAllPages('right')}
                      className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                    >
                      Rotate Right
                    </button>
                  </div>
                </div>

                <div className="flex gap-6 mb-6">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Page Selection (Total: {totalPages} pages)
                    </label>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-4">
                        <div className="flex-1">
                          <label className="block text-xs text-gray-500 mb-1">Start Page</label>
                          <input
                            type="number"
                            value={pageNumbers.split(',')[0] || ''}
                            onChange={(e) => {
                              const start = e.target.value;
                              const end = pageNumbers.split(',')[1] || '';
                              if (parseInt(start) > 0 && parseInt(start) <= totalPages) {
                                setPageNumbers(`${start}${end ? ',' + end : ''}`);
                              }
                            }}
                            placeholder="1"
                            min="1"
                            max={totalPages}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                          />
                        </div>
                        <span className="text-gray-500 mt-6">to</span>
                        <div className="flex-1">
                          <label className="block text-xs text-gray-500 mb-1">End Page</label>
                          <input
                            type="number"
                            value={pageNumbers.split(',')[1] || ''}
                            onChange={(e) => {
                              const start = pageNumbers.split(',')[0] || '';
                              const end = e.target.value;
                              if (parseInt(end) > 0 && parseInt(end) <= totalPages) {
                                setPageNumbers(`${start ? start + ',' : ''}${end}`);
                              }
                            }}
                            placeholder={totalPages.toString()}
                            min="1"
                            max={totalPages}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                          />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setPageNumbers(`1,${totalPages}`)}
                          className="text-blue-500 hover:text-blue-600 text-sm"
                        >
                          All Pages
                        </button>
                        <button
                          onClick={() => {
                            const evenPages = Array.from({length: Math.floor(totalPages/2)}, (_, i) => (i + 1) * 2);
                            setPageNumbers(`${evenPages[0]},${evenPages[evenPages.length-1]}`);
                          }}
                          className="text-blue-500 hover:text-blue-600 text-sm"
                        >
                          Even Pages
                        </button>
                        <button
                          onClick={() => {
                            const oddPages = Array.from({length: Math.ceil(totalPages/2)}, (_, i) => i * 2 + 1);
                            setPageNumbers(`${oddPages[0]},${oddPages[oddPages.length-1]}`);
                          }}
                          className="text-blue-500 hover:text-blue-600 text-sm"
                        >
                          Odd Pages
                        </button>
                      </div>
                      {validatePageNumbers(pageNumbers).length > 0 && (
                        <p className="text-sm text-gray-500">
                          Selected pages: {pageNumbers.split(',')[0]} to {pageNumbers.split(',')[1]}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex-1 mt-5">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Output Filename</label>
                    <input
                      type="text"
                      placeholder="Enter file name"
                      value={fileName}
                      onChange={(e) => setFileName(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex-1 mt-12">
                  <button
                    onClick={mergeAndDownload}
                    className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <FaDownload size={16} />
                      Download PDF
                    </span>
                  </button>
                </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {splitPages.map((pageUrl, index) =>
                    pageUrl && (
                      <div
                        key={index}
                        className="relative bg-gray-50 rounded-lg p-2 hover:shadow-lg transition-all duration-300 group"
                      >
                        <div className="aspect-[2/3] relative overflow-hidden">
                          <iframe
                            src={pageUrl}
                            title={`Page ${index + 1}`}
                            className="w-full h-full rounded-md"
                            style={{
                              transform: `rotate(${rotations[index] || 0}deg)`,
                              transformOrigin: 'center',
                              transition: 'transform 0.3s ease',
                              pointerEvents: 'none',
                            }}
                            frameBorder="0"
                            scrolling="no"
                          />
                          {rotations[index] !== 0 && (
                            <div className="absolute inset-0 -z-10 bg-gray-100 rounded-md" />
                          )}
                          
                          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent 
                            transition-all duration-300 rounded-md opacity-0 group-hover:opacity-100">
                            <div className="absolute top-2 left-1/2 transform -translate-x-1/2
                              flex gap-2 bg-white/90 rounded-lg shadow-lg p-1.5 transition-all duration-300
                              scale-90 group-hover:scale-100 opacity-0 group-hover:opacity-100">
                              <button 
                                onClick={() => openZoomPopup(index)} 
                                className="p-1.5 hover:bg-blue-50 rounded-md transition-colors"
                                title="Zoom"
                              >
                                <FaSearchPlus size={14} className="text-blue-500" />
                              </button>
                              <button 
                                onClick={() => rotatePage(index)} 
                                className="p-1.5 hover:bg-yellow-50 rounded-md transition-colors"
                                title="Rotate"
                              >
                                <FaRedo size={14} className="text-yellow-500" />
                              </button>
                              <button 
                                onClick={() => duplicatePage(index)} 
                                className="p-1.5 hover:bg-green-50 rounded-md transition-colors"
                                title="Duplicate"
                              >
                                <FaClone size={14} className="text-green-500" />
                              </button>
                              <button 
                                onClick={() => deletePage(index)} 
                                className="p-1.5 hover:bg-red-50 rounded-md transition-colors"
                                title="Delete"
                              >
                                <FaTrash size={14} className="text-red-500" />
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-2 px-1">
                          <span className="text-sm font-medium text-gray-600">Page {index + 1}</span>
                          <span className="text-xs text-gray-400">{(rotations[index] || 0)}°</span>
                        </div>
                      </div>
                    )
                  )}
                </div>

                
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Zoom Popup */}
      {showPopup && currentPage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Page Preview</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={zoomOut}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Zoom Out"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <span className="text-sm text-gray-600">{Math.round(zoomLevel * 100)}%</span>
                  <button
                    onClick={zoomIn}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Zoom In"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
                <button
                  onClick={closePopup}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Close"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="flex-1 p-4">
              <div className="w-full h-full flex items-center justify-center">
                <div 
                  className="relative transition-transform duration-200 ease-in-out"
                  style={{ transform: `scale(${zoomLevel})` }}
                >
                  <iframe
                    src={currentPage}
                    className="w-full h-full border-0 rounded-lg shadow-lg"
                    style={{ 
                      width: '600px',
                      height: '800px',
                    }}
                    title="PDF Preview"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SplitPdf; 
