import React, { useContext, ReactNode } from 'react';
import './CustomColorSchemes.css';
import { Box } from '../Elements/Box';
import { CustomColorSchemes, CustomColorSchema } from '../../state/types';
import { ConfigurationContext } from '../../App';
import { Schema } from './Schema';
import { Button } from '../Elements/Button';

type CustomColorSchemesProps = {};
type UpdateColorSchema = (groupIndex: number, schemaIndex: number) => (schema: CustomColorSchema) => void;
type DeleteColorSchema = (groupIndex: number, schemaIndex: number) => () => void;
type DeleteSchemaGroup = (groupIndex: number) => () => void;
type AddNewSchemaGroup = () => void;
type AddNewPreset = (groupIndex: number) => () => void;

const useCustomColorSchemes = (): [
    CustomColorSchemes,
    UpdateColorSchema,
    DeleteColorSchema,
    DeleteSchemaGroup,
    AddNewSchemaGroup,
    AddNewPreset,
] => {
    const store = useContext(ConfigurationContext);
    const state = store.getState();

    const updateSchema: UpdateColorSchema = (groupIndex, schemaIndex) => (schema): void => {
        store.dispatch({
            type: 'UPDATE_CUSTOM_COLOR_SCHEMA',
            payload: {
                groupIndex,
                schemaIndex,
                schema,
            },
        });
    };

    const deleteSchema: DeleteColorSchema = (groupIndex, schemaIndex) => (): void => {
        store.dispatch({
            type: 'DELETE_CUSTOM_COLOR_SCHEMA',
            payload: {
                groupIndex,
                schemaIndex,
                schema: {},
            },
        });
    };

    const deleteGroup: DeleteSchemaGroup = groupIndex => (): void => {
        store.dispatch({
            type: 'DELETE_SCHEMA_GROUP',
            payload: {
                groupIndex,
            },
        });
    };

    const addNewSchemaGroup: AddNewSchemaGroup = () => {
        store.dispatch({
            type: 'ADD_SCHEMA_GROUP',
        });
    };

    const addPreset: AddNewPreset = groupIndex => (): void => {
        store.dispatch({
            type: 'ADD_SCHEMA_PRESET',
            payload: {
                groupIndex,
            },
        });
    };

    return [state.customColorSchemes, updateSchema, deleteSchema, deleteGroup, addNewSchemaGroup, addPreset];
};

export const CustomColorSchemesComponent: React.FC<CustomColorSchemesProps> = ({}) => {
    const [colorSchemes, updateSchema, deleteSchema, deleteGroup, addGroup, addPreset] = useCustomColorSchemes();

    const addNewGroup: ReactNode = (
        <div>
            <Button onClick={addGroup}>add new preset slide</Button>;
        </div>
    );

    const description: ReactNode =
        'Color schemes are shown in draw.io inside the editor on the right top. Here you are able to add custom presets.';

    return (
        <Box title="Custom Color Schemes" footer={addNewGroup} description={description}>
            <div className="CustomColorSchemes">
                {colorSchemes.map((group, groupIndex) => {
                    return [
                        <div key="delete" className="CustomColorSchemes--delete">
                            <a onClick={deleteGroup(groupIndex)}>delete Group</a>
                        </div>,
                        <div className="CustomColorSchemes--group" key={`group-${groupIndex}`}>
                            {group.map((colorSchema, schemaIndex) => {
                                return (
                                    <Schema
                                        key={`schema-${schemaIndex}`}
                                        {...colorSchema}
                                        onDelete={deleteSchema(groupIndex, schemaIndex)}
                                        onChange={updateSchema(groupIndex, schemaIndex)}
                                    />
                                );
                            })}
                            <div className="CustomColorSchemes--new">
                                <Button onClick={addPreset(groupIndex)}>Add Preset</Button>
                            </div>
                        </div>,
                    ];
                })}
            </div>
        </Box>
    );
};
