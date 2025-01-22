import React, { useState, useEffect } from "react";
import { Back } from "./back";

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gradient-to-br from-blue-50 to-gray-100 rounded-2xl p-8 shadow-sm border border-gray-100">
      <div className="text-6xl font-bold tracking-wider text-center font-mono text-gray-800">
        {time.toLocaleTimeString()}
      </div>
    </div>
  );
};

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

  const InputField = ({ value, onChange, min, max, placeholder, width = "w-16 md:w-20" }) => (
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(Math.max(min, Math.min(max, e.target.value)))}
      className={`${width} p-2 md:p-3 text-center bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
      placeholder={placeholder}
    />
  );

  const SelectField = ({ value, onChange, options, width = "w-auto" }) => (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`${width} p-2 md:p-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-wrap gap-2 md:gap-4 justify-center items-center">
        <InputField
          value={hour}
          onChange={setHour}
          min={1}
          max={12}
          placeholder="HH"
        />
        <InputField
          value={minute}
          onChange={setMinute}
          min={0}
          max={59}
          placeholder="MM"
        />
        <SelectField
          value={ampm}
          onChange={setAmpm}
          options={["AM", "PM"]}
          width="w-20"
        />
      </div>

      <div className="flex flex-wrap gap-2 md:gap-4 justify-center items-center">
        <SelectField
          value={day}
          onChange={setDay}
          options={["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]}
          width="w-32 md:w-auto"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-32 md:w-auto p-2 md:p-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        />
      </div>

      <div className="text-center">
        <button
          type="submit"
          className="px-6 md:px-8 py-2 md:py-3 bg-blue-600 text-white rounded-xl text-lg font-medium transition-all duration-200 hover:bg-blue-700 hover:shadow-md"
        >
          Add Alarm
        </button>
      </div>
    </form>
  );
};

const AlarmList = ({ alarms, deleteAlarm }) => {
  return (
    <div className="space-y-3">
      {alarms.map((alarm, index) => (
        <div
          key={index}
          className="flex flex-wrap md:flex-nowrap justify-between items-center p-3 md:p-4 bg-gradient-to-br from-blue-50 to-gray-100 rounded-xl border border-gray-100 shadow-sm gap-2"
        >
          <div className="font-medium text-gray-800 text-sm md:text-base w-full md:w-auto">
            {alarm.hour}:{String(alarm.minute).padStart(2, "0")} {alarm.ampm} on{" "}
            {alarm.day}, {alarm.date}
          </div>
          <button
            onClick={() => deleteAlarm(index)}
            className="w-full md:w-auto px-3 py-1 text-red-600 hover:text-red-700 transition-colors duration-200 text-sm md:text-base"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

const App = () => {
  const [alarms, setAlarms] = useState([]);
  const [alarmPlaying, setAlarmPlaying] = useState(false);
  const [alarmSound] = useState(new Audio("/notification.mp3"));
  const [triggeredAlarms, setTriggeredAlarms] = useState(new Set());

  const addAlarm = (alarm) => {
    setAlarms((prev) => [...prev, { ...alarm, id: Date.now() }]);
  };

  const deleteAlarm = (index) => {
    const alarmToDelete = alarms[index];
    if (alarmToDelete) {
      setTriggeredAlarms(prev => {
        const newSet = new Set(prev);
        newSet.delete(alarmToDelete.id);
        return newSet;
      });
    }
    setAlarms((prev) => prev.filter((_, i) => i !== index));
  };

  const stopAlarm = () => {
    alarmSound.pause();
    alarmSound.currentTime = 0;
    setAlarmPlaying(false);
  };

  useEffect(() => {
    const checkAlarms = setInterval(() => {
      const now = new Date();
      const currentDay = now.toLocaleString("en-us", { weekday: "long" });
      const currentDate = now.toISOString().split("T")[0];
      const currentHour = now.getHours() % 12 || 12;
      const currentMinute = now.getMinutes();
      const ampm = now.getHours() >= 12 ? "PM" : "AM";

      alarms.forEach((alarm) => {
        if (
          !triggeredAlarms.has(alarm.id) &&
          parseInt(alarm.hour) === currentHour &&
          parseInt(alarm.minute) === currentMinute &&
          alarm.ampm === ampm &&
          alarm.day === currentDay &&
          alarm.date === currentDate
        ) {
          if (!alarmPlaying) {
            alarmSound.play();
            setAlarmPlaying(true);
            setTriggeredAlarms(prev => new Set([...prev, alarm.id]));
          }
        }
      });
    }, 1000);

    return () => clearInterval(checkAlarms);
  }, [alarms, alarmPlaying, alarmSound, triggeredAlarms]);

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
              Alarm Clock
            </h1>
          </div>

          {/* Main Content */}
          <div className="p-8 space-y-8">
            {/* Current Time Display */}
            <Clock />

            {/* Set Alarm Form */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Set Alarm</h2>
              <AlarmForm addAlarm={addAlarm} />
            </div>

            {/* Alarm List */}
            {alarms.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Active Alarms</h2>
                <AlarmList alarms={alarms} deleteAlarm={deleteAlarm} />
              </div>
            )}

            {/* Stop Alarm Button */}
            {alarmPlaying && (
              <div className="text-center">
                <button
                  onClick={stopAlarm}
                  className="px-8 py-3 bg-red-600 text-white rounded-xl text-lg font-medium transition-all duration-200 hover:bg-red-700 hover:shadow-md"
                >
                  Stop Alarm
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
