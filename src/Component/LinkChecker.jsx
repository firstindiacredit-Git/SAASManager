import React, { useState } from 'react';
import axios from 'axios';
import { Back } from './back';

const LinkChecker = () => {
  const [url, setUrl] = useState('');
  const [links, setLinks] = useState([]);
  const [workingLinks, setWorkingLinks] = useState([]);
  const [nonWorkingLinks, setNonWorkingLinks] = useState([]);
  const [loading, setLoading] = useState(false); // New loading state

  const proxyUrl = 'https://api.allorigins.win/get?url=';

  const fetchLinksFromWebsite = async () => {
    setLoading(true); // Start loading when fetching starts
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

      const uniqueLinks = [...new Set(extractedLinks)];
      setLinks(uniqueLinks);
      await checkLinks(uniqueLinks); // Await the checking process
    } catch (error) {
      console.error('Error fetching website:', error);
    } finally {
      setLoading(false); // Stop loading once fetching and checking are done
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

      const urlWithoutFragment = link.split('#')[0];

      try {
        const response = await axios.get(proxyUrl + encodeURIComponent(urlWithoutFragment), {
          timeout: 10000,
          validateStatus: function (status) {
            return status === 200;
          }
        });

        if (response.data.status && response.data.status.http_code >= 200 && response.data.status.http_code < 500) {
          working.push(link);
        } else {
          nonWorking.push(link);
        }
      } catch (error) {
        working.push(link); // If there's an error, assume the link is working
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
     <Back/>
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
          className={`bg-blue-500 text-white px-4 py-2 rounded-md ${loading ? 'cursor-not-allowed' : ''}`}
          disabled={loading} // Disable button during loading
        >
          {loading ? 'Scaning...' : 'Scan'} {/* Conditionally render loader text */}
        </button>
      </form>

      <div className="grid grid-cols-2 gap-8 mt-8">
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
