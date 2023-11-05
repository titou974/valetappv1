"use client"
import { useState, useEffect } from 'react';
import { DateTime } from 'luxon';


const TimeCounter = ({ startingHour, sessionStarted, setLoading }) => {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    setLoading(true);
    const startTime = new Date(startingHour).getTime();
    const updateElapsedTime = () => {
      const now = new Date().getTime();
      const elapsedMilliseconds = now - startTime;
      setElapsedTime(elapsedMilliseconds);
    };

    const intervalId = setInterval(updateElapsedTime, 1000);

    setLoading(false);
    return () => clearInterval(intervalId);
  }, [startingHour]);

  const formatTime = (milliseconds) => {
    setLoading(true);
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    if (sessionStarted) {
      setLoading(false);
      return `${hours} : ${minutes} : ${seconds}`;
    } else {
      setLoading(true);
      return `00 : 00 : 00`;
    }
  };

  return (
    <div>
      {formatTime(elapsedTime)}
    </div>
  );
};

export default TimeCounter;
