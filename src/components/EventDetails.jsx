import React from 'react';

const EventDetails = ({ name, location, date, duration }) => {
    return (
        <div>
            <div className='event__textbox'>
                <span>{name}</span>
                <span>{duration}h</span>
            </div>
            <div className='event__textbox'>
                <span>{location}</span>
                <span>{date.replaceAll("-", ".")}</span>
            </div>
        </div>
    );
  }
  
  export default EventDetails;