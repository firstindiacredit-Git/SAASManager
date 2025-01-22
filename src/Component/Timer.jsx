import React, { useState, useEffect } from "react";
import { Back } from "./back";

const Timer = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(10);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const alarmSound = new Audio("/notification.mp3");

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds((prevSeconds) => prevSeconds - 1);
        } else if (minutes > 0) {
          setMinutes((prevMinutes) => prevMinutes - 1);
          setSeconds(59);
        } else if (hours > 0) {
          setHours((prevHours) => prevHours - 1);
          setMinutes(59);
          setSeconds(59);
        } else {
          alarmSound.play();
          setIsActive(false);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds, minutes, hours]);

  const incrementHours = () => setHours((prev) => Math.min(prev + 1, 99));
  const decrementHours = () => setHours((prev) => Math.max(prev - 1, 0));
  const incrementMinutes = () => setMinutes((prev) => Math.min(prev + 1, 59));
  const decrementMinutes = () => setMinutes((prev) => Math.max(prev - 1, 0));
  const incrementSeconds = () => setSeconds((prev) => Math.min(prev + 1, 59));
  const decrementSeconds = () => setSeconds((prev) => Math.max(prev - 1, 0));

  const startTimer = () => setIsActive(true);
  const stopTimer = () => setIsActive(false);
  const resetTimer = () => {
    setIsActive(false);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
  };

  const TimeUnit = ({ value, onIncrement, onDecrement }) => (
    <div className="flex flex-col items-center">
      <button
        onClick={onIncrement}
        className="w-12 h-12 flex items-center justify-center text-2xl text-gray-600 hover:text-blue-600 transition-colors duration-200"
      >
        +
      </button>
      <div className="bg-gradient-to-br from-blue-50 to-gray-100 border border-gray-100 rounded-xl p-4 shadow-sm w-24 text-center">
        <span className="text-5xl font-bold text-gray-800 font-mono">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <button
        onClick={onDecrement}
        className="w-12 h-12 flex items-center justify-center text-2xl text-gray-600 hover:text-blue-600 transition-colors duration-200"
      >
        -
      </button>
    </div>
  );

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
              Timer
            </h1>
          </div>

          {/* Main Content */}
          <div className="p-8">
            {/* Timer Display */}
            <div className="flex flex-col items-center mb-8">
              <div className="flex items-center justify-center gap-4">
                <TimeUnit
                  value={hours}
                  onIncrement={incrementHours}
                  onDecrement={decrementHours}
                />
                <div className="text-4xl font-bold text-gray-400 mb-12">:</div>
                <TimeUnit
                  value={minutes}
                  onIncrement={incrementMinutes}
                  onDecrement={decrementMinutes}
                />
                <div className="text-4xl font-bold text-gray-400 mb-12">:</div>
                <TimeUnit
                  value={seconds}
                  onIncrement={incrementSeconds}
                  onDecrement={decrementSeconds}
                />
              </div>
            </div>

            {/* Control Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={startTimer}
                disabled={isActive}
                className={`px-8 py-3 rounded-xl text-lg font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md"
                }`}
              >
                Start
              </button>
              <button
                onClick={stopTimer}
                disabled={!isActive}
                className={`px-8 py-3 rounded-xl text-lg font-medium transition-all duration-200 ${
                  !isActive
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-red-600 text-white hover:bg-red-700 hover:shadow-md"
                }`}
              >
                Stop
              </button>
              <button
                onClick={resetTimer}
                className="px-8 py-3 rounded-xl bg-gray-600 text-white text-lg font-medium transition-all duration-200 hover:bg-gray-700 hover:shadow-md"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timer;
