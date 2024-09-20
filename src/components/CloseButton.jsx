import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/CloseButton.css';

const CloseButton = () => {
    const navigate = useNavigate();

    // Handle the click event to navigate back to the main page
    const handleClose = () => {
        navigate('/');
    };

    return (
        <div>
            <button className="close-button" onClick={handleClose}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="83.44"
                    height="81.9"
                    viewBox="0 0 91.08 89.4"
                    fill="none"
                >
                    <path class="cls-2" d="M70.64,84.32c-14.74,8.63-30.37,4.1-37.48,2.04-7-2.03-24.28-7.04-30.81-22.74-5.47-13.15-.15-26.05,3.22-34.27,3.27-7.98,7.91-19.31,20.2-25.51,15.28-7.71,30.66-1.6,33.37-.46,8.77,3.69,14,9.67,18.65,14.98,4.47,5.11,9.6,10.97,11.92,18.96,4.57,15.7-2.41,37.26-19.07,47.01Z" fill="#ffffff"/>
                    <path class="cls-1" d="M50.49,44.7l13.42-13.42c1.37-1.37,1.37-3.58,0-4.95-1.37-1.37-3.58-1.37-4.95,0l-13.42,13.42-13.42-13.42c-1.37-1.37-3.58-1.37-4.95,0-1.37,1.37-1.37,3.58,0,4.95l13.42,13.42-13.42,13.42c-1.37,1.37-1.37,3.58,0,4.95.68.68,1.58,1.02,2.47,1.02s1.79-.34,2.47-1.02l13.42-13.42,13.42,13.42c.68.68,1.58,1.02,2.47,1.02s1.79-.34,2.47-1.02c1.37-1.37,1.37-3.58,0-4.95l-13.42-13.42Z" fill="#000000"/>
                </svg>
            </button>
            <div className="close-button-margin"></div>
        </div>
    );
};

export default CloseButton;
