import React, { ReactNode } from 'react';
import './Box.css';
import { Headline } from '../Headline';

type Props = {
    title?: ReactNode;
    footer?: ReactNode;
};

export const Box: React.FC<Props> = ({ children, title, footer }) => {
    const showHead = !!title;

    return (
        <div className="Box">
            {showHead && (
                <div className="Box--head">
                    <Headline type="h2" className="Box--title">
                        {title}
                    </Headline>
                </div>
            )}
            <div className="Box--content">{children}</div>
            <div className="Box--footer">{footer}</div>
        </div>
    );
};
