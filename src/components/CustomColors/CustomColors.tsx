import React, { useContext, ReactNode, MouseEventHandler } from 'react';
import './CustomColors.css';
import { ConfigurationContext } from '../../App';
import { CustomPresetColors } from '../../state/types';
import { ColorBox } from '../Elements/ColorBox';
import { Box } from '../Elements/Box';
import { Button } from '../Elements/Button';

type UpdateColor = (index: number) => (color: string) => void;
type DeleteColor = (index: number) => () => void;

const useCustomColors = (): [CustomPresetColors, UpdateColor, DeleteColor] => {
    const store = useContext(ConfigurationContext);
    const state = store.getState();

    const updateColor: UpdateColor = index => (color): void => {
        store.dispatch({
            type: 'UPDATE_CUSTOM_COLOR',
            payload: {
                index: index,
                color: color,
            },
        });
    };

    const deleteColor: DeleteColor = index => () => {
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
    const description: ReactNode =
        'The following colors will be shown in the color overlay in draw.io. Click on a color box to set a new color or click the trashbin to delete a color from the list.';

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
