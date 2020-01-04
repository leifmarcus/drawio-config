export type FormFieldType = 'text' | 'number' | 'boolean' | 'select';
type StyleValue = {
    defaultValue: string;
    type: FormFieldType;
    possibleValues?: Array<string>;
    description?: string;
};

type DefaultStyleFormFields = {
    [key: string]: StyleValue;
};

export const formFields: DefaultStyleFormFields = {
    fontFamily: {
        defaultValue: 'Segoe UI',
        type: 'text',
    },
    fontSize: {
        defaultValue: '15',
        type: 'number',
    },
    rounded: {
        defaultValue: '1',
        type: 'boolean',
    },
    comic: {
        defaultValue: '0',
        type: 'boolean',
    },
    shadow: {
        defaultValue: '0',
        type: 'boolean',
    },
    strokeWidth: {
        defaultValue: '1',
        type: 'number',
    },
    arcSize: {
        defaultValue: '10',
        type: 'number',
    },
    absoluteArcSize: {
        defaultValue: '1',
        type: 'boolean',
    },
};
