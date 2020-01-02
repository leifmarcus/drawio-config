import React, { ReactNode } from 'react';
import './Box.css';
import { Headline } from '../Headline';
import { joinClassNames } from '../../../utils/helpers';

type Props = {
    title?: ReactNode;
    description?: ReactNode;
    footer?: ReactNode;
    contentClassName?: string;
};

export const Box: React.FC<Props> = ({ children, title, footer, description, contentClassName }) => {
    const showHead = !!title || !!description;

    const contentClassNames = joinClassNames('Box--content', contentClassName);

    return (
        <div className="Box">
            {showHead && (
                <div className="Box--head">
                    {title && (
                        <Headline type="h2" className="Box--title">
                            {title}
                        </Headline>
                    )}
                    {description && <div className="Box--description">{description}</div>}
                </div>
            )}
            <div className={contentClassNames}>{children}</div>
            <div className="Box--footer">{footer}</div>
        </div>
    );
};
