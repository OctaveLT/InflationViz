import { PropsWithChildren } from "react";
import { theme } from "../../../features/Inflations/constants/theme";
import { XIcon } from "../Icons/XIcon";

type DialogProps = PropsWithChildren & {
    open: boolean;
    onClose: () => void;
};

export function Dialog({ children, open, onClose }: DialogProps) {
    if (!open) return null;

    return (
        <div
            style={{
                position: "absolute",
                left: 0,
                top: 0,
                width: "100%",
                height: "100%",
                zIndex: 100,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
            onClick={onClose}
        >
            <div
                style={{
                    ...theme.card,
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    padding: 30,
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {children}
                <XIcon
                    width={25}
                    height={25}
                    style={{
                        position: "absolute",
                        right: 10,
                        top: 10,
                        cursor: "pointer",
                    }}
                    onClick={onClose}
                />
            </div>
        </div>
    );
}
