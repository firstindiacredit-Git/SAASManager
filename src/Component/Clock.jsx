import React, { useState, useEffect } from 'react';
import { Back } from './back';

const Clock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [location, setLocation] = useState({
    city: '',
    country_name: '',
    timezone: '',
    utc_offset: '',
    postal: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  // Function to fetch the location using ipapi.co
  const fetchLocation = async () => {
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      if (data) {
        const { city, country_name, timezone, utc_offset, postal } = data;
        setLocation({ city, country_name, timezone, utc_offset, postal });
      } else {
        setErrorMessage('Location data not found');
      }
    } catch (error) {
      setErrorMessage('Unable to retrieve location');
    }
  };

  // Get user's location on component mount
  useEffect(() => {
    fetchLocation();
  }, []);

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer); // Cleanup interval on component unmount
  }, []);

  // Format the current time
  const formatTime = (date) => {
    return date.toLocaleTimeString(); // Customize time format as needed
  };

  // Format the current date
  const formatDate = (date) => {
    return date.toLocaleDateString(); // Customize date format as needed
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900 text-gray-200 p-6">
        <Back/>
        <h1 className="text-4xl font-bold text-center text-white mb-8">
          Clock
        </h1>
      {/* Display Current Date */}
      <div className="text-3xl font-bold mb-2">{formatDate(currentTime)}</div>
      {/* Display Current Time */}
      <div className="text-7xl font-extrabold mb-6 tracking-tight">
        {formatTime(currentTime)}
      </div>

      {/* Display Location Info */}
      {location.city && location.country_name ? (
        <div className="text-xl font-medium">
          {location.city}, {location.country_name}
        </div>
      ) : (
        <div className="text-red-500">{errorMessage || 'Fetching location...'}</div>
      )}

      {/* Display Timezone and Postal Code */}
      <div className="text-lg font-light mt-4 space-y-2">
        {location.timezone && <div>Timezone: {location.timezone}</div>}
        {location.utc_offset && <div>UTC Offset: {location.utc_offset}</div>}
        {location.postal && <div>Postal Code: {location.postal}</div>}
      </div>
    </div>
  );
};

export default Clock;
