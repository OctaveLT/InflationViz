import { PropsWithChildren } from "react";
import "./tooltip.css";
import { Dimension } from "../../../types/dimensions/types";
import { getInnerDimension } from "../../../functions/dimensions/getInnerDimension";
import { Point } from "../../../types/shapes/types";

export type TooltipPosition = Point;

type DynamicProps = {
    dynamic: true;
    dimension: Dimension;
};

type BaseTooltipProps = PropsWithChildren & {
    position: TooltipPosition | null;
};

type TooltipProps =
    | (BaseTooltipProps & { dynamic?: false; dimension: never })
    | (BaseTooltipProps & DynamicProps);

const cursorToTooltipMargin = 20;

export const Tooltip = ({
    children,
    position,
    dynamic = true,
    ...restProps
}: TooltipProps) => {
    if (position === null) return null;

    const { x, y } = position;

    function getLeft() {
        if (dynamic) {
            const { dimension } = restProps;
            const { innerWidth } = getInnerDimension(dimension);
            return x > innerWidth / 2 ? undefined : x + cursorToTooltipMargin;
        }

        return x;
    }

    function getRight() {
        if (dynamic) {
            const { dimension } = restProps;
            const { innerWidth } = getInnerDimension(dimension);
            return x > innerWidth / 2
                ? innerWidth - x + cursorToTooltipMargin
                : undefined;
        }

        return x;
    }

    return (
        <div
            className="tooltip"
            style={{
                position: "absolute",
                right: getRight(),
                left: getLeft(),
                top: y - 50,
            }}
        >
            {children}
        </div>
    );
};
