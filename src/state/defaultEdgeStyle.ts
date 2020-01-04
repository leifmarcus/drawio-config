import { Action, ConfigReducer, DefaultStyle } from './types';
import get from 'lodash/get';

export const defaultEdgeStyle: ConfigReducer<DefaultStyle, Action> = (state, action) => {
    const styleType = get(action, 'payload.type');
    console.log(styleType);
    if (styleType !== 'Edge') {
        return state;
    }

    switch (action.type) {
        case 'UPDATE_DEFAULT_STYLE': {
            const name = get(action, 'payload.name');
            const value = get(action, 'payload.value');

            return {
                ...state,
                [name]: value,
            };
        }
        default:
            return state;
    }
};
