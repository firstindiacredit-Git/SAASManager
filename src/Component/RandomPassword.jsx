import React, { useState } from 'react';
import { Back } from './back';

const generatePassword = (length) => {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-+=<>?';
  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
};

function App() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(12);
  const [copySuccess, setCopySuccess] = useState('');

  // Generate password
  const handleGenerate = () => {
    setPassword(generatePassword(length));
    setCopySuccess(''); // Clear any previous copy status
  };

  // Copy password to clipboard
  const handleCopy = () => {
    if (password) {
      navigator.clipboard.writeText(password).then(() => {
        setCopySuccess('Password copied!');
      }).catch((err) => {
        setCopySuccess('Failed to copy!');
        console.error('Error copying text: ', err);
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <Back/>
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Random Password Generator</h1>
        
        {/* Password Length Control */}
        <div className="flex justify-between mb-6">
          <label htmlFor="length" className="text-gray-700">Password Length</label>
          <input 
            type="number" 
            id="length" 
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            min="6" 
            max="20"
            className="w-16 p-2 border rounded-lg"
          />
        </div>

        {/* Password Output */}
        <div className="mb-6 flex items-center">
          <input 
            type="text" 
            value={password} 
            readOnly
            className="w-full p-4 border rounded-lg bg-gray-50 text-gray-800"
            placeholder="Generated Password"
          />
          <button 
            onClick={handleCopy} 
            className="ml-4 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Copy
          </button>
        </div>

        {/* Generate Button */}
        <button 
          onClick={handleGenerate} 
          className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Generate Password
        </button>

        {/* Copy Success Message */}
        {copySuccess && (
          <div className="mt-4 text-center text-green-500">{copySuccess}</div>
        )}
      </div>
    </div>
  );
}

export default App;
