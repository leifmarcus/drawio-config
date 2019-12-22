import React from 'react';
import './CustomColors.css';
import { Headline } from '../Elements/Headline';

export const CustomColors: React.FC = () => {
    // const store = useContext(ConfigurationContext);

    return (
        <div className="CustomColors">
            <Headline type="h2">Custom Colors</Headline>
        </div>
    );
};
