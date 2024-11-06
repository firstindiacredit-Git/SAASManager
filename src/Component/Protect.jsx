// import React, { useState } from "react";

// const Protect = () => {
//   const [pdfFile, setPdfFile] = useState(null);
//   const [password, setPassword] = useState("");
//   const [protectedPdf, setProtectedPdf] = useState(null);

//   const handleFileUpload = (event) => {
//     setPdfFile(event.target.files[0]);
//   };

//   const protectPdf = async () => {
//     if (!pdfFile || !password) {
//       alert("Please upload a PDF and enter a password.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("pdfFile", pdfFile);
//     formData.append("password", password);

//     try {
//       const response = await fetch("http://localhost:8080/protect", {
//         method: "POST",
//         body: formData,
//       });

//       if (response.ok) {
//         const blob = await response.blob();
//         const downloadUrl = URL.createObjectURL(blob);
//         setProtectedPdf(downloadUrl);
//       } else {
//         alert("Failed to protect PDF");
//       }
//     } catch (error) {
//       console.error("Error protecting PDF:", error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
//       <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
//         <h1 className="text-2xl font-bold mb-4 text-center">PDF Protector</h1>
//         <input
//           type="file"
//           accept="application/pdf"
//           onChange={handleFileUpload}
//           className="mb-4 w-full p-2 border rounded-lg"
//         />
//         <input
//           type="password"
//           placeholder="Enter Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="mb-4 w-full p-2 border rounded-lg"
//         />
//         <button
//           onClick={protectPdf}
//           className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg font-semibold"
//         >
//           Protect PDF
//         </button>
//         {protectedPdf && (
//           <a
//             href={protectedPdf}
//             download="protected.pdf"
//             className="mt-4 inline-block w-full text-center bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg font-semibold"
//           >
//             Download Protected PDF
//           </a>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Protect;


import React, { useState } from "react";

const Protect = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [password, setPassword] = useState("");
  const [protectedPdf, setProtectedPdf] = useState(null);

  const handleFileUpload = (event) => {
    setPdfFile(event.target.files[0]);
  };

  const protectPdf = async () => {
    if (!pdfFile || !password) {
      alert("Please upload a PDF and enter a password.");
      return;
    }

    const formData = new FormData();
    formData.append("pdfFile", pdfFile);
    formData.append("password", password);

    try {
      const response = await fetch("https://saas-backend-xwzf.vercel.app/protect", {
        method: "POST",
        body: formData,
        mode:'no-cors'
      });

      if (response.ok) {
        const { url } = await response.json();
        setProtectedPdf(url);
      } else {
        alert("Failed to protect PDF");
      }
    } catch (error) {
      console.error("Error protecting PDF:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 text-center">PDF Protector</h1>
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileUpload}
          className="mb-4 w-full p-2 border rounded-lg"
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 w-full p-2 border rounded-lg"
        />
        <button
          onClick={protectPdf}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg font-semibold"
        >
          Protect PDF
        </button>
        {protectedPdf && (
          <a
            href={protectedPdf}
            download="protected.pdf"
            className="mt-4 inline-block w-full text-center bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg font-semibold"
          >
            Download Protected PDF
          </a>
        )}
      </div>
    </div>
  );
};

export default Protect;
