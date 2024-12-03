import { brushX, select } from "d3";
import { ElementRef, useEffect, useRef } from "react";
import { getInnerDimension } from "../../../functions/dimensions/getInnerDimension";
import { Dimension } from "../../../types/dimensions/types";

export type BrushEvent = MouseEvent & {
    selection: [number, number];
};

type BrushProps = {
    dimension: Dimension;
    onBrush: (this: SVGGElement, event: BrushEvent, d: unknown) => void;
};

export function Brush({ dimension, onBrush }: BrushProps) {
    const ref = useRef<ElementRef<"g"> | null>(null);
    const { innerWidth, innerHeight } = getInnerDimension(dimension);

    useEffect(() => {
        if (ref.current === null) return;

        const selection = select(ref.current);

        if (selection === null) return;

        const xBrushGroup = selection.attr(
            "transform",
            `translate(${dimension.margin.left}, ${dimension.margin.top})`,
        );

        xBrushGroup
            .data([null])
            .join("rect")
            .attr("height", innerHeight)
            .attr("width", innerWidth);

        const xBrush = brushX().extent([
            [0, 0],
            [innerWidth, innerHeight],
        ]);

        xBrushGroup.call(xBrush);

        xBrush.on("brush", onBrush);
    }, [
        dimension.margin.left,
        dimension.margin.top,
        dimension.width,
        innerHeight,
        innerWidth,
        onBrush,
    ]);

    const transform = `translate(${dimension.margin.left}, ${dimension.margin.top})`;

    return <g ref={ref} className={"brush"} transform={transform} />;
}
