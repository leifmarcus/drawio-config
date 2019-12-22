import React, { useContext, useEffect } from 'react';
import './ConfigOutput.css';
import { Box } from '../Elements/Box';
import { ConfigurationContext } from '../../App';

type Props = {};

export const ConfigOutput: React.FC<Props> = ({ children }) => {
    const store = useContext(ConfigurationContext);
    const currState = store.getState();

    return (
        <div className="ConfigOutput">
            <Box title="Copy Configuration">
                <pre>{JSON.stringify(currState, null, 2)}</pre>
            </Box>
        </div>
    );
};
