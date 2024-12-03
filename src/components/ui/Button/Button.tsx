import { ButtonHTMLAttributes } from "react";
import { theme } from "../../../features/Inflations/constants/theme";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: ButtonProps) {
    return (
        <button
            {...props}
            style={{
                padding: "0.5rem",
                border: "none",
                borderRadius: theme.border.borderRadius.primary,
                backgroundColor: theme.typography.primary,
                ...props.style,
            }}
        >
            {props.children}
        </button>
    );
}
