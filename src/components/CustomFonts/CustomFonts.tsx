import React from 'react';
import './CustomFonts.css';
import { Box } from '../Elements/Box';

type CustomFontsProps = {};

export const CustomFonts: React.FC<CustomFontsProps> = ({}) => {
    return (
        <Box title="Custom Fonts" description="Work in progress …" footer={''}>
            <div className="CustomFonts"></div>;
        </Box>
    );
};
