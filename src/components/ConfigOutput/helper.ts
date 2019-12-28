import { Configuration, CustomColorSchemes } from '../../state/types';

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

export const convertToDrawIoConfig = (config: Configuration): string => {
    const convertedConfig = {
        ...config,
        customColorSchemes: convertCustomColorSchemes(config.customColorSchemes),
    };

    return JSON.stringify(convertedConfig, null, 2);
};
