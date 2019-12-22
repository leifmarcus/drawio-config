import React from 'react';
import './ColorBox.css';

type Props = {
    color: string;
    index: number;
};

export const ColorBox: React.FC<Props> = ({ color }) => {
    let outputColor = color;

    if (!color) {
        outputColor = 'FFFFFF';
    }

    const style = {
        backgroundColor: `#${outputColor}`,
    };

    return (
        <div className="ColorBox" style={style}>
            <div className="ColorBox--color">#{outputColor}</div>
        </div>
    );
};
