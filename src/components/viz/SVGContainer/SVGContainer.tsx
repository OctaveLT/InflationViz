import { ReactNode, forwardRef } from "react";
import { Dimension } from "../../../types/dimensions/types";

type SVGContainerProps = {
    dimension: Pick<Dimension, "height" | "width">;
    children: ReactNode;
    style?: React.CSSProperties;
};

export const SVGContainer = forwardRef(
    ({ dimension, children, style }: SVGContainerProps) => {
        return (
            <svg
                width={dimension.width}
                height={dimension.height}
                style={{
                    background: "white",
                    ...style,
                }}
            >
                {children}
            </svg>
        );
    },
);
