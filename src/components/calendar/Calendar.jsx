import React, { useState, useEffect } from 'react';
import { startOfWeek, addWeeks, subWeeks, addDays, format } from 'date-fns';
import './Calendar.css';

const Calendar = () => {
  const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [availability, setAvailabilityState] = useState({});
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const savedAvailability = JSON.parse(localStorage.getItem('availability'));
    if (savedAvailability) {
      setAvailabilityState(savedAvailability);
    }
  }, []);

  const setAvailability = (newAvailability) => {
    setAvailabilityState(newAvailability);
    localStorage.setItem('availability', JSON.stringify(newAvailability));
  };

  const toggleAvailability = (day, hour) => {
    const key = `${day}-${hour}`;
    setAvailability({ ...availability, [key]: !availability[key] });
  };

  const handleMouseDown = (day, hour) => {
    const key = `${day}-${hour}`;
    setIsDragging(true);
    toggleAvailability(day, hour);
  };

  const handleMouseEnter = (day, hour) => {
    if (isDragging) {
      toggleAvailability(day, hour);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const nextWeek = () => {
    setCurrentWeek(addWeeks(currentWeek, 1));
  };

  const prevWeek = () => {
    setCurrentWeek(subWeeks(currentWeek, 1));
  };

  const startOfCurrentWeek = startOfWeek(currentWeek, { weekStartsOn: 0 });
  const days = Array.from({ length: 7 }, (_, i) => {
    return format(addDays(startOfCurrentWeek, i), 'EEEE MM/dd');
  });


  
 return (
  <div className="calendar-wrapper">
    <div className="controls">
      <button aria-label="Go to previous week" onClick={prevWeek}>
        Previous Week
      </button>
      <button aria-label="Go to next week" onClick={nextWeek}>
        Next Week
      </button>
    </div>
    <div className="calendar-container">
      <div className="time-labels-container">
          
        {hours.map(hour => (
          <div key={hour} className="time-label">{}</div>
        ))}
      </div>
      <div className="days-container">
        {days.map(day => (
          <div key={day} className="day-container">
            <h3>{day}</h3>
            <div className="time-slots-container">
              {hours.map(hour => {
                const key = `${day}-${hour}`;
                return (
                  <div
                    key={key}
                    onMouseDown={() => handleMouseDown(day, hour)}
                    onMouseEnter={() => handleMouseEnter(day, hour)}
                    onMouseUp={handleMouseUp}
                    className={`time-slot${availability[key] ? ' available' : ''}`}
                  >
                    {hour}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
};

export default Calendar;
