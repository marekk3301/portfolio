import React from 'react';

import "../css/Lists.css"

const Authors = ({ team }) => {
    team = team.split(', ');
    return (
        <div>
            <ul className='authors__list'>
                {
                    team.map((author, index) => (
                        author !== '' && <li key={index}>{author}</li>
                    ))
                }
                <li>Marek Kudła</li>
            </ul>
        </div>
    );
  }
  
  export default Authors;