import React from 'react';
import { useParams } from 'react-router-dom';

import Monitors from '../components/Monitors';

// import "../css/MainPage.css"

const MainPage = () => {
    
    return (
        <div className=''>
            <Monitors></Monitors>
        </div>
    );
};

export default MainPage;