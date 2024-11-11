import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const unlockPdf = async () => {
    if (!file) {
      setMessage("Please upload a PDF file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("password", password); // Add password

    try {
      const response = await axios.post("http://16.16.246.83:8080/unlock-pdf", formData, {
        responseType: "blob",
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Download the unlocked PDF
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "unlocked.pdf");
      document.body.appendChild(link);
      link.click();
      setMessage("PDF unlocked successfully!");
    } catch (error) {
      console.error("Error unlocking PDF:", error);
      setMessage("Error unlocking PDF. Please check the password and try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">Unlock PDF</h1>
        <input 
          type="file" 
          accept="application/pdf" 
          onChange={handleFileChange} 
          className="mb-4 p-2 border border-gray-300 rounded"
        />
        <input 
          type="password" 
          placeholder="Enter PDF Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          className="mb-4 p-2 border border-gray-300 rounded"
        />
        <button 
          onClick={unlockPdf} 
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Unlock PDF
        </button>
        {message && <p className="mt-4 text-green-500">{message}</p>}
      </div>
    </div>
  );
}

export default App;
