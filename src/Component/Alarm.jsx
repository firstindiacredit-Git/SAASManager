import React, { useState, useEffect } from "react";
import { Back } from "./back";

// Clock Component
const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer); // Cleanup interval on component unmount
  }, []);

  return (
    <div className="text-center text-white text-6xl font-bold">
      {time.toLocaleTimeString()}
    </div>
  );
};

// AlarmForm Component
const AlarmForm = ({ addAlarm }) => {
  const [hour, setHour] = useState(12);
  const [minute, setMinute] = useState(0);
  const [ampm, setAmpm] = useState("AM");
  const [day, setDay] = useState("Sunday");
  const [date, setDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addAlarm({ hour, minute, ampm, day, date });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-white">
      <div className="flex space-x-2">
        <input
          type="number"
          value={hour}
          onChange={(e) => setHour(Math.max(1, Math.min(12, e.target.value)))}
          className="w-16 p-2 text-center bg-gray-500 text-white rounded"
          placeholder="HH"
        />
        <input
          type="number"
          value={minute}
          onChange={(e) => setMinute(Math.max(0, Math.min(59, e.target.value)))}
          className="w-16 p-2 text-center bg-gray-500 text-white rounded"
          placeholder="MM"
        />
        <select
          value={ampm}
          onChange={(e) => setAmpm(e.target.value)}
          className="p-2 bg-gray-500 text-white rounded"
        >
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
      </div>

      {/* Select Day and Date */}
      <div className="flex space-x-2">
        <select
          value={day}
          onChange={(e) => setDay(e.target.value)}
          className="p-2 bg-gray-500 text-white rounded"
        >
          <option value="Sunday">Sunday</option>
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
          <option value="Saturday">Saturday</option>
        </select>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="p-2 bg-gray-500 text-white rounded"
        />
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Add Alarm
      </button>
    </form>
  );
};

// AlarmList Component
const AlarmList = ({ alarms, deleteAlarm }) => {
  return (
    <div className="mt-6 space-y-2">
      {alarms.map((alarm, index) => (
        <div
          key={index}
          className="flex justify-between items-center p-4 bg-gray-800 rounded text-white"
        >
          <div>
            {alarm.hour}:{String(alarm.minute).padStart(2, "0")} {alarm.ampm} on {alarm.day}, {alarm.date}
          </div>
          <button
            onClick={() => deleteAlarm(index)}
            className="text-red-500 hover:underline"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

// Main App Component
const App = () => {
  const [alarms, setAlarms] = useState([]);
  const [alarmPlaying, setAlarmPlaying] = useState(false);
  const [alarmSound, setAlarmSound] = useState(new Audio("/notification.mp3")); // Alarm sound

  // Add Alarm
  const addAlarm = (alarm) => {
    setAlarms((prev) => [...prev, alarm]);
  };

  // Delete Alarm
  const deleteAlarm = (index) => {
    setAlarms((prev) => prev.filter((_, i) => i !== index));
  };

  // Stop Alarm
  const stopAlarm = () => {
    alarmSound.pause();
    alarmSound.currentTime = 0;
    setAlarmPlaying(false);
  };

  // Alarm Checking Logic
  useEffect(() => {
    const checkAlarms = setInterval(() => {
      const now = new Date();
      const currentDay = now.toLocaleString("en-us", { weekday: "long" });
      const currentDate = now.toISOString().split("T")[0]; // Get the current date in YYYY-MM-DD format
      const currentHour = now.getHours() % 12 || 12;
      const currentMinute = now.getMinutes();
      const ampm = now.getHours() >= 12 ? "PM" : "AM";

      alarms.forEach((alarm) => {
        if (
          alarm.hour === currentHour &&
          alarm.minute === currentMinute &&
          alarm.ampm === ampm &&
          alarm.day === currentDay &&
          alarm.date === currentDate
        ) {
          if (!alarmPlaying) {
            alarmSound.play();
            setAlarmPlaying(true);
          }
        }
      });
    }, 1000);

    return () => clearInterval(checkAlarms);
  }, [alarms, alarmPlaying]);

  return (
    <div className="h-screen flex justify-center items-center bg-gray-900">
      <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-lg">
        <Back/>
        <h1 className="text-4xl font-bold text-center text-white mb-8">
          Alarm Clock
        </h1>
        <div className="space-y-6">
          {/* Current Time Display */}
          <Clock />

          {/* Set Alarm Form */}
          <AlarmForm addAlarm={addAlarm} />

          {/* Alarm List */}
          <AlarmList alarms={alarms} deleteAlarm={deleteAlarm} />

          {/* Stop Alarm Button */}
          {alarmPlaying && (
            <div className="mt-6 text-center">
              <button
                onClick={stopAlarm}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Stop Alarm
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
