import React, { useState } from 'react';
import axios from 'axios';
import { Back } from './back';

const BulkEmailChecker = () => {
  const [emails, setEmails] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const handleEmailChange = (e) => {
    setEmails(e.target.value);
  };

  const checkEmails = async () => {
    // Clear previous results and error
    setResults([]);
    setError('');

    // Split and trim emails
    const emailList = emails.split(',').map(email => email.trim());

    // Ensure emailList is not empty
    if (emailList.length === 0 || emailList[0] === '') {
      setError('Please enter at least one email.');
      return;
    }

    try {
      // const response = await axios.post('https://saasbackend.pizeonfly.com/api/email', {
      const response = await axios.post('http://localhost:4000/api/email', {
        emails: emailList
      });
      setResults(response.data);
    } catch (error) {
      console.error('Error verifying emails:', error);
      setError('Failed to verify emails. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <Back />
        <h2 className="text-2xl font-bold mb-6">Bulk Email Checker</h2>
        
        <textarea
          className="w-full p-2 border border-gray-300 rounded mb-4"
          rows="5"
          placeholder="Enter emails separated by commas"
          value={emails}
          onChange={handleEmailChange}
        />
        
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={checkEmails}
        >
          Check Emails
        </button>

        {error && (
          <div className="text-red-500 mt-4">
            {error}
          </div>
        )}

        {results.length > 0 && (
          <div className="mt-6">
            <h3 className="text-xl font-bold mb-4">Results:</h3>
            <ul className="space-y-2">
              {results.map((result, index) => (
                <li
                  key={index}
                  className={`p-2 rounded ${result.success ? 'bg-green-100' : 'bg-red-100'}`}
                >
                  {result.email}: {result.success ? 'Valid' : 'Invalid'}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default BulkEmailChecker;
