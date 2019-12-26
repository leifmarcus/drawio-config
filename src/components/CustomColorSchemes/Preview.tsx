import React from 'react';
import './Preview.css';

type PreviewProps = {
    fill?: string;
    gradient?: string;
    stroke?: string;
    font?: string;
};

const DEFAULT_TEXT_COLOR = '#000000';

const getBackground = (fill = '', gradient = ''): string => {
    const useFill = fill && fill !== 'none' ? fill : 'transparent';

    if (!gradient || gradient === 'none') {
        return useFill;
    }

    return `linear-gradient(to right, ${useFill}, ${gradient})`;
};

export const Preview: React.FC<PreviewProps> = ({ fill, gradient, stroke, font }) => {
    const border = stroke && stroke !== 'none' ? `1px solid ${stroke}` : 'none';

    const style = {
        background: getBackground(fill, gradient),
        border,
        color: font && font !== 'none' ? font : DEFAULT_TEXT_COLOR,
    };

    return (
        <div className="Preview" style={style}>
            <div className="Preview--box">Preview</div>
        </div>
    );
};
