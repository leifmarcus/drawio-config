import React from 'react';
import './Information.css';
import { Box } from '../Elements/Box';

type InformationProps = {};

export const Information: React.FC<InformationProps> = () => {
    return (
        <section className="Information" title="Information">
            <Box contentClassName="Information--content">
                <h2>Information</h2>
                <p>
                    This draw.io configuration editor was build by Leif Marcus and is not an official release of the
                    draw.io team. (The configurator is based on the draw.io helpdesk article{' '}
                    <a href="https://desk.draw.io/support/solutions/articles/16000058316-how-to-configure-draw-io-">
                        How to configure draw.io?
                    </a>
                    ).
                </p>
                <p>
                    As I’m working for different clients with different brand identies, I wanted a tool that makes it
                    easy to setup basic colors, fonts and presets. Building this tool, I was thinking it might be also
                    interesting for other people to use it to setup their prefered styles and colors.
                </p>
                <h3>Changes/Updates in Draw.io</h3>
                <p>
                    Whenever draw.io is changing something, the configuration this editor generates may not work
                    anymore. But I’ll try to update the editor if I recognize changes in the draw.io application.
                </p>
            </Box>
        </section>
    );
};
