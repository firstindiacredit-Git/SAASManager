// import React, { useState } from "react";
// import * as pdfjsLib from "pdfjs-dist/webpack";

// const PdfToImage = () => {
//   const [images, setImages] = useState([]);
  
//   // Load PDF from file input
//   const handlePdfUpload = async (event) => {
//     const file = event.target.files[0];
//     if (file && file.type === "application/pdf") {
//       const pdfData = await file.arrayBuffer();
//       const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;

//       const pages = [];
//       for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
//         const page = await pdf.getPage(pageNum);
//         const canvas = document.createElement("canvas");
//         const context = canvas.getContext("2d");
        
//         const viewport = page.getViewport({ scale: 1.5 });
//         canvas.width = viewport.width;
//         canvas.height = viewport.height;

//         await page.render({ canvasContext: context, viewport }).promise;
//         pages.push(canvas.toDataURL("image/png"));
//       }
//       setImages(pages);
//     } else {
//       alert("Please upload a valid PDF file.");
//     }
//   };

//   return (
//     <div className="p-4 max-w-xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4 text-center">Upload PDF to Convert to Images</h1>
      
//       <input
//         type="file"
//         accept="application/pdf"
//         onChange={handlePdfUpload}
//         className="mb-4 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//       />

//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
//         {images.map((image, index) => (
//           <div key={index} className="border rounded-lg overflow-hidden shadow-md">
//             <img
//               src={image}
//               alt={`Page ${index + 1}`}
//               className="w-full h-auto object-cover"
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PdfToImage;
