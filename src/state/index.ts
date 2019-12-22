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
        'FFFFFF',
        'FFFFFF',
        'FFFFFF',
        'FFFFFF',
        'FFFFFF',
        'FFFFFF',
        'FFFFFF',
        'FFFFFF',
        'FFFFFF',
        'FFFFFF',
        'FFFFFF',
        'FFFFFF',
        'FFFFFF',
        'FFFFFF',
        'FFFFFF',
        'FFFFFF',
        'FFFFFF',
        'FFFFFF',
        'FFFFFF',
        'FFFFFF',
        'FFFFFF',
        'FFFFFF',
        'FFFFFF',
        'FFFFFF',
    ],
    customFonts: [],
    defaultVertexStyle: {},
    defaultEdgeStyle: {},
    customColorSchemes: [],
};
