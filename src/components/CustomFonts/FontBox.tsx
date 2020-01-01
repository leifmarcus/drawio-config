import React, { useState, ChangeEventHandler, useEffect, useRef } from 'react';
import './FontBox.css';
import { CustomFont } from '../../state/types';
import { Switch, SwitchChangeHandler } from '../Elements/Switch/Switch';
import { Button } from '../Elements/Button';

export type FontBoxChangeHandler = (font: CustomFont) => void;
export type FontBoxDeleteHandler = () => void;

type FontBoxProps = CustomFont & {
    onChange: FontBoxChangeHandler;
    onDelete: FontBoxDeleteHandler;
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

export const FontBox: React.FC<FontBoxProps> = ({ name, url, onChange, onDelete }) => {
    const [cName, cUrl, changeName, changeUrl, changeIsGoogleFont] = useUpdate(name, url, onChange);

    const isGoogleFont = Boolean(cUrl && cUrl.includes('google'));

    const fontStyle = {
        fontFamily: `${cName},sans-serif`,
    };

    return (
        <div className="FontBox">
            <div className="FontBox--fields">
                <h3 className="FontBox--font-display" style={fontStyle}>
                    {cName}
                </h3>
                <div className="FontBox--field">
                    <label className="FontBox--label">Font Name</label>
                    <input onChange={changeName} type="text" value={cName} />
                </div>
                <div className="FontBox--field">
                    <label className="FontBox--label">Font CSS url</label>
                    <input onChange={changeUrl} type="text" value={cUrl || ''} className="FontBox--input" />
                </div>
                <div className="FontBox--field">
                    <div className="FontBox--label">is Google Font?</div>
                    <Switch value={isGoogleFont} onChange={changeIsGoogleFont} />
                </div>
            </div>
            <div className="FontBox--action">
                <Button onClick={onDelete}>×</Button>
            </div>
        </div>
    );
};
