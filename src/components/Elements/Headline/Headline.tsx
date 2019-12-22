import React from 'react';
import './Headline.css';

type Props = {
    type: 'h1' | 'h2' | 'h3';
};

export const Headline: React.FC<Props> = ({ type, children }) => {
    // const store = useContext(ConfigurationContext);

    return React.createElement(
        type,
        {
            className: `Headline Headline-${type}`,
        },
        children,
    );
};
