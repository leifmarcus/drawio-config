import { Configuration, CustomColorSchemes, AppState, CustomFont } from '../../state/types';

/**
 * gradient needs to be removed, otherwise the fill is not shown inside the
 * preset panel. Seems to be a bug in draw.io
 */
const convertCustomColorSchemes = (schemes: CustomColorSchemes): CustomColorSchemes => {
    return schemes.map(group => {
        return group.map(preset => {
            return {
                ...preset,
                gradient: preset?.gradient === 'none' ? undefined : preset?.gradient,
            };
        });
    });
};

const convertCustomFonts = (fonts: Array<CustomFont>): Array<string> => {
    return fonts.map(font => {
        return font.name;
    });
};

const generateFontCss = (fonts: Array<CustomFont>): string => {
    const families = fonts
        .filter(font => font.url?.includes('google'))
        .map(font => font.name.replace(/\s/g, '+'))
        .join('|');

    return families ? `@import url('https://fonts.googleapis.com/css?family=${families}')` : '';
};

export const convertToDrawIoConfig = (config: AppState): string => {
    const convertedConfig: Configuration = {
        ...config,
        customColorSchemes: convertCustomColorSchemes(config.customColorSchemes),
        customFonts: convertCustomFonts(config.customFonts),
        fontCss: generateFontCss(config.customFonts),
    };

    return JSON.stringify(convertedConfig, null, 2);
};
