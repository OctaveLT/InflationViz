import { ScaleLinear, ScaleTime } from "./d3";
import { TooltipPosition, Tooltip } from "../../../components/viz/Tooltip/Tooltip";
import { getInnerDimension } from "../../../functions/dimensions/getInnerDimension";
import { Dimension } from "../../../types/dimensions/types";
import { roundToDecimal } from "../../../functions/numbers/roundToDecimal";

type InflationTooltipProps = {
    dimension: Dimension;
    tooltipPosition: TooltipPosition | null;
    xScale: ScaleTime<number, number, never>;
    yScale: ScaleLinear<number, number, never>;
};

export function InflationTooltip({
    dimension,
    tooltipPosition,
    xScale,
    yScale,
}: InflationTooltipProps) {
    const { innerWidth, innerHeight, margin } = getInnerDimension(dimension);

    const rate = yScale.invert(tooltipPosition?.y ?? 0);
    const formattedRate = roundToDecimal(rate);

    const date = xScale.invert(tooltipPosition?.x ?? 0);
    const formattedDate = date.toLocaleDateString(undefined, {
        month: "long",
        year: "numeric",
    });

    return (
        <div
            style={{
                width: innerWidth,
                height: innerHeight,
                position: "absolute",
                top: 0,
                left: 0,
                pointerEvents: "none",
                marginLeft: margin.left,
                marginTop: margin.top,
            }}
        >
            <Tooltip position={tooltipPosition} dynamic dimension={dimension}>
                <div style={{ margin: 10 }}>
                    <p>{`Rate: ${formattedRate}`}</p>
                    <p>{`Date: ${formattedDate}`}</p>
                </div>
            </Tooltip>
        </div>
    );
}
