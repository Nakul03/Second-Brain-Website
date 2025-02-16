import { ReactElement } from "react";

type Variants = "primary" | "secondary";

interface ButtonProps {
    variant: Variants;
    size: "sm" | "md" | "lg";
    text: string;
    startIcon?: ReactElement;
    endIcon?: ReactElement;
    onClick?: () => void;
    fullWidth?: boolean;
    loading?: boolean;
}

const variantStyles = {
    "primary": "bg-purple-600 text-white",
    "secondary": "bg-purple-200 text-purple-600"
}

const sizeStyles = {
    "sm": "py-1 py-2",
    "md": "py-2 px-4",
    "lg": "py-4 px-6"
}

const defaultStyles = "rounded-md px-4 py-2 flex font-light items-center"  // justify-center will center contents horizontally and items-center will centre it vertically (carefull about center spelling )

export const Button = (props: ButtonProps) => {
    return <button onClick={props.onClick} className={`${variantStyles[props.variant]} ${defaultStyles} ${sizeStyles[props.size]} ${props.fullWidth ? " w-full flex justify-center items-center" : ""} ${props.loading ? "opacity-50" : ""}`} disabled={props.loading}>
                {props.startIcon ? <div className="pr-2"> {props.startIcon}</div>  : null} {props.text} {props.endIcon} 
            </button>
    }

<Button variant = "primary" size = "md" onClick = {() => {}} text = {"asd"} />