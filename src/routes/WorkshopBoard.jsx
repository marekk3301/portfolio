import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/WorkshopBoard.css';

const FIGJAM_EMBED_URL =
  'https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fboard%2FIMKlzjwffqrxZfdp9zIjhf%2FWorkshop%3Fnode-id%3D0-1%26t%3DpEWoSDG4NBsJii3I-1';

const FIGJAM_DIRECT_URL =
  'https://www.figma.com/board/IMKlzjwffqrxZfdp9zIjhf/Workshop?node-id=0-1&t=pEWoSDG4NBsJii3I-1';

const WorkshopBoard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const prevTitle = document.title;
    document.title = 'Workshop Inspirations // FigJam';
    return () => {
      document.title = prevTitle;
    };
  }, []);

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/craft');
    }
  };

  return (
    <div className="workshop-board-page">
      {/* Top Floating Controls */}
      <div className="workshop-board-controls">
        <button onClick={handleBack} className="board-btn board-back-btn" aria-label="Go back">
          ← BACK
        </button>
        <a
          href={FIGJAM_DIRECT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="board-btn board-open-btn"
          aria-label="Open directly in Figma"
        >
          OPEN IN FIGJAM ↗
        </a>
      </div>

      {/* Embedded FigJam Canvas */}
      <div className="workshop-board-frame-container">
        <iframe
          className="workshop-board-iframe"
          title="Workshop and Project Inspirations Board"
          src={FIGJAM_EMBED_URL}
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default WorkshopBoard;

