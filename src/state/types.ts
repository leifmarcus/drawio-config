import { Dispatch } from 'react';

type DefaultStyle = {
    absoluteArcSize?: string;
    arcSize?: string;
    fontFamily?: string;
    fontSize?: number;
    gradientDirection?: 'east' | 'north' | 'west' | 'south';
    rounded?: '0' | '1';
    strokeWidth?: number;
};
type CustomColorSchema = Array<null | {
    stroke?: string;
    font?: string;
    fill?: string;
    gradient?: string;
}>;
type CustomColorSchemes = Array<CustomColorSchema>;

export type CustomPresetColors = Array<string>;
export type CustomFonts = Array<string>;

export type Configuration = {
    customFonts: CustomFonts;
    customPresetColors: CustomPresetColors;
    defaultVertexStyle: DefaultStyle;
    defaultEdgeStyle: DefaultStyle;
    customColorSchemes: CustomColorSchemes;
};

export type Action = {
    type: string;
    payload: string | object | [];
};

export type ConfigReducer<S, A> = (prevState: S, action: A) => S;

export type ConfigStore<S> = Readonly<{
    getState: () => S;
    dispatch: Dispatch<Action>;
}>;

export type UseConfigStore<S> = () => ConfigStore<S>;
