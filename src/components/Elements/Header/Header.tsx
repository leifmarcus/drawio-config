import React from 'react';
import './Header.css';

export const Header: React.FC = () => {
    // const store = useContext(ConfigurationContext);

    return (
        <div className="Header">
            <img className="Header--logo" src="/drawio-config-logo.svg" alt="Draw.io Configuration Logo" />
            <h1>diagrams.net Configuration</h1>
        </div>
    );
};
