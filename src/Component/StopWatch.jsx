import React, { useState, useEffect } from "react";
import { Back } from "./back";

const Stopwatch = () => {
  const [stopwatchSeconds, setStopwatchSeconds] = useState(0);
  const [isStopwatchRunning, setIsStopwatchRunning] = useState(false);
  const [pausedTimes, setPausedTimes] = useState([]);

  useEffect(() => {
    const cachedPausedTimes = JSON.parse(localStorage.getItem("pausedTimes")) || [];
    setPausedTimes(cachedPausedTimes);
  }, []);

  useEffect(() => {
    localStorage.setItem("pausedTimes", JSON.stringify(pausedTimes));
  }, [pausedTimes]);

  useEffect(() => {
    let stopwatchInterval = null;
    if (isStopwatchRunning) {
      stopwatchInterval = setInterval(() => {
        setStopwatchSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    }
    return () => clearInterval(stopwatchInterval);
  }, [isStopwatchRunning]);

  const formatStopwatchTime = (timeInSeconds) => {
    const hrs = Math.floor(timeInSeconds / 3600);
    const mins = Math.floor((timeInSeconds % 3600) / 60);
    const secs = timeInSeconds % 60;

    return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

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
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {/* Header */}
          <div className="relative p-6">
            <div className="absolute top-6 left-6">
              <Back />
            </div>
            <h1 className="text-4xl font-bold text-center text-black">
              Stopwatch
            </h1>
          </div>

          {/* Main Content */}
          <div className="p-8">
            {/* Stopwatch Display */}
            <div className="bg-gradient-to-br from-blue-50 to-gray-100 rounded-2xl p-8 mb-8 shadow-sm border border-gray-100">
              <div className="text-7xl font-bold tracking-wider text-center font-mono text-gray-800">
                {formatStopwatchTime(stopwatchSeconds)}
              </div>
            </div>

            {/* Control Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <button
                onClick={startStopwatch}
                disabled={isStopwatchRunning}
                className={`px-8 py-3 rounded-xl text-lg font-medium transition-all duration-200 ${
                  isStopwatchRunning
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md"
                }`}
              >
                Start
              </button>
              <button
                onClick={pauseStopwatch}
                disabled={!isStopwatchRunning}
                className={`px-8 py-3 rounded-xl text-lg font-medium transition-all duration-200 ${
                  !isStopwatchRunning
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-red-600 text-white hover:bg-red-700 hover:shadow-md"
                }`}
              >
                Pause
              </button>
              <button
                onClick={resetStopwatch}
                className="px-8 py-3 rounded-xl bg-gray-600 text-white text-lg font-medium transition-all duration-200 hover:bg-gray-700 hover:shadow-md"
              >
                Reset
              </button>
            </div>

            {/* Paused Times Section */}
            {pausedTimes.length > 0 && (
              <div className="bg-gradient-to-br from-blue-50 to-gray-100 rounded-2xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Paused Times</h2>
                <div className="overflow-x-auto max-h-96">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="py-2 px-4 text-left text-gray-600">#</th>
                        <th className="py-2 px-4 text-left text-gray-600">Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pausedTimes.map((time, index) => (
                        <tr key={index} className="border-b border-gray-200">
                          <td className="py-2 px-4 text-gray-800">{index + 1}</td>
                          <td className="py-2 px-4 font-mono text-gray-800">
                            {formatStopwatchTime(time)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stopwatch;
