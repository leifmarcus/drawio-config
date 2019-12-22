import React, { useContext } from 'react';
import './CustomColors.css';
import { Headline } from '../Elements/Headline';
import { ConfigurationContext } from '../../App';
import { Configuration } from '../../state/types';
import { ColorBox } from '../Elements/ColorBox';

const useCustomColors = (): Array<Configuration['customPresetColors']> => {
    const store = useContext(ConfigurationContext);
    const state = store.getState();
    return [state.customPresetColors];
};

export const CustomColors: React.FC = () => {
    const [colors] = useCustomColors();
    return (
        <div className="CustomColors">
            <Headline type="h2">Custom Colors</Headline>
            <div className="CustomColors--palette">
                {colors.map((color, i) => {
                    return <ColorBox key={`color-${i}`} color={color} index={i} />;
                })}
            </div>
        </div>
    );
};
