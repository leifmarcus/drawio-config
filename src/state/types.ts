import { Dispatch } from 'react';

export type DefaultStyle = {
    [key: string]: undefined | string | number;
    absoluteArcSize?: string;
    arcSize?: string;
    fontFamily?: string;
    fontSize?: string;
    gradientDirection?: 'east' | 'north' | 'west' | 'south';
    rounded?: '0' | '1';
    strokeWidth?: string;
};

export type CustomColorSchema = {
    stroke?: string;
    font?: string;
    fill?: string;
    gradient?: string;
};
export type CustomColorSchemes = Array<Array<CustomColorSchema | null>>;

export type CustomPresetColors = Array<string>;
export type CustomFont = {
    name: string;
    url?: string;
};

export type Configuration = {
    customFonts: Array<string>;
    customPresetColors: CustomPresetColors;
    defaultVertexStyle: DefaultStyle;
    defaultEdgeStyle: DefaultStyle;
    customColorSchemes: CustomColorSchemes;
    fontCss: string;
};

export type AppState = {
    [index: string]: any;
    customFonts: Array<CustomFont>;
    customPresetColors: CustomPresetColors;
    defaultVertexStyle: DefaultStyle;
    defaultEdgeStyle: DefaultStyle;
    customColorSchemes: CustomColorSchemes;
};

type UpdateColorPayload = {
    index: number;
    color: string;
};

type DeleteColorPayload = {
    index: number;
};

type DeleteSchemaGroup = {
    groupIndex: number;
};

type UpdateColorSchema = {
    groupIndex: number;
    schemaIndex: number;
    schema: CustomColorSchema;
};

type UpdateCustomFont = CustomFont & {
    index: number;
};

type UpdateStylePayload = {
    name: keyof DefaultStyle;
    value: string;
    type: 'Edge' | 'Vertex';
};

export type Action = {
    type: string;
    payload?:
        | UpdateColorPayload
        | DeleteColorPayload
        | UpdateColorSchema
        | DeleteSchemaGroup
        | UpdateCustomFont
        | UpdateStylePayload;
};

export type ConfigReducer<S, A> = (prevState: S, action: A) => S;

export type ConfigStore<S> = Readonly<{
    getState: () => S;
    dispatch: Dispatch<Action>;
}>;

export type UseConfigStore<S> = () => ConfigStore<S>;
