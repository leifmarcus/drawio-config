import React, { useState, ChangeEventHandler, useEffect, useRef } from 'react';
import './FontBox.css';
import { CustomFont } from '../../state/types';
import { Switch, SwitchChangeHandler } from '../Elements/Switch/Switch';

export type FontBoxChangeHandler = (font: CustomFont) => void;

type FontBoxProps = CustomFont & {
    onChange: FontBoxChangeHandler;
};

const useUpdate = (
    initialName: string,
    initialUrl: string | undefined,
    onChange: FontBoxChangeHandler,
): [
    string,
    string | undefined,
    ChangeEventHandler<HTMLInputElement>,
    ChangeEventHandler<HTMLInputElement>,
    SwitchChangeHandler,
] => {
    const [name, setName] = useState(initialName);
    const [url, setUrl] = useState(initialUrl);
    const mounted = useRef(false);

    useEffect(() => {
        if (!mounted.current) {
            mounted.current = true;
            return;
        }

        onChange({
            name,
            url,
        });
    }, [name, url]);

    const changeName: ChangeEventHandler<HTMLInputElement> = event => {
        const { value } = event.target;

        setName(value);
    };

    const changeUrl: ChangeEventHandler<HTMLInputElement> = event => {
        const { value } = event.target;

        setUrl(value);
    };

    const changeIsGoogleFont: SwitchChangeHandler = value => {
        if (!value) {
            setUrl('');
        } else {
            setUrl(`https://fonts.googleapis.com/css?family=${name.replace(/\s/g, '+')}`);
        }
    };

    return [name, url, changeName, changeUrl, changeIsGoogleFont];
};

export const FontBox: React.FC<FontBoxProps> = ({ name, url, onChange }) => {
    const [cName, cUrl, changeName, changeUrl, changeIsGoogleFont] = useUpdate(name, url, onChange);

    const isGoogleFont = Boolean(cUrl && cUrl.includes('google'));

    return (
        <div className="FontBox">
            <div className="Font-Box--field">
                <label className="Font-Box--label">Font Name</label>
                <input onChange={changeName} type="text" value={cName} />
            </div>
            <div className="Font-Box--field">
                <label className="Font-Box--label">Font CSS url</label>
                <input onChange={changeUrl} type="text" value={cUrl || ''} className="FontBox--input" />
            </div>
            <div className="Font-Box--field">
                <div className="Font-Box--label">is Google Font?</div>
                <Switch value={isGoogleFont} onChange={changeIsGoogleFont} />
            </div>
        </div>
    );
};
