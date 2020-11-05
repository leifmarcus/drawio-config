import { customColorSchemesReducer } from './customColorSchemes';
import { customFontsReducer } from './customFonts';
import { customPresetColorsReducer } from './customPresetColors';
import { defaultEdgeStyle } from './defaultEdgeStyle';
import { defaultVertexStyle } from './defaultVertexStyle';
import { Action, AppState, ConfigReducer } from './types';

export const configReducer: ConfigReducer<AppState, Action> = (state, action) => {
    return {
        customPresetColors: customPresetColorsReducer(state.customPresetColors, action),
        customFonts: customFontsReducer(state.customFonts, action),
        customColorSchemes: customColorSchemesReducer(state.customColorSchemes, action),
        defaultVertexStyle: defaultVertexStyle(state.defaultVertexStyle, action),
        defaultEdgeStyle: defaultEdgeStyle(state.defaultEdgeStyle, action),
    };
};

export const initialConfig: AppState = {
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
    customFonts: [
        {
            name: 'Segoe UI',
        },
        {
            name: 'Segoe Script',
        },
        {
            name: 'Open Sans',
            url: 'https://fonts.googleapis.com/css?family=Open+Sans',
        },
    ],
    customColorSchemes: [
        [
            null,
            {
                fill: '#E6D0DE',
                gradient: 'none',
                stroke: '#CDA2BE',
                font: '#B5739D',
            },
            {
                fill: '#d4e1f5',
                gradient: 'none',
                stroke: '#a9c4eb',
                font: '#7ea6e0',
            },
            {
                fill: '#d5e8d4',
                gradient: 'none',
                stroke: '#9ac7bf',
                font: '#67ab9f',
            },
            {
                fill: '#e1d5e7',
                gradient: 'none',
                stroke: '#c3abd0',
                font: '#a680b8',
            },
            {
                fill: '#fff4c3',
                gradient: 'none',
                stroke: '#ffce9f',
                font: '#ffb570',
            },
            {
                fill: '#d5e8d4',
                gradient: 'none',
                stroke: '#b9e0a5',
                font: '#70a057',
            },
        ],
        [
            null,
            {
                fill: 'none',
                gradient: 'none',
                stroke: '#7ea6e0',
                font: '#7ea6e0',
            },
            {
                fill: 'none',
                gradient: 'none',
                stroke: '#a680b8',
                font: '#a680b8',
            },
            {
                fill: 'none',
                gradient: 'none',
                stroke: '#ea6b66',
                font: '#ea6b66',
            },
            {
                fill: 'none',
                gradient: 'none',
                stroke: '#67ab9f',
                font: '#67ab9f',
            },
            {
                fill: 'none',
                gradient: 'none',
                stroke: '#ffd966',
                font: '#f4bc1b',
            },
            {
                fill: 'none',
                gradient: 'none',
                stroke: '#ffb570',
                font: '#ffb570',
            },
        ],
    ],
    defaultVertexStyle: {
        fontFamily: 'Segoe UI',
        fontSize: '12',
        strokeWidth: '1',
        arcSize: '10',
        absoluteArcSize: '1',
        rounded: '1',
        shadow: '0',
        comic: '0',
    },
    defaultEdgeStyle: {
        fontFamily: 'Segoe UI',
        fontSize: '15',
        strokeWidth: '1',
        arcSize: '10',
        absoluteArcSize: '1',
        rounded: '1',
        shadow: '0',
        comic: '0',
    },
};

export const getInitialConfig = (): AppState => {
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
