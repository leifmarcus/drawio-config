import React from 'react';
import './Content.css';

type Props = any;

export const Content: React.FC<Props> = ({ children }) => {
    return <div className="Content">{children}</div>;
};
