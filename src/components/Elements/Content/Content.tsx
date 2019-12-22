import React from 'react';
import './Content.css';

type Props = {};

export const Content: React.FC<Props> = ({ children }) => {
    return <div className="Content">{children}</div>;
};
