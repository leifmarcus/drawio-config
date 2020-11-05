import React, { MouseEventHandler, ReactNode, useContext } from 'react';
import { ConfigurationContext } from '../../App';
import { CustomPresetColors } from '../../state/types';
import { Box } from '../Elements/Box';
import { Button } from '../Elements/Button';
import { ColorBox } from '../Elements/ColorBox';
import './CustomColors.css';

type UpdateColor = (index: number) => (color: string) => void;
type DeleteColor = (index: number) => () => void;

const useCustomColors = (): [CustomPresetColors, UpdateColor, DeleteColor] => {
    const store = useContext(ConfigurationContext);
    const state = store.getState();

    const updateColor: UpdateColor = (index) => (color): void => {
        store.dispatch({
            type: 'UPDATE_CUSTOM_COLOR',
            payload: {
                index: index,
                color: color,
            },
        });
    };

    const deleteColor: DeleteColor = (index) => (): void => {
        store.dispatch({
            type: 'DELETE_CUSTOM_COLOR',
            payload: {
                index: index,
            },
        });
    };

    return [state.customPresetColors, updateColor, deleteColor];
};

export const CustomColors: React.FC = () => {
    const [colors, updateColor, deleteColor] = useCustomColors();

    const handleAddNewUpdate: MouseEventHandler = () => {
        const newIndex = colors.length;
        updateColor(newIndex)('ffffff');
    };

    const addNewButton: ReactNode = <Button onClick={handleAddNewUpdate}>add new color</Button>;
    const description: ReactNode = (
        <div>
            The following colors will be shown in the color picker in draw.io. Click on a color box to set a new color
            or click the trash bin to delete a color from the list. (draw.io 9.2.5 and later)
        </div>
    );

    return (
        <Box title="Custom Preset Colors" footer={addNewButton} description={description}>
            <div className="CustomColors--palette">
                {colors.map((color, i) => {
                    return (
                        <ColorBox
                            key={`color-${i}`}
                            className="CustomColors--item"
                            color={color}
                            onChange={updateColor(i)}
                            onDelete={deleteColor(i)}
                        />
                    );
                })}
            </div>
        </Box>
    );
};
