import type {ReactNode} from 'react';

type ButtonProps = {
    onClick: () => void;
    children?: ReactNode;
    disabled?: boolean;      
    type?: "button"|"submit";
};

export function Button({ onClick, children, disabled, type = "button" }: ButtonProps) {
    return (
        <button onClick={onClick} disabled={disabled} type={type}>
            {children}
        </button>
    );
}
