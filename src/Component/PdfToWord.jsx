import React, { useState } from 'react';
import axios from 'axios';

const PdfToWord = () => {
  const [file, setFile] = useState(null);
  const [convertedFileUrl, setConvertedFileUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setConvertedFileUrl('');
  };

  const handleConvert = async () => {
    if (!file) return;
    
    const formData = new FormData();
    formData.append('pdf', file);

    setLoading(true);

    try {
      const response = await axios.post('YOUR_BACKEND_API_ENDPOINT', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setConvertedFileUrl(response.data.wordFileUrl);
      setLoading(false);
    } catch (error) {
      console.error('Error converting file:', error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">PDF to Word Converter</h1>

      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        className="mb-4"
      />

      <button
        onClick={handleConvert}
        className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={loading}
      >
        {loading ? 'Converting...' : 'Convert PDF to Word'}
      </button>

      {convertedFileUrl && (
        <a
          href={convertedFileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Download Word Document
        </a>
      )}
    </div>
  );
};

export default PdfToWord;
