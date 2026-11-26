import React from 'react';
import Award from './Award';

import "../css/Event.css"

const EventBanner = ({ logo, awards }) => {
    const [awardList, certificate] = awards;
    const logoPath = process.env.PUBLIC_URL + "/galleries/event_logos/" + logo;
    const awardPath = process.env.PUBLIC_URL + "/galleries/awards/" + certificate;

    return (
        <div className='event__banner'>
            <img src={logoPath} alt={logo} className='event__logo'/>
            <div className='awards__container'>
                {awardList.map((award) => (
                    certificate
                        ? <a key={award} href={awardPath} target='_blank' rel='noopener noreferrer'><Award award={award} /></a>
                        : <Award key={award} award={award} />
                ))}
            </div>
        </div>
    );
  }

  export default EventBanner;
