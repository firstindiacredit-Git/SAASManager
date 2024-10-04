import React, { useState } from 'react';

function App() {
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [generatedLink, setGeneratedLink] = useState('');

  // Function to generate the PayPal link
  const generateLink = () => {
    // Base PayPal URL
    const baseLink = `https://www.paypal.com/cgi-bin/webscr?business=${email}&cmd=_xclick&currency_code=${currency}&amount=${amount}&item_name=${description}`;
    setGeneratedLink(baseLink);
  };

  // Function to copy the link to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLink);
    alert('Link copied to clipboard');
  };

  // Function to clear inputs and the link
  const clearInputs = () => {
    setEmail('');
    setDescription('');
    setAmount('');
    setCurrency('USD');
    setGeneratedLink('');
  };

  // Function to open the generated link
  const openLink = () => {
    if (generatedLink) {
      window.open(generatedLink, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">PayPal Link Generator</h1>

        {/* Input for PayPal email */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">PayPal Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter PayPal email"
          />
        </div>

        {/* Input for description */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter item description"
          />
        </div>

        {/* Input for amount */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter amount"
          />
        </div>

        {/* Dropdown for currency */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Currency:</label>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="USD">U.S. Dollar ($)</option>
            <option value="NZD">New Zealand Dollar ($)</option>
            <option value="EUR">Euro (€)</option>
            <option value="GBP">British Pound (£)</option>
            <option value="INR">Indian Rupee (₹)</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={generateLink}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Generate
          </button>
          <button
            onClick={clearInputs}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            Clear
          </button>
        </div>

        {/* Generated link and buttons */}
        {generatedLink && (
          <div className="mt-6">
            <p className="font-bold text-gray-700">Generated PayPal Link:</p>
            <textarea
              readOnly
              value={generatedLink}
              className="w-full p-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows="3"
            />
            <div className="flex justify-between mt-4">
              <button
                onClick={copyToClipboard}
                className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600"
              >
                Copy Link
              </button>
              <button
                onClick={openLink}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
              >
                Open Link
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
