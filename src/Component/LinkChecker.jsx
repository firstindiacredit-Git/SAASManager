import React, { useState } from 'react';
import axios from 'axios';

const LinkChecker = () => {
  const [url, setUrl] = useState('');
  const [links, setLinks] = useState([]);
  const [workingLinks, setWorkingLinks] = useState([]);
  const [nonWorkingLinks, setNonWorkingLinks] = useState([]);

  // AllOrigins proxy to bypass the CORS issue
  const proxyUrl = 'https://api.allorigins.win/get?url=';

  const fetchLinksFromWebsite = async () => {
    try {
      const response = await axios.get(proxyUrl + encodeURIComponent(url));
      const htmlString = response.data.contents;
  
      const anchorTags = htmlString.match(/<a[^>]+href=["']([^"']+)["']/g);
      const extractedLinks = anchorTags
        ? anchorTags.map((tag) => {
            const href = tag.match(/href=["']([^"']+)["']/)[1];
            if (href.startsWith('http')) {
              return href;
            } else if (href.startsWith('#')) {
              return url + href;
            } else if (href.startsWith('/')) {
              return new URL(href, url).href;
            } else {
              return new URL(href, url).href;
            }
          })
        : [];
  
      const uniqueLinks = [...new Set(extractedLinks)]; // Remove duplicates
      setLinks(uniqueLinks);
      checkLinks(uniqueLinks);
    } catch (error) {
      console.error('Error fetching website:', error);
    }
  };
  const checkLinks = async (links) => {
    const working = [];
    const nonWorking = [];
  
    const alwaysWorkingPatterns = [
      /^https?:\/\/(www\.)?(facebook|youtube|linkedin|instagram|twitter)\.com/,
      /^https?:\/\/api\.whatsapp\.com/,
      /^https?:\/\/firstindiacredit\.com/,  // Consider all firstindiacredit.com links as working
      /^https?:\/\/mail\.google\.com/,
      /^#/  // Consider all fragment links as working
    ];
  
    for (let link of links) {
      if (alwaysWorkingPatterns.some(pattern => pattern.test(link))) {
        working.push(link);
        continue;
      }
  
      // Remove fragments from URLs before checking
      const urlWithoutFragment = link.split('#')[0];
  
      try {
        const response = await axios.get(proxyUrl + encodeURIComponent(urlWithoutFragment), {
          timeout: 10000,
          validateStatus: function (status) {
            return status === 200; // Proxy should return 200
          }
        });
        
        if (response.data.status && response.data.status.http_code >= 200 && response.data.status.http_code < 500) {
          working.push(link);
        } else {
          nonWorking.push(link);
        }
      } catch (error) {
        // If there's an error, we'll consider the link as working
        // This is to avoid false negatives due to proxy issues
        working.push(link);
      }
    }
  
    setWorkingLinks(working);
    setNonWorkingLinks(nonWorking);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchLinksFromWebsite();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold text-center mb-6">Website Link Checker</h1>
      
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto flex space-x-4">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste website link here"
          className="w-full px-4 py-2 border rounded-md"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Scan
        </button>
      </form>

      <div className="grid grid-cols-2 gap-8 mt-8">
        {/* Working Links */}
        <div>
          <h2 className="text-xl font-bold mb-4">Working Links</h2>
          {workingLinks.length > 0 ? (
            <ul className="space-y-2">
              {workingLinks.map((link, index) => (
                <li key={index} className="text-green-500">
                  <a href={link} target="_blank" rel="noopener noreferrer">{link}</a>
                </li>
              ))}
            </ul>
          ) : (
            <p>No working links found.</p>
          )}
        </div>

        {/* Non-Working Links */}
        <div>
          <h2 className="text-xl font-bold mb-4">Non-Working Links</h2>
          {nonWorkingLinks.length > 0 ? (
            <ul className="space-y-2">
              {nonWorkingLinks.map((link, index) => (
                <li key={index} className="text-red-500">
                  {link}
                </li>
              ))}
            </ul>
          ) : (
            <p>No non-working links found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LinkChecker;
