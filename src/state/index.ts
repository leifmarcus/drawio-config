import { customPresetColorsReducer } from './customPresetColors';
import { Configuration, Action, ConfigReducer } from './types';
import { customFontsReducer } from './customFonts';

export const configReducer: ConfigReducer<Configuration, Action> = (state, action) => {
    return {
        customPresetColors: customPresetColorsReducer(state.customPresetColors, action),
        customFonts: customFontsReducer(state.customFonts, action),
        defaultVertexStyle: {},
        defaultEdgeStyle: {},
        customColorSchemes: [],
    };
};

export const initialConfig: Configuration = {
    customPresetColors: [
        'E6D0DE',
        'CDA2BE',
        'B5739D',
        'E1D5E7',
        'C3ABD0',
        'A680B8',
        'D4E1F5',
        'A9C4EB',
        '7EA6E0',
        'D5E8D4',
        '9AC7BF',
        '67AB9F',

        'D5E8D4',
        'B9E0A5',
        '97D077',
        'FFF2CC',
        'FFE599',
        'FFD966',
        'FFF4C3',
        'FFCE9F',
        'FFB570',
        'F8CECC',
        'F19C99',
        'EA6B66',
    ],
    customFonts: [],
    defaultVertexStyle: {},
    defaultEdgeStyle: {},
    customColorSchemes: [],
};

export const getInitialConfig = (): Configuration => {
    const savedConfig = localStorage.getItem('drawioconfig');
    if (!savedConfig) {
        return initialConfig;
    }
    try {
        return JSON.parse(savedConfig);
    } catch (error) {
        console.log(error);
        return initialConfig;
    }
};
