import {
    CurveFactory,
    easeLinear,
    scaleLinear,
    scaleTime,
    select,
    transition,
} from "d3";
import { useEffect, useMemo, useState } from "react";
import { inflationColorScale } from "../../../features/Inflations/functions/colorScale";
import { getMinMax } from "../../../functions/data/getMinMax";
import { getInnerDimension } from "../../../functions/dimensions/getInnerDimension";
import { Dimension } from "../../../types/dimensions/types";

type Point = {
    x: number | Date | null;
    y: number | null;
};

type Line = {
    points: Point[];
};

export type ScatteredPointsProps<Data extends Line> = {
    svg: SVGSVGElement | null;
    dimension: Dimension;
    data: Data;
    axis?: {
        y?: {
            min?: number;
            max?: number;
        };
        x?: {
            min?: number;
            max?: number;
            scale?: "time" | "linear";
        };
    };
    style?: React.CSSProperties;
    transitionConfig?: {
        duration?: number;
        ease?: (t: number) => number;
    };
    curve?: CurveFactory;
    onMouseEnter?: (point: Point) => void;
    onMouseLeave?: () => void;
    onClick?: (point: Point) => void;
};

export function ScatteredPoints<Data extends Line>({
    svg,
    dimension,
    data,
    axis,
    transitionConfig,
    curve,
    onMouseEnter,
    onMouseLeave,
    onClick,
}: ScatteredPointsProps<Data>) {
    const [selectedPoint, setSelectedPoint] = useState<Point | null>(null);
    const { innerWidth, innerHeight, margin } = getInnerDimension(dimension);

    const xAccessor = (d: Point) => d.x;
    const yAccessor = (d: Point) => d.y;

    const xDefaultDomain = getMinMax(data.points, (d: Point) => d.x);

    const xDomain = [
        axis?.x?.min ?? xDefaultDomain[0],
        axis?.x?.max ?? xDefaultDomain[1],
    ];

    const xScale =
        axis?.x?.scale === "time"
            ? scaleTime().domain(xDomain).range([0, innerWidth])
            : scaleLinear().domain(xDomain).range([0, innerWidth]);

    const yDefaultDomain = getMinMax(data.points, yAccessor);

    const yDomain: [number, number] = useMemo(
        () => [axis?.y?.min ?? yDefaultDomain[0], axis?.y?.max ?? yDefaultDomain[1]],
        [axis?.y?.min, axis?.y?.max, yDefaultDomain],
    );

    const yScale = scaleLinear().domain(yDomain).range([innerHeight, 0]);

    const fast = transition().duration(500).ease(easeLinear);

    useEffect(() => {
        if (svg === null) return;

        const selection = select(svg);

        if (selection === null) return;

        const dotColorScale = inflationColorScale();

        function getFill(point: Point) {
            const value = yAccessor(point);
            return value == null ? "transparent" : dotColorScale(value);
        }

        function getStrokeWidth(point: Point) {
            return yAccessor(point) == null ? 1 : 1;
        }

        selection
            .select("g.lineChart")
            .selectAll("circle")
            .data(data.points)
            .join("circle")
            .on("mouseenter", function (_, d) {
                setSelectedPoint(d);
                onMouseEnter?.(d);
            })
            .on("mouseleave", () => onMouseLeave?.())
            .on("click", (_, d) => onClick?.(d))
            .attr("r", (d) => (d.x === selectedPoint?.x ? 10 : 4))
            .attr("opacity", 0.5)
            .attr("fill", getFill)
            .attr("stroke-width", getStrokeWidth)
            .style("cursor", "pointer")
            .transition()
            .duration(transitionConfig?.duration ?? 0)
            .ease(transitionConfig?.ease ?? easeLinear)
            .attr("cx", (d) => xScale(xAccessor(d) ?? 0))
            .attr("cy", (d) => yScale(yAccessor(d) ?? 0));
    }, [
        curve,
        data.points,
        data.points.length,
        fast,
        onClick,
        onMouseEnter,
        onMouseLeave,
        selectedPoint,
        svg,
        transitionConfig?.duration,
        transitionConfig?.ease,
        xScale,
        yDefaultDomain,
        yDomain,
        yScale,
    ]);

    return (
        <g
            className="lineChart"
            transform={`translate(${margin.left},${margin.top})`}
        />
    );
}
