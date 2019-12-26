import React, { useState, useEffect } from 'react';
import './Schema.css';
import { Preview } from './Preview';
import { ColorOutput } from './ColorOutput';
import { CustomColorSchema } from '../../state/types';

type SchemaProps = CustomColorSchema & {
    onChange: (schema: CustomColorSchema) => void;
    onDelete: () => void;
};

type ChangeHandler = (type: keyof CustomColorSchema, color: string) => void;
type DeleteHandler = () => void;

const ResetSchema: React.FC<{}> = () => {
    return (
        <div className="Schema Schema--reset">
            <div className="Schema--reset-title">Reset Schema</div>
        </div>
    );
};

const useColorChange = (
    onChange: (schema: CustomColorSchema) => void,
    onDelete: () => void,
    fill?: string,
    gradient?: string,
    stroke?: string,
    font?: string,
): [CustomColorSchema, ChangeHandler, DeleteHandler] => {
    const [schema, setSchema] = useState({
        fill,
        gradient,
        stroke,
        font,
    });

    useEffect(() => {
        setSchema({
            fill,
            gradient,
            stroke,
            font,
        });
    }, [fill, gradient, stroke, font]);

    const handleChange: ChangeHandler = (type, color) => {
        const newSchema = {
            ...schema,
            [type]: color,
        };
        setSchema(newSchema);

        onChange({
            ...schema,
            [type]: color,
        });
    };

    const handleDelete: DeleteHandler = () => {
        onDelete();
    };

    return [schema, handleChange, handleDelete];
};

export const Schema: React.FC<SchemaProps> = ({ fill, gradient, stroke, font, onChange, onDelete }) => {
    const isResetSchema = !fill && !gradient && !stroke && !font;

    const [schema, handleChange, handleDelete] = useColorChange(onChange, onDelete, fill, gradient, stroke, font);

    if (isResetSchema) {
        return <ResetSchema />;
    }

    return (
        <div className="Schema">
            <Preview fill={fill} gradient={schema.gradient} stroke={stroke} font={font} />
            <div className="Schema--colors">
                <ColorOutput type="fill" color={schema.fill} onChange={handleChange} />
                <ColorOutput type="stroke" color={schema.stroke} onChange={handleChange} />
                <ColorOutput type="gradient" color={schema.gradient} onChange={handleChange} />
                <ColorOutput type="font" color={schema.font} onChange={handleChange} />
                <div className="Schema--delete" title="Delete color preset" onClick={handleDelete}>
                    ×
                </div>
            </div>
        </div>
    );
};
