import React, { useState } from "react";
import { Back } from "./back";

const WordCounter = () => {
  const [text, setText] = useState("");

  // Function to count words
  const countWords = (text) => {
    return text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  };

  // Function to count characters
  const countCharacters = (text) => {
    return text.length;
  };

  // Function to count lines
  const countLines = (text) => {
    return text.split("\n").length;
  };

  // Handle text change
  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex justify-center items-center p-6">
      <div className="w-full max-w-2xl bg-gray-800 rounded-lg shadow-lg p-6">
        <Back/>
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Word, Character, and Line Counter
        </h1>
        <textarea
          value={text}
          onChange={handleTextChange}
          placeholder="Type or paste your text here..."
          className="w-full h-40 p-4 text-lg bg-gray-700 text-white rounded-lg focus:outline-none"
        ></textarea>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-white">
          {/* Words Count */}
          <div className="p-4 bg-gray-700 rounded-lg text-center">
            <h2 className="text-lg font-semibold">Words</h2>
            <p className="text-2xl font-bold">{countWords(text)}</p>
          </div>

          {/* Characters Count */}
          <div className="p-4 bg-gray-700 rounded-lg text-center">
            <h2 className="text-lg font-semibold">Characters</h2>
            <p className="text-2xl font-bold">{countCharacters(text)}</p>
          </div>

          {/* Lines Count */}
          <div className="p-4 bg-gray-700 rounded-lg text-center">
            <h2 className="text-lg font-semibold">Lines</h2>
            <p className="text-2xl font-bold">{countLines(text)}</p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => setText("")}
            className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Clear Text
          </button>
        </div>
      </div>
    </div>
  );
};

export default WordCounter;
