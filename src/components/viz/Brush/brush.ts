import { brushX, select } from "./d3";
import { useEffect } from "react";
import { getInnerDimension } from "../../../functions/dimensions/getInnerDimension";
import { Dimension } from "../../../types/dimensions/types";

export type BrushEvent = MouseEvent & {
    selection: [number, number];
};

export function useBrush(
    svgEl: SVGSVGElement | null,
    dimension: Dimension,
    onBrush: (this: SVGGElement, event: BrushEvent, d: unknown) => void,
) {
    const { innerWidth, innerHeight } = getInnerDimension(dimension);

    useEffect(() => {
        if (!svgEl || !onBrush) return;

        const selection = select(svgEl);

        const xBrushGroup = selection
            .append("g")
            .attr(
                "transform",
                `translate(${dimension.margin.left}, ${dimension.margin.top})`,
            );

        xBrushGroup
            .append("rect")
            .classed("border-box", true)
            .attr("height", innerHeight)
            .attr("width", innerWidth);

        const xBrush = brushX().extent([
            [0, 0],
            [innerWidth, innerHeight],
        ]);

        xBrushGroup.call(xBrush);

        xBrush.on("brush", onBrush);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [svgEl, dimension]);
}
