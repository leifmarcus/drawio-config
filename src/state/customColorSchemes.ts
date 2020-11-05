import cloneDeep from 'lodash/cloneDeep';
import get from 'lodash/get';
import { Action, ConfigReducer, CustomColorSchemes } from './types';

const NEW_PRESET = { fill: 'none', font: '#000000', gradient: 'none', stroke: '#000000' };
const RESET_PRESET = null;

export const customColorSchemesReducer: ConfigReducer<CustomColorSchemes, Action> = (state, action) => {
    const groupIndex = get(action, 'payload.groupIndex');
    const schemaIndex = get(action, 'payload.schemaIndex');

    switch (action.type) {
        case 'UPDATE_CUSTOM_COLOR_SCHEMA': {
            const clonedState = cloneDeep(state);

            clonedState[groupIndex][schemaIndex] = get(action, 'payload.schema');

            return clonedState;
        }
        case 'DELETE_CUSTOM_COLOR_SCHEMA': {
            return state.map((groups, gi) => {
                if (gi === groupIndex) {
                    return groups.filter((schemes, si) => {
                        return si !== schemaIndex;
                    });
                }

                return groups;
            });
        }
        case 'ADD_SCHEMA_PRESET': {
            const clonedState = cloneDeep(state);

            clonedState[groupIndex] = [...clonedState[groupIndex], NEW_PRESET];

            return clonedState;
        }
        case 'DELETE_SCHEMA_GROUP': {
            return state.filter((groups, index) => index !== groupIndex);
        }
        case 'ADD_SCHEMA_GROUP': {
            return [...state, [RESET_PRESET, NEW_PRESET]];
        }
        default:
            return state;
    }
};
