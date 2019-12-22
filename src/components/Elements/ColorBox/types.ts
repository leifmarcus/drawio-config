export type OnChange = (value: string) => void;
export type OnDelete = () => void;
export type ColorBoxProps = {
    color: string;
    onChange: OnChange;
    onDelete: OnDelete;
    className: string;
};
