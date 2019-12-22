import React, { useState, ChangeEventHandler, useEffect } from 'react';
import './ColorBox.css';
import { joinClassNames } from '../../../utils/helpers';
import { CompactPicker, ColorChangeHandler } from 'react-color';
import { ColorBoxProps, OnChange } from './types';

const useColorInput = (initialColor: string, onChange: OnChange): [string, ColorChangeHandler] => {
    const [color, setColor] = useState(initialColor);

    useEffect(() => {
        setColor(initialColor);
    }, [initialColor]);

    const handleColorChange: ColorChangeHandler = (cpColor): void => {
        const colorValue = cpColor.hex.replace('#', '');
        setColor(colorValue);
        onChange(colorValue);
    };

    return [color, handleColorChange];
};

const INITIAL_PICKER_STATE = false;

export const ColorBox: React.FC<ColorBoxProps> = ({ color, onChange, className, onDelete }) => {
    const [stateColor, handleColorChange] = useColorInput(color, onChange);
    const [isOpen, setIsOpen] = useState(INITIAL_PICKER_STATE);
    const isWhite = stateColor && (stateColor.toLowerCase() === 'fff' || stateColor.toLowerCase() === 'ffffff');

    const style = {
        backgroundColor: `#${stateColor}`,
        border: isWhite ? '1px solid #dadce0' : 'none',
    };

    return (
        <div className={joinClassNames('ColorBox', className)} style={style}>
            <div className="ColorBox--actions">
                <button className="ColorBox--delete" onClick={() => onDelete()} />
            </div>
            <div className="ColorBox--color" onClick={() => setIsOpen(!isOpen)}></div>
            {isOpen && (
                <div className="ColorBox--popover">
                    <div className="ColorBox--cover" onClick={() => setIsOpen(INITIAL_PICKER_STATE)} />
                    <CompactPicker color={stateColor} onChange={handleColorChange} />
                </div>
            )}
        </div>
    );
};
