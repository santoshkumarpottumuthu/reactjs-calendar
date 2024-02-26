import React from 'react';
import { format, addDays } from 'date-fns';

const Week = ({ startOfWeek }) => {
    const days = [...Array(7).keys()].map(i => addDays(startOfWeek, i));
    
    return (
        <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
            {days.map(day => (
                <div key={day} style={{ margin: '0 10px' }}>
                    {format(day, 'eeee dd/MM')}
                </div>
            ))}
        </div>
    );
};

export default Week;
