import React, { useContext, RefObject, useRef, useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { github } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import './ConfigOutput.css';
import { Box } from '../Elements/Box';
import { ConfigurationContext } from '../../App';
import { Button } from '../Elements/Button';
import { convertToDrawIoConfig, createDrawioLink } from './helper';
import { Configuration } from '../../state/types';

type Props = {};
type CopyClickHandler = () => void;

const useDrawioConfig = (): [Configuration] => {
    const store = useContext(ConfigurationContext);
    const currState = store.getState();

    const config = convertToDrawIoConfig(currState);

    return [config];
};

const useClipboard = (codeRef: RefObject<HTMLDivElement>): [boolean, CopyClickHandler] => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopyClick: CopyClickHandler = () => {
        if (!codeRef.current) {
            return;
        }

        window.getSelection()?.removeAllRanges();
        const range = document.createRange();
        range.setStartBefore(codeRef.current.firstChild as Node);
        range.setEndAfter(codeRef.current.lastChild as Node);
        window.getSelection()?.addRange(range);

        try {
            if (document.execCommand('copy')) {
                setIsCopied(true);

                setTimeout(function() {
                    setIsCopied(false);
                }, 1500);
            } else {
                console.error('execCommand returned false !');
            }
        } catch (err) {
            console.error('execCommand failed ! exception ' + err);
        }

        if (window.getSelection) {
            if (window.getSelection()?.empty) {
                // Chrome
                window.getSelection()?.empty();
            } else if (window.getSelection()?.removeAllRanges) {
                // Firefox
                window.getSelection()?.removeAllRanges();
            }
        }
    };

    return [isCopied, handleCopyClick];
};

export const ConfigOutput: React.FC<Props> = () => {
    const codeRef = useRef(null);

    const [isCopied, handleCopyClick] = useClipboard(codeRef);
    const [drawioConfig] = useDrawioConfig();

    return (
        <div className="ConfigOutput">
            <Box title="Configuration">
                <SyntaxHighlighter
                    codeTagProps={{ ref: codeRef }}
                    language="json"
                    style={github}
                    className="ConfigOutput--code-box"
                >
                    {JSON.stringify(drawioConfig, null, 2)}
                </SyntaxHighlighter>

                <Button onClick={handleCopyClick}>Copy To Clipboard</Button>

                {isCopied && <div className="ConfigOutput--copy-hint">✔︎ Copied to clipboard</div>}

                <div className="ConfigOutput--open-link">
                    <a href={createDrawioLink(drawioConfig)} target="_blank" rel="noopener noreferrer">
                        Open draw.io with this config
                    </a>
                </div>
            </Box>
            {drawioConfig.fontCss && <style type="text/css">{drawioConfig.fontCss}</style>}
        </div>
    );
};
