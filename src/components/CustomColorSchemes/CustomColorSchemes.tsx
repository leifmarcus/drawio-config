import React, { ReactNode, useContext } from 'react';
import { ConfigurationContext } from '../../App';
import { CustomColorSchema, CustomColorSchemes } from '../../state/types';
import { Box } from '../Elements/Box';
import { Button } from '../Elements/Button';
import './CustomColorSchemes.css';
import { Schema } from './Schema';

type CustomColorSchemesProps = any;
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

    const deleteGroup: DeleteSchemaGroup = (groupIndex) => (): void => {
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

    const addPreset: AddNewPreset = (groupIndex) => (): void => {
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

    const description: ReactNode = (
        <div>
            Color schemes will be shown in diagrams.net on the right top in the preset panel. Here you are able to
            configure custom presets. Presets can be organized in different slides. Click the color boxes next to the
            preview to change the color. By clicking the label, the color get’s removed. (draw.io 9.2.4 and later)
        </div>
    );

    return (
        <Box title="Custom Color Schemes" footer={addNewGroup} description={description}>
            <div className="CustomColorSchemes">
                {colorSchemes.map((group, groupIndex) => {
                    return [
                        <div key="delete" className="CustomColorSchemes--actions">
                            <a
                                className="CustomColorSchemes--delete"
                                title="Delete Slide"
                                onClick={deleteGroup(groupIndex)}
                            >
                                ×
                            </a>
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
