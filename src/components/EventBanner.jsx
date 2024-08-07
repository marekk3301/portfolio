import React from 'react';
import Award from './Award';

const EventBanner = ({ logo, awards }) => {
    const path = "/galleries/event_logos/" + logo; 
    return (
        <div className='event__banner'>
            <img src={path} alt={logo} className='event__logo'/>
            <div className='awards__container'>
                {awards.map((award) => (
                    <Award award={award} />
                ))}
            </div>
        </div>
    );
  }
  
  export default EventBanner;