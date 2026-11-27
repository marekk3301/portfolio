import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Esc key button + breadcrumbs. Pressing Escape on the keyboard goes to the same place as the button.
const Topbar = ({ back, backLabel, crumbs }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape") navigate(back);
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [back, navigate]);

    return (
        <div className="topbar">
            <Link className="esc" to={back} aria-label={backLabel}>Esc</Link>
            <nav className="crumbs mono dim" aria-label="Breadcrumbs">
                {crumbs.map((crumb, i) => (
                    <React.Fragment key={i}>
                        {i > 0 && <span aria-hidden="true">/</span>}
                        {crumb.to ? <Link to={crumb.to}>{crumb.label}</Link> : <span>{crumb.label}</span>}
                    </React.Fragment>
                ))}
            </nav>
        </div>
    );
};

export default Topbar;
