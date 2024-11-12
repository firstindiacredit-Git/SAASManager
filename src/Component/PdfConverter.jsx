// import React, { useState } from "react";
// import { PDFDocument, rgb } from "pdf-lib"; // Import PDF-lib
// import mammoth from "mammoth"; // Import Mammoth for Word to text conversion

// const PdfConverter = () => {
//   const [wordFile, setWordFile] = useState(null); // Word file state
//   const [images, setImages] = useState([]); // Image files state
//   const [loading, setLoading] = useState(false); // Loading state
//   const [error, setError] = useState(null); // Error state

//   // Handle Word file change
//   const handleWordFileChange = (e) => {
//     setWordFile(e.target.files[0]);
//   };

//   // Handle multiple image files change
//   const handleImagesChange = (e) => {
//     const selectedImages = Array.from(e.target.files);
//     setImages(selectedImages);
//   };

//   // Function to handle PDF generation
//   const generatePDF = async () => {
//     if (!wordFile) {
//       setError("Please upload a Word file.");
//       return;
//     }

//     setLoading(true);
//     setError(null); // Clear previous errors

//     try {
//       const pdfDoc = await PDFDocument.create();
//       const page = pdfDoc.addPage([600, 800]); // Create a page with custom dimensions

//       // Convert Word file to text using Mammoth
//       const arrayBuffer = await wordFile.arrayBuffer();
//       const { value: wordText } = await mammoth.extractRawText({ arrayBuffer });

//       const fontSize = 12;
//       const { height } = page.getSize();
//       let textYPosition = height - 100;

//       // Draw Word text on PDF
//       page.drawText(wordText, {
//         x: 50,
//         y: textYPosition,
//         size: fontSize,
//         color: rgb(0, 0, 0), // Black text color
//       });

//       // Add images to the PDF
//       for (const imgFile of images) {
//         const imageBytes = await imgFile.arrayBuffer();
//         let image;

//         // Check if the image is a PNG or JPEG
//         if (imgFile.type === "image/png") {
//           image = await pdfDoc.embedPng(imageBytes);
//         } else if (imgFile.type === "image/jpeg") {
//           image = await pdfDoc.embedJpg(imageBytes);
//         }

//         // Draw image on a new page
//         const imagePage = pdfDoc.addPage([600, 800]);
//         const { width, height: imgHeight } = image.scale(0.5); // Scale image size

//         imagePage.drawImage(image, {
//           x: 50,
//           y: imagePage.getHeight() - imgHeight - 50,
//           width: width,
//           height: imgHeight,
//         });
//       }

//       // Save the PDF document
//       const pdfBytes = await pdfDoc.save();
//       const blob = new Blob([pdfBytes], { type: "application/pdf" });
//       const url = URL.createObjectURL(blob);

//       // Trigger download
//       const link = document.createElement("a");
//       link.href = url;
//       link.download = "converted.pdf";
//       link.click();
//     } catch (error) {
//       console.error("Error generating PDF:", error);
//       setError("Failed to generate PDF. Please try again.");
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//       <div className="bg-white shadow-md rounded-lg p-6 max-w-lg w-full">
//         <h1 className="text-2xl font-bold mb-6 text-center">Word + Image to PDF Converter</h1>

//         {/* Word File Upload */}
//         <input
//           type="file"
//           accept=".docx"
//           onChange={handleWordFileChange}
//           className="mb-4 block w-full text-sm text-gray-500
//             file:mr-4 file:py-2 file:px-4
//             file:rounded-full file:border-0
//             file:text-sm file:font-semibold
//             file:bg-blue-50 file:text-blue-700
//             hover:file:bg-blue-100"
//         />

//         {/* Images Upload */}
//         <input
//           type="file"
//           accept="image/png, image/jpeg"
//           multiple
//           onChange={handleImagesChange}
//           className="mb-4 block w-full text-sm text-gray-500
//             file:mr-4 file:py-2 file:px-4
//             file:rounded-full file:border-0
//             file:text-sm file:font-semibold
//             file:bg-blue-50 file:text-blue-700
//             hover:file:bg-blue-100"
//         />

//         {/* Error Message */}
//         {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

//         {/* Convert Button */}
//         <button
//           onClick={generatePDF}
//           className={`w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded ${
//             loading ? "opacity-50 cursor-not-allowed" : ""
//           }`}
//           disabled={loading}
//         >
//           {loading ? "Generating PDF..." : "Convert to PDF"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PdfConverter;


// PdfConverter.js
// import React, { useState } from "react";
// import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
// import mammoth from "mammoth"; // For extracting Word text

// const PdfConverter = () => {
//   const [wordFile, setWordFile] = useState(null);
//   const [imageFiles, setImageFiles] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Handle Word file upload
//   const handleWordFileChange = (e) => {
//     setWordFile(e.target.files[0]);
//   };

//   // Handle image file upload
//   const handleImageFilesChange = (e) => {
//     setImageFiles(Array.from(e.target.files));
//   };

//   // Generate PDF with Word text and images
//   const generatePDF = async () => {
//     if (!wordFile && imageFiles.length === 0) {
//       setError("Please upload a Word file or images to convert.");
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     try {
//       const pdfDoc = await PDFDocument.create();
//       const font = await pdfDoc.embedFont(StandardFonts.Helvetica); // Embed standard font

//       // Handle Word file content
//       if (wordFile) {
//         const wordData = await wordFile.arrayBuffer();
//         const { value: extractedText } = await mammoth.extractRawText({
//           arrayBuffer: wordData,
//         });

//         // Add text content across multiple pages
//         const lines = extractedText.split("\n");
//         let page = pdfDoc.addPage([595, 842]); // A4 size in points
//         let yOffset = 800; // Start drawing text near the top

//         for (const line of lines) {
//           if (yOffset < 50) {
//             // Create a new page if content overflows
//             page = pdfDoc.addPage([595, 842]);
//             yOffset = 800;
//           }
//           page.drawText(line, {
//             x: 50,
//             y: yOffset,
//             size: 12,
//             font,
//             color: rgb(0, 0, 0),
//           });
//           yOffset -= 20; // Move down for the next line
//         }
//       }

//       // Handle image files
//       for (const imageFile of imageFiles) {
//         const imageData = await imageFile.arrayBuffer();
//         const image = await pdfDoc.embedJpg(imageData); // Assuming JPG
//         const { width, height } = image.scale(0.5);

//         const imagePage = pdfDoc.addPage([width, height]);
//         imagePage.drawImage(image, {
//           x: 0,
//           y: 0,
//           width,
//           height,
//         });
//       }

//       // Save and download the PDF
//       const pdfBytes = await pdfDoc.save();
//       const blob = new Blob([pdfBytes], { type: "application/pdf" });
//       const url = URL.createObjectURL(blob);

//       const link = document.createElement("a");
//       link.href = url;
//       link.download = "converted.pdf";
//       link.click();
//     } catch (error) {
//       console.error("Error generating PDF:", error);
//       setError("Failed to generate PDF. Please try again.");
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//       <div className="bg-white shadow-md rounded-lg p-6 max-w-lg w-full">
//         <h1 className="text-2xl font-bold mb-6 text-center">PDF Converter</h1>

//         {/* Word File Upload */}
//         <div className="mb-4">
//           <label className="block text-gray-700 font-medium mb-2">Upload Word File:</label>
//           <input
//             type="file"
//             accept=".docx"
//             onChange={handleWordFileChange}
//             className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//           />
//         </div>

//         {/* Image Files Upload */}
//         <div className="mb-4">
//           <label className="block text-gray-700 font-medium mb-2">Upload Images:</label>
//           <input
//             type="file"
//             accept="image/*"
//             multiple
//             onChange={handleImageFilesChange}
//             className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//           />
//         </div>

//         {/* Error Message */}
//         {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

//         {/* Convert Button */}
//         <button
//           onClick={generatePDF}
//           className={`w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded ${
//             loading ? "opacity-50 cursor-not-allowed" : ""
//           }`}
//           disabled={loading}
//         >
//           {loading ? "Generating PDF..." : "Convert to PDF"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PdfConverter;


// import React, { useState } from "react";
// import { PDFDocument, rgb, StandardFonts } from "pdf-lib"; 
// import mammoth from "mammoth"; // To extract text from Word files

// const PdfConverter = () => {
//   const [wordFile, setWordFile] = useState(null); 
//   const [loading, setLoading] = useState(false); 
//   const [error, setError] = useState(null);

//   // Handle Word file upload
//   const handleWordFileChange = (e) => {
//     setWordFile(e.target.files[0]);
//     setError(null); // Clear any existing errors
//   };

//   // Generate PDF from the Word file
//   const generatePDF = async () => {
//     if (!wordFile) {
//       setError("Please upload a Word file to convert.");
//       return;
//     }

//     setLoading(true);

//     try {
//       const wordData = await wordFile.arrayBuffer(); // Read file as buffer
//       const { value: extractedText } = await mammoth.extractRawText({ 
//         arrayBuffer: wordData 
//       });

//       const pdfDoc = await PDFDocument.create();
//       const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

//       const lines = extractedText.split("\n");
//       let page = pdfDoc.addPage([595, 842]); // A4 size
//       let yOffset = 800;

//       // Draw text line-by-line, adding new pages as needed
//       for (const line of lines) {
//         if (yOffset < 50) {
//           page = pdfDoc.addPage([595, 842]);
//           yOffset = 800;
//         }
//         page.drawText(line, {
//           x: 50,
//           y: yOffset,
//           size: 12,
//           font,
//           color: rgb(0, 0, 0),
//         });
//         yOffset -= 20;
//       }

//       // Save and download the generated PDF
//       const pdfBytes = await pdfDoc.save();
//       const blob = new Blob([pdfBytes], { type: "application/pdf" });
//       const url = URL.createObjectURL(blob);

//       const link = document.createElement("a");
//       link.href = url;
//       link.download = "converted.pdf";
//       link.click();
//     } catch (error) {
//       console.error("Error generating PDF:", error);
//       setError("Failed to generate PDF. Please try again.");
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//       <div className="bg-white shadow-md rounded-lg p-6 max-w-lg w-full">
//         <h1 className="text-2xl font-bold mb-6 text-center">Word to PDF Converter</h1>

//         {/* File Upload */}
//         <div className="mb-4">
//           <label className="block text-gray-700 font-medium mb-2">Upload Word File:</label>
//           <input
//             type="file"
//             accept=".docx"
//             onChange={handleWordFileChange}
//             className="block w-full text-sm text-gray-500
//               file:mr-4 file:py-2 file:px-4
//               file:rounded-full file:border-0
//               file:text-sm file:font-semibold
//               file:bg-blue-50 file:text-blue-700
//               hover:file:bg-blue-100"
//           />
//         </div>

//         {/* Error Message */}
//         {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

//         {/* Convert Button */}
//         <button
//           onClick={generatePDF}
//           className={`w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded ${
//             loading ? "opacity-50 cursor-not-allowed" : ""
//           }`}
//           disabled={loading}
//         >
//           {loading ? "Generating PDF..." : "Convert to PDF"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PdfConverter;

// import React, { useState } from 'react';
// import mammoth from 'mammoth';
// import htmlToPdfmake from 'html-to-pdfmake';
// import pdfMake from 'pdfmake/build/pdfmake';
// import pdfFonts from 'pdfmake/build/vfs_fonts';

// // Import the fonts for pdfMake
// pdfMake.vfs = pdfFonts.pdfMake.vfs;

// const WordToPdfConverter = () => {
//   const [file, setFile] = useState(null);

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const convertWordToPdf = async () => {
//     if (!file) return alert('Please upload a Word file');

//     try {
//       const arrayBuffer = await file.arrayBuffer();

//       // Convert Word to HTML using Mammoth
//       const { value: html } = await mammoth.convertToHtml({ arrayBuffer });

//       // Convert the HTML content to a format compatible with pdfMake
//       const pdfMakeContent = htmlToPdfmake(html);

//       // Generate PDF document using pdfMake
//       const docDefinition = {
//         content: pdfMakeContent,
//       };

//       pdfMake.createPdf(docDefinition).download('converted.pdf');
//     } catch (error) {
//       console.error('Error converting Word to PDF:', error);
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
//       <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
//         <h1 className="text-2xl font-bold mb-4">Convert Word to PDF</h1>
//         <input
//           type="file"
//           accept=".docx"
//           onChange={handleFileChange}
//           className="mb-4 w-full px-4 py-2 border rounded"
//         />
//         <button
//           onClick={convertWordToPdf}
//           className="w-full bg-blue-500 text-white py-2 px-4 rounded"
//         >
//           Convert to PDF
//         </button>
//       </div>
//     </div>
//   );
// };

// export default WordToPdfConverter;

// import React, { useState } from 'react';
// import mammoth from 'mammoth';
// import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

// const PdfConverter = () => {
//   const [file, setFile] = useState(null);
//   const [pdfUrl, setPdfUrl] = useState('');

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const convertWordToPdf = async () => {
//     if (!file) return alert('Please upload a Word file');

//     try {
//       const reader = new FileReader();
//       reader.onload = async (event) => {
//         const arrayBuffer = event.target.result;

//         // Extract text and style using mammoth
//         const { value: extractedText, messages } = await mammoth.extractRawText({ arrayBuffer });
//         console.log('Extracted text:', extractedText);  // Verify extracted content

//         // Create a new PDF document
//         const pdfDoc = await PDFDocument.create();
//         let page = pdfDoc.addPage(); // Changed const to let
//         const { width, height } = page.getSize();

//         // Load a standard font
//         const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

//         const fontSize = 12;  // Adjust to keep same as Word font size
//         const textLines = extractedText.split('\n');
//         let yOffset = height - 50;  // Start from the top of the page

//         textLines.forEach((line) => {
//           if (yOffset < 50) {  // Create new page if space runs out
//             page = pdfDoc.addPage(); // Now this line will work
//             yOffset = height - 50;
//           }
//           page.drawText(line, {
//             x: 50,
//             y: yOffset,
//             size: fontSize,
//             font,
//             color: rgb(0, 0, 0),
//           });
//           yOffset -= fontSize + 5;  // Adjust line spacing
//         });

//         const pdfBytes = await pdfDoc.save();
//         const blob = new Blob([pdfBytes], { type: 'application/pdf' });
//         const pdfUrl = URL.createObjectURL(blob);
//         setPdfUrl(pdfUrl);
//       };

//       reader.readAsArrayBuffer(file);
//     } catch (error) {
//       console.error('Error converting Word to PDF:', error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
//       <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-lg">
//         <h1 className="text-2xl font-bold mb-4 text-center">Word to PDF Converter</h1>

//         <input
//           type="file"
//           accept=".docx"
//           onChange={handleFileChange}
//           className="mb-4 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//         />

//         <button
//           onClick={convertWordToPdf}
//           className="w-full bg-blue-500 text-white py-2 px-4 rounded"
//         >
//           Convert to PDF
//         </button>

//         {pdfUrl && (
//           <div className="mt-6">
//             <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
//               View PDF
//             </a>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PdfConverter;

import React, { useState } from 'react';
import mammoth from 'mammoth';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { Back } from './back';

const PdfConverter = () => {
  const [file, setFile] = useState(null);
  const [pdfUrl, setPdfUrl] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const convertWordToPdf = async () => {
    if (!file) return alert('Please upload a Word file');

    try {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const arrayBuffer = event.target.result;

        // Extract styled text using mammoth
        const { value: extractedText, messages } = await mammoth.convertToHtml({ arrayBuffer });

        // Create a new PDF document
        const pdfDoc = await PDFDocument.create();
        let page = pdfDoc.addPage();
        const { width, height } = page.getSize();

        // Load fonts
        const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
        const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

        const fontSize = 12;
        const margin = 50;
        const maxLineWidth = width - 2 * margin;
        const lineHeight = fontSize + 5;
        let yOffset = height - margin;

        // Split extracted HTML into lines
        const parser = new DOMParser();
        const doc = parser.parseFromString(extractedText, 'text/html');
        const elements = Array.from(doc.body.children);

        elements.forEach((element) => {
          let text = element.innerText || '';
          let isBold = element.tagName === 'B' || element.style.fontWeight === 'bold';
          let isCentered = element.style.textAlign === 'center';
          let font = isBold ? boldFont : regularFont;

          // Check for bullet points (assuming bullets are lines starting with '*')
          const isBullet = text.trim().startsWith('*');
          if (isBullet) {
            text = `• ${text.trim().substring(1).trim()}`;  // Replace '*' with a bullet symbol
          }

          // Center text if needed
          let xPosition = margin;
          if (isCentered) {
            const textWidth = font.widthOfTextAtSize(text, fontSize);
            xPosition = (width - textWidth) / 2;
          }

          // Wrap text if it exceeds the max width
          let words = text.split(' ');
          let currentLine = '';

          words.forEach((word) => {
            const testLine = currentLine + word + ' ';
            const textWidth = font.widthOfTextAtSize(testLine, fontSize);

            if (textWidth > maxLineWidth) {
              // Draw current line and start a new one
              page.drawText(currentLine.trim(), {
                x: xPosition,
                y: yOffset,
                size: fontSize,
                font,
                color: rgb(0, 0, 0),
              });
              yOffset -= lineHeight;

              if (yOffset < margin) {  // Create new page if needed
                page = pdfDoc.addPage();
                yOffset = height - margin;
              }
              currentLine = word + ' ';
            } else {
              currentLine = testLine;
            }
          });

          // Draw any remaining text in the current line
          if (currentLine.trim() !== '') {
            page.drawText(currentLine.trim(), {
              x: xPosition,
              y: yOffset,
              size: fontSize,
              font,
              color: rgb(0, 0, 0),
            });
            yOffset -= lineHeight;

            if (yOffset < margin) {
              page = pdfDoc.addPage();
              yOffset = height - margin;
            }
          }
        });

        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const pdfUrl = URL.createObjectURL(blob);
        setPdfUrl(pdfUrl);
      };

      reader.readAsArrayBuffer(file);
    } catch (error) {
      console.error('Error converting Word to PDF:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-lg">
        <Back/>
        <h1 className="text-2xl font-bold mb-4 text-center">Word to PDF Converter</h1>

        <input
          type="file"
          accept=".docx"
          onChange={handleFileChange}
          className="mb-4 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />

        <button
          onClick={convertWordToPdf}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded"
        >
          Convert to PDF
        </button>

        {pdfUrl && (
          <div className="mt-6">
            <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
              View PDF
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default PdfConverter;
