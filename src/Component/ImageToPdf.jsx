// import React, { useState, useRef } from 'react';
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';
// import Webcam from 'react-webcam';


// const ImageToPdf = () => {
//   const [images, setImages] = useState([]);
//   const [pageOrientation, setPageOrientation] = useState('portrait');
//   const [pageSize, setPageSize] = useState('letter');
//   const [imageSize, setImageSize] = useState('original');
//   const [useWebcam, setUseWebcam] = useState(false);
//   const webcamRef = useRef(null);

//   // Handle file upload
//   const handleFileUpload = (event) => {
//     const files = Array.from(event.target.files);
//     const fileURLs = files.map((file) => URL.createObjectURL(file));
//     setImages((prevImages) => [...prevImages, ...fileURLs]);
//     setUseWebcam(false);
//   };

//   // Capture image from webcam
//   const captureImage = () => {
//     const imageSrc = webcamRef.current.getScreenshot();
//     if (imageSrc) {
//       setImages((prevImages) => [...prevImages, imageSrc]);
//     }
//   };

//   // Delete image
//   const deleteImage = (index) => {
//     setImages((prevImages) => prevImages.filter((_, i) => i !== index));
//   };

//   // Handle PDF creation
//   const createPDF = async () => {
//     const pdf = new jsPDF({
//       orientation: pageOrientation,
//       unit: 'px',
//       format: pageSize,
//     });

//     for (let i = 0; i < images.length; i++) {
//       const imgElement = document.getElementById(`img-${i}`);
//       const canvas = await html2canvas(imgElement);
//       const imgData = canvas.toDataURL('image/jpeg');
//       pdf.addImage(imgData, 'JPEG', 20, 20, pdf.internal.pageSize.width - 40, pdf.internal.pageSize.height - 40);

//       if (i < images.length - 1) {
//         pdf.addPage();
//       }
//     }

//     pdf.save('images.pdf');
//   };

//   return (
//     <>
    
//     <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
//       <h1 className="text-2xl font-bold mb-6">Image to PDF Converter</h1>

//       {/* Image capture and upload */}
//       <div className="flex flex-col md:flex-row items-center justify-between mb-6">
//         {/* File Upload */}
//         <input
//           type="file"
//           accept="image/*"
//           multiple
//           onChange={handleFileUpload}
//           className="file-input mb-4 md:mb-0"
//         />

//         {/* Webcam Capture Option */}
//         <button
//           onClick={() => setUseWebcam((prev) => !prev)}
//           className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 mb-4 md:mb-0"
//         >
//           {useWebcam ? 'Cancel Webcam' : 'Use Webcam'}
//         </button>

//         {/* Webcam Capture */}
//         {useWebcam && (
//           <div className="flex flex-col items-center mb-4 md:mb-0">
//             <Webcam
//               audio={false}
//               ref={webcamRef}
//               screenshotFormat="image/jpeg"
//               className="w-64 h-48 mb-2 border border-gray-300 rounded"
//             />
//             <button
//               onClick={captureImage}
//               className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//             >
//               Capture Image
//             </button>
//           </div>
//         )}

//         {/* Create PDF Button */}
//         <button
//           onClick={createPDF}
//           className="bg-blue-500 text-white ml-2 px-4 py-2 rounded hover:bg-blue-600"
//         >
//           Create PDF
//         </button>
//       </div>

//       {/* Display uploaded/captured images */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
//         {images.map((image, index) => (
//           <div key={index} className="relative p-2 bg-white shadow-lg rounded-lg overflow-hidden">
//             <img
//               src={image}
//               id={`img-${index}`}
//               alt={`Uploaded ${index}`}
//               className="w-full h-32 object-cover rounded-lg"
//             />
//             <button
//               onClick={() => deleteImage(index)}
//               className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
//             >
//               Delete
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* PDF Settings */}
//       <div className="my-6 w-full">
//         <h2 className="text-lg font-semibold mb-4">PDF Settings</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div>
//             <label>Page Orientation</label>
//             <select
//               value={pageOrientation}
//               onChange={(e) => setPageOrientation(e.target.value)}
//               className="form-select mt-1 block w-full border border-gray-300 rounded"
//             >
//               <option value="portrait">Portrait</option>
//               <option value="landscape">Landscape</option>
//             </select>
//           </div>

//           <div>
//             <label>Page Size</label>
//             <select
//               value={pageSize}
//               onChange={(e) => setPageSize(e.target.value)}
//               className="form-select mt-1 block w-full border border-gray-300 rounded"
//             >
//               <option value="letter">Letter</option>
//               <option value="a4">A4</option>
//               <option value="legal">Legal</option>
//             </select>
//           </div>

//           <div>
//             <label>Image Size</label>
//             <select
//               value={imageSize}
//               onChange={(e) => setImageSize(e.target.value)}
//               className="form-select mt-1 block w-full border border-gray-300 rounded"
//             >
//               <option value="original">Original</option>
//               <option value="fit-width">Fit Width</option>
//               <option value="fit-height">Fit Height</option>
//             </select>
//           </div>
//         </div>
//       </div>
//     </div>
//     </>
//   );
// };

// export default ImageToPdf;

import React, { useState } from "react";
import { jsPDF } from "jspdf";
import { Back } from "./back";

const ImageToPdf = () => {
  const [images, setImages] = useState([]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...imageUrls]);
  };

  const deleteImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const generatePdf = () => {
    const pdf = new jsPDF();
    images.forEach((image, index) => {
      if (index > 0) pdf.addPage();
      pdf.addImage(image, "JPEG", 10, 10, 180, 160); // Adjust position and size
    });
    pdf.save("images.pdf");
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-lg mt-24">
      <Back />
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Convert Images to PDF
      </h1>

      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageUpload}
        className="block w-full text-gray-600 border border-gray-300 rounded-md py-2 px-4 mb-4 text-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700 focus:outline-none"
      />

      <button
        onClick={generatePdf}
        className="w-full py-3 mb-6 text-lg font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-blue-300 transition-colors"
        disabled={images.length === 0}
      >
        Generate PDF
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {images.map((image, index) => (
          <div key={index} className="relative group border rounded-lg overflow-hidden shadow-lg">
            <img
              src={image}
              alt={`Uploaded ${index}`}
              className="w-full h-48 object-cover"
            />
            <button
              onClick={() => deleteImage(index)}
              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Delete Image"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageToPdf;
