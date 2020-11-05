import React, { useEffect, useState } from 'react';
import { ColorChangeHandler, SketchPicker } from 'react-color';
import { joinClassNames } from '../../../utils/helpers';
import './ColorBox.css';
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

export const ColorBox: React.FC<ColorBoxProps> = ({
    showDelete,
    presetColors,
    color,
    onChange,
    className,
    onDelete,
}) => {
    // const usedColor = color === 'none' ? 'ffffff' : color;
    const [stateColor, handleColorChange] = useColorInput(color, onChange);
    const [isOpen, setIsOpen] = useState(INITIAL_PICKER_STATE);
    const isWhite = stateColor && (stateColor.toLowerCase() === 'fff' || stateColor.toLowerCase() === 'ffffff');

    const style = {
        backgroundColor: `#${stateColor}`,
        border: isWhite ? '1px solid #dadce0' : 'none',
    };

    const isNone = stateColor === 'none';

    const colorClassNames = joinClassNames('ColorBox--color', isNone && 'ColorBox--color--isNone');

    return (
        <div className={joinClassNames('ColorBox', className)} style={style}>
            {showDelete && (
                <div className="ColorBox--actions">
                    <button className="ColorBox--delete" onClick={(): void => onDelete()} />
                </div>
            )}
            <div className={colorClassNames} onClick={(): void => setIsOpen(!isOpen)}></div>
            {isOpen && (
                <div className="ColorBox--popover">
                    <div className="ColorBox--cover" onClick={(): void => setIsOpen(INITIAL_PICKER_STATE)} />
                    <SketchPicker presetColors={presetColors} color={stateColor} onChange={handleColorChange} />
                </div>
            )}
        </div>
    );
};

ColorBox.defaultProps = {
    showDelete: true,
};
