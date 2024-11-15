import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import { Back } from './back';

const GoogleMap = () => {
  const [query, setQuery] = useState('');
  const [total, setTotal] = useState(10);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://saasbackend.pizeonfly.com/scrape', {
        // const response = await fetch('http://localhost:4000/scrape', {

        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, total }),
      });

      if (response.ok) {
        const blob = await response.blob();
        saveAs(blob, 'google_maps_data.xlsx'); // Trigger file download
      } else {
        console.error('Error downloading file');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10">
     <Back/>
      <h1 className="text-2xl font-bold mb-6 text-center">Google Maps Data Extractor</h1>
      <div className="mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter search term"
          className="border p-2 w-full rounded"
        />
      </div>
      <div className="mb-4">
        <input
          type="number"
          value={total}
          onChange={(e) => setTotal(e.target.value)}
          placeholder="Enter number of results"
          className="border p-2 w-full rounded"
        />
      </div>
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white p-2 rounded w-full"
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Search & Download Excel'}
      </button>
    </div>
  );
};

export default GoogleMap;
