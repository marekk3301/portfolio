import React, { useState } from 'react';
import "../css/PdfModal.css"

const PdfModal = ({ pdfUrl }) => {
    const [isOpen, setIsOpen] = useState(false);

    // Function to open the modal
    const openModal = () => {
        setIsOpen(true);
    };

    // Function to close the modal
    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <>
            {/* Button to open the modal */}
            <button onClick={openModal}>Open PDF in Modal</button>

            {/* Modal */}
            {isOpen && (
                <div className="modal">
                    <div className="modal-content">
                        {/* Close button */}
                        <span className="close-button" onClick={closeModal}>
                            &times;
                        </span>
                        {/* PDF in iframe */}
                        <iframe
                            src={pdfUrl}
                            title="PDF Viewer"
                            width="100%"
                            height="600px"
                            frameBorder="0"
                        ></iframe>
                    </div>
                </div>
            )}
        </>
    );
};

export default PdfModal;
