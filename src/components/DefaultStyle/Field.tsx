import React, { ChangeEventHandler, useEffect, useState } from 'react';
import { Switch, SwitchChangeHandler } from '../Elements/Switch/Switch';
import { UpdateStyleHandler } from './DefaultStyle';
import './Field.css';
import { FormFieldType } from './values';

type FieldProps = {
    type: FormFieldType;
    name: string;
    label?: string;
    value?: string;
    onChange: UpdateStyleHandler;
};

const useFieldUpdate = (
    initialValue = '',
    name: string,
    type: FormFieldType,
    onChange: UpdateStyleHandler,
): [string, ChangeEventHandler, SwitchChangeHandler] => {
    const [currValue, setCurrValue] = useState(initialValue);

    useEffect(() => {
        setCurrValue(initialValue);
    }, [initialValue]);

    const handleFieldChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        const updatedValue = event.target.value;
        if (type === 'number' && !Number.isNaN(Number(updatedValue))) {
            setCurrValue(updatedValue);
            onChange(name, updatedValue);
        } else if (type !== 'number') {
            setCurrValue(updatedValue);
            onChange(name, updatedValue);
        }
    };

    const handleSwitchChange: SwitchChangeHandler = (value) => {
        const updatedValue = value ? '1' : '0';
        setCurrValue(updatedValue);
        onChange(name, updatedValue);
    };

    return [currValue, handleFieldChange, handleSwitchChange];
};

export const Field: React.FC<FieldProps> = ({ type, label, name, value, onChange }) => {
    const [currValue, handleChange, handleSwitchChange] = useFieldUpdate(value, name, type, onChange);

    return (
        <div className="Field">
            {label && <label className="Field--label">{label}</label>}
            {(type === 'text' || type === 'number') && (
                <input type="text" name={name} value={currValue} onChange={handleChange} />
            )}
            {type === 'boolean' && <Switch value={currValue === '1'} onChange={handleSwitchChange} />}
        </div>
    );
};
