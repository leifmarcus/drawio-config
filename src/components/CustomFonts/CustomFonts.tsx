import React, { useContext, ReactNode } from 'react';
import './CustomFonts.css';
import { Box } from '../Elements/Box';
import { CustomFont } from '../../state/types';
import { ConfigurationContext } from '../../App';
import { FontBox } from './FontBox';
import { Button } from '../Elements/Button';

type CustomFontsProps = {};
type UpdateFont = (index: number) => (font: CustomFont) => void;
type DeleteFont = (index: number) => () => void;
type AddFont = () => void;

const useCustomFonts = (): [Array<CustomFont>, UpdateFont, DeleteFont, AddFont] => {
    const store = useContext(ConfigurationContext);
    const state = store.getState();

    const updateFont: UpdateFont = index => (font: CustomFont): void => {
        store.dispatch({
            type: 'UPDATE_CUSTOM_FONT',
            payload: {
                index,
                ...font,
            },
        });
    };

    const addFont: AddFont = (): void => {
        store.dispatch({
            type: 'ADD_CUSTOM_FONT',
        });
    };

    const deleteFont: DeleteFont = index => (): void => {
        store.dispatch({
            type: 'DELETE_CUSTOM_FONT',
            payload: {
                index: index,
            },
        });
    };

    return [state.customFonts, updateFont, deleteFont, addFont];
};

export const CustomFonts: React.FC<CustomFontsProps> = ({}) => {
    const [customFonts, updateFont, deleteFont, addFont] = useCustomFonts();

    const addNewFont: ReactNode = (
        <div>
            <Button onClick={addFont}>add new font</Button>;
        </div>
    );

    const description: ReactNode = (
        <div>
            Custom Fonts will be shown inside the font selection dropdown in draw.io. If you want to use Google fonts,
            you need to make sure that the font will be loaded when working with draw.io. Your Font might be a custom
            font, that is defined in a CSS file on any server. In order to add a custom font, you need to specify the
            url to a css file that defines the font. (draw.io 9.2.4 and later)
        </div>
    );

    return (
        <Box title="Custom Fonts" description={description} footer={addNewFont}>
            <div className="CustomFonts">
                {customFonts.map((font, index) => {
                    return (
                        <FontBox
                            key={`customFont-${index}`}
                            {...font}
                            onChange={updateFont(index)}
                            onDelete={deleteFont(index)}
                        />
                    );
                })}
            </div>
        </Box>
    );
};
