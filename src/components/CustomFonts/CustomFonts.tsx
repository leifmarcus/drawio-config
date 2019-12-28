import React, { useContext } from 'react';
import './CustomFonts.css';
import { Box } from '../Elements/Box';
import { CustomFont } from '../../state/types';
import { ConfigurationContext } from '../../App';
import { FontBox } from './FontBox';

type CustomFontsProps = {};
type UpdateFont = (index: number) => (font: CustomFont) => void;
type DeleteFont = (index: number) => () => void;

const useCustomFonts = (): [Array<CustomFont>, UpdateFont, DeleteFont] => {
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

    const deleteFont: DeleteFont = index => (): void => {
        store.dispatch({
            type: 'DELETE_CUSTOM_FONT',
            payload: {
                index: index,
            },
        });
    };

    return [state.customFonts, updateFont, deleteFont];
};

export const CustomFonts: React.FC<CustomFontsProps> = ({}) => {
    const [customFonts, updateFont] = useCustomFonts();

    return (
        <Box title="Custom Fonts" description="Work in progress …" footer={''}>
            <div className="CustomFonts">
                {customFonts.map((font, index) => {
                    return <FontBox key={`customFont-${index}`} {...font} onChange={updateFont(index)} />;
                })}
            </div>
        </Box>
    );
};
