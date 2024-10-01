import React from 'react';
import Award from './Award';

import "../css/Event.css"

const EventBanner = ({ logo, awards }) => {
    const logoPath = process.env.PUBLIC_URL + "/galleries/event_logos/" + logo; 
    const awardPath = process.env.PUBLIC_URL + "/galleries/awards/" + awards[1]; 
    console.log(awards);

    if (awards[1] !== "") {
        return (
            <div className='event__banner'>
                <img src={logoPath} alt={logo} className='event__logo'/>
                <div className='awards__container'>
                    {awards[0].map((award) => (
                        <a href={awardPath} target='blank'><Award award={award} /></a>
                    ))}
                </div>
            </div>
        );
    }
    else {
        return (
            <div className='event__banner'>
                <img src={logoPath} alt={logo} className='event__logo'/>
                <div className='awards__container'>
                    {awards[0].map((award) => (
                        <Award award={award} />
                    ))}
                </div>
            </div>
        );
    }
  }
  
  export default EventBanner;