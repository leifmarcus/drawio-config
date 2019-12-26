import React, { ReactNode } from 'react';
import './CustomFonts.css';
import { Box } from '../Elements/Box';

type Props = {};

export const CustomFonts: React.FC<Props> = ({ children }) => {
    return (
        <Box title="Custom Fonts" footer={''}>
            <div className="CustomFonts"></div>;
        </Box>
    );
};
