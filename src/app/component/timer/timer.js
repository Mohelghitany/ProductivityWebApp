import React, { useState, useEffect } from 'react';

const CountdownTimer = () => {
  const [timers, setTimers] = useState([]); 
  const [inputTime, setInputTime] = useState('');

  
  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  
  const addTimer = () => {
    const totalTime = parseInt(inputTime, 10);
    if (!isNaN(totalTime) && totalTime > 0) {
      setTimers([...timers, { time: totalTime * 60, isActive: false }]);
      setInputTime('');
    }
  };

 
  const toggleTimer = (index) => {
    const updatedTimers = timers.map((timer, idx) => {
      if (idx === index) {
        return { ...timer, isActive: !timer.isActive }; 
      }
      return timer;
    });
    setTimers(updatedTimers);
  };


  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((prevTimers) =>
        prevTimers
          .map((timer) => {
            if (timer.isActive && timer.time > 0) {
              return { ...timer, time: timer.time - 1 };
            }
            return timer;
          })
          .filter((timer) => timer.time > 0) 
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [timers]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Countdown Timer</h1>
      <div className="mb-4">
        <input
          type="number"
          value={inputTime}
          onChange={(e) => setInputTime(e.target.value)}
          placeholder="Enter time in minutes"
          className="p-2 border border-gray-400 rounded w-48 text-center"
        />
        <button
          onClick={addTimer}
          className="bg-green-500 text-white px-4 py-2 ml-4 rounded hover:bg-green-600"
        >
          Add Timer
        </button>
      </div>
      <div className="flex flex-col gap-4">
        {timers.map((timer, index) => (
          <div key={index} className="flex items-center space-x-4">
            <div className="text-3xl font-mono">{formatTime(timer.time)}</div>
            <button
              onClick={() => toggleTimer(index)}
              className={`${
                timer.isActive ? 'bg-red-500' : 'bg-blue-500'
              } text-white px-4 py-2 rounded hover:bg-blue-600`}
            >
              {timer.isActive ? 'Stop' : 'Start'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountdownTimer;
