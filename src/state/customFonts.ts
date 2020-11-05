import get from 'lodash/get';
import { Action, ConfigReducer, CustomFont } from './types';

export const customFontsReducer: ConfigReducer<Array<CustomFont>, Action> = (state, action) => {
    switch (action.type) {
        case 'UPDATE_CUSTOM_FONT': {
            const index = get(action, 'payload.index');
            const name = get(action, 'payload.name');
            const url = get(action, 'payload.url');

            return state.map((font, i) => {
                if (index !== i) {
                    return font;
                }

                return {
                    name,
                    url,
                };
            });
        }
        case 'DELETE_CUSTOM_FONT': {
            const newState = [...state];

            const index = get(action, 'payload.index');

            return newState.filter((_unused_, i) => {
                return i !== index;
            });
        }
        case 'ADD_CUSTOM_FONT': {
            return [...state, { name: 'Helvetica' }];
        }
        default:
            return state;
    }
};
