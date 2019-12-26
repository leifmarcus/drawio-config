import React, { useContext } from 'react';
import './ColorOutput.css';
import { ColorBox } from '../Elements/ColorBox';
import { CustomPresetColors, CustomColorSchema } from '../../state/types';
import { ConfigurationContext } from '../../App';

type ColorOutputProps = {
    type: keyof CustomColorSchema;
    color?: string;
    onChange: (type: ColorOutputProps['type'], color: string) => void;
    onDelete?: (type: ColorOutputProps['type'], color: string) => void;
};

const useCustomColors = (): [CustomPresetColors] => {
    const store = useContext(ConfigurationContext);
    const state = store.getState();

    return [state.customPresetColors.map(color => `#${color}`)];
};

export const ColorOutput: React.FC<ColorOutputProps> = ({ type, color, onChange }) => {
    const [presetColors] = useCustomColors();

    const handleChange = (color: string): void => {
        onChange(type, `#${color}`);
    };

    const handleDelete = (): void => {
        onChange(type, 'none');
    };

    const colorValue = color?.replace('#', '') || 'ffffff';

    return (
        <div className="ColorOutput">
            <div className="ColorOutput--color">
                <ColorBox
                    className="ColorOutput--colorBox"
                    color={colorValue}
                    onChange={handleChange}
                    onDelete={handleDelete}
                    showDelete={false}
                    presetColors={presetColors}
                />
            </div>
            <div className="ColorOutput--title" onClick={handleDelete}>
                {type}
            </div>
        </div>
    );
};
