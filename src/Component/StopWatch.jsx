import React, { useState, useEffect } from "react";
import { Back } from "./back";

const Stopwatch = () => {
  const [stopwatchSeconds, setStopwatchSeconds] = useState(0);
  const [isStopwatchRunning, setIsStopwatchRunning] = useState(false);
  const [pausedTimes, setPausedTimes] = useState([]);

  // Load cached paused times on component mount
  useEffect(() => {
    const cachedPausedTimes =
      JSON.parse(localStorage.getItem("pausedTimes")) || [];
    setPausedTimes(cachedPausedTimes);
  }, []);

  // Cache paused times when they change
  useEffect(() => {
    localStorage.setItem("pausedTimes", JSON.stringify(pausedTimes));
  }, [pausedTimes]);

  // Stopwatch logic
  useEffect(() => {
    let stopwatchInterval = null;
    if (isStopwatchRunning) {
      stopwatchInterval = setInterval(() => {
        setStopwatchSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    }
    return () => clearInterval(stopwatchInterval);
  }, [isStopwatchRunning]);

  // Convert stopwatch seconds to hours, minutes, seconds
  const formatStopwatchTime = (timeInSeconds) => {
    const hrs = Math.floor(timeInSeconds / 3600);
    const mins = Math.floor((timeInSeconds % 3600) / 60);
    const secs = timeInSeconds % 60;

    return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(
      2,
      "0"
    )}:${String(secs).padStart(2, "0")}`;
  };

  // Stopwatch button actions
  const startStopwatch = () => setIsStopwatchRunning(true);

  const pauseStopwatch = () => {
    setIsStopwatchRunning(false);
    setPausedTimes((prevTimes) => [...prevTimes, stopwatchSeconds]);
  };

  const resetStopwatch = () => {
    setIsStopwatchRunning(false);
    setStopwatchSeconds(0);
    setPausedTimes([]);
    localStorage.removeItem("pausedTimes");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col items-center p-6">
        <Back/>
      {/* Heading */}
      <h1 className="text-4xl font-extrabold mb-8">Stopwatch</h1>

      {/* Stopwatch Display */}
      <div className="text-7xl font-extrabold tracking-tight mb-6">
        {formatStopwatchTime(stopwatchSeconds)}
      </div>

      {/* Play, Pause, Reset Buttons */}
      <div className="flex space-x-4 mb-8">
        <button
          onClick={startStopwatch}
          className={`px-6 py-3 rounded-lg text-lg font-medium transition ${
            isStopwatchRunning
              ? "bg-blue-400 text-blue-200 cursor-not-allowed opacity-50"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
          disabled={isStopwatchRunning}
        >
          Start
        </button>
        <button
          onClick={pauseStopwatch}
          className="px-6 py-3 rounded-lg bg-red-500 text-white text-lg font-medium transition hover:bg-red-600"
          disabled={!isStopwatchRunning}
        >
          Pause
        </button>
        <button
          onClick={resetStopwatch}
          className="px-6 py-3 rounded-lg bg-gray-500 text-white text-lg font-medium transition hover:bg-gray-600"
        >
          Reset
        </button>
      </div>

      {/* Paused Times Table */}
      <h2 className="text-2xl font-bold mb-4">Paused Times</h2>
      {pausedTimes.length > 0 ? (
        <div className="overflow-x-auto max-h-96 w-full max-w-2xl border border-gray-700 rounded-lg bg-gray-800">
          <div className="relative overflow-y-auto max-h-80">
            <table className="w-full text-gray-300">
              <thead className="sticky top-0 bg-gray-700">
                <tr>
                  <th className="px-4 py-2 border-b border-gray-600">Pause #</th>
                  <th className="px-4 py-2 border-b border-gray-600">Time</th>
                </tr>
              </thead>
              <tbody>
                {pausedTimes.map((time, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"
                    }`}
                  >
                    <td className="px-4 py-2 border-b border-gray-600 text-center">
                      {index + 1}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-600 text-center">
                      {formatStopwatchTime(time)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">No paused times recorded.</p>
      )}
    </div>
  );
};

export default Stopwatch;
