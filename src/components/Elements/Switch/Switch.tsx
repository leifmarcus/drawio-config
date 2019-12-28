import React, { FC, useState, ChangeEventHandler } from 'react';
import './Switch.css';
import { joinClassNames } from '../../../utils/helpers';

export type SwitchChangeHandler = (value: boolean) => void;

type SwitchProps = {
    value: boolean;
    onChange: SwitchChangeHandler;
};

export const Switch: FC<SwitchProps> = ({ value, onChange }) => {
    const [isOn, setIsOn] = useState(value);

    const id = `Switch_${Math.round(Math.random() * 100000)
        .toString()
        .replace(/0\./, '')}`;

    const handleChange: ChangeEventHandler<HTMLInputElement> = () => {
        const newValue = !isOn;

        setIsOn(newValue);
        onChange(newValue);
    };

    const labelClassNames = joinClassNames('Switch--label', isOn && 'Switch--label--is-on');

    return (
        <div className="Switch">
            <input onChange={handleChange} checked={isOn} className="Switch--checkbox" id={id} type="checkbox" />
            <label className={labelClassNames} htmlFor={id}>
                <span className={`Switch--button`} />
            </label>
        </div>
    );
};
