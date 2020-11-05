import React from 'react';
import { joinClassNames } from '../../../utils/helpers';
import './Headline.css';

type Props = {
    type: 'h1' | 'h2' | 'h3';
    className: string;
};

export const Headline: React.FC<Props> = ({ type, children, className }) => {
    // const store = useContext(ConfigurationContext);

    return React.createElement(
        type,
        {
            className: joinClassNames('Headline', `Headline-${type}`, className),
        },
        children,
    );
};
