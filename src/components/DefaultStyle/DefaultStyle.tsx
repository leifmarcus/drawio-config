import startCase from 'lodash/startCase';
import React, { ReactNode, useContext } from 'react';
import { ConfigurationContext } from '../../App';
import { DefaultStyle } from '../../state/types';
import { Box } from '../Elements/Box';
import './DefaultStyle.css';
import { Field } from './Field';
import { formFields } from './values';

type DefaultStyleProps = {
    type: 'Edge' | 'Vertex';
};

export type UpdateStyleHandler = (name: keyof DefaultStyle, value: string) => void;

const useDefaultStyle = (type: DefaultStyleProps['type']): [DefaultStyle, UpdateStyleHandler] => {
    const store = useContext(ConfigurationContext);
    const state = store.getState();

    const defaultStyle = state[`default${type}Style`] as DefaultStyle;

    const updateStyle: UpdateStyleHandler = (name, value): void => {
        store.dispatch({
            type: 'UPDATE_DEFAULT_STYLE',
            payload: {
                type,
                name,
                value,
            },
        });
    };

    return [defaultStyle, updateStyle];
};

export const DefaultStyleComponent: React.FC<DefaultStyleProps> = ({ type }) => {
    const [defaultStyle, updateDefaultStyle] = useDefaultStyle(type);

    const defaultStyleEntries = Object.entries(formFields);

    const description: ReactNode = <div></div>;

    return (
        <Box title={`Default ${type} Style`} description={description} footer={''}>
            <div className="DefaultStyle">
                {defaultStyleEntries.map(([name, formField]) => {
                    return (
                        <Field
                            key={name}
                            type={formField.type}
                            onChange={updateDefaultStyle}
                            name={name}
                            label={startCase(name)}
                            value={defaultStyle[name]?.toString()}
                        />
                    );
                })}
            </div>
        </Box>
    );
};
