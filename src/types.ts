import { ChangeEvent } from 'react';

export type ColorPickerColor = {
    hex: string;
    rgb: {
        r: number;
        g: number;
        b: number;
        a: number;
    };
    hsl: {
        h: number;
        s: number;
        l: number;
        a: number;
    };
};

export type ColorPickerChangeHandler = (color: ColorPickerColor, event: ChangeEvent) => void;
