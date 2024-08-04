import React from 'react';

const EventBanner = ({ logo, duration }) => {
    return (
        <div>
            <img src={require('../assets/logos/' + {logo})} alt="event_logo" />
            <span>{duration}h</span>
        </div>
    );
  }
  
  export default EventBanner;