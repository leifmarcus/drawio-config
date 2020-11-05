import get from 'lodash/get';
import { Action, ConfigReducer, CustomPresetColors } from './types';

export const customPresetColorsReducer: ConfigReducer<CustomPresetColors, Action> = (state, action) => {
    switch (action.type) {
        case 'UPDATE_CUSTOM_COLOR': {
            const newState = [...state];

            const index = get(action, 'payload.index');
            const color = get(action, 'payload.color');

            newState[index] = color;

            return newState;
        }
        case 'DELETE_CUSTOM_COLOR': {
            const newState = [...state];

            const index = get(action, 'payload.index');

            return newState.filter((_unused_, i) => {
                return i !== index;
            });
        }
        default:
            return state;
    }
};
