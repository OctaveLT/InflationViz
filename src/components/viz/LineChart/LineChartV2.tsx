import {
    CurveFactory,
    line,
    scaleLinear,
    select
} from "d3";
import { useEffect, useMemo } from "react";
import { getMinMax } from "../../../functions/data/getMinMax";s
import { getInnerDimension } from "../../../functions/dimensions/getInnerDimension";
import { Dimension } from "../../../types/dimensions/types";

type Point = {
    x: number | null;
    y: number | null;
};

type Line = {
    points: Point[];
};

type LineChartV2Props<Data extends Line> = {
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
        };
    };
    lineStyling?: {
        stroke?: string;
        strokeWidth?: number;
    };
    style?: React.CSSProperties;
    curve?: CurveFactory;
};

export function LineChartV2<Data extends Line>({
    svg,
    dimension,
    data,
    axis,
    lineStyling,
    curve,
}: LineChartV2Props<Data>) {
    const { innerWidth, innerHeight, margin } = getInnerDimension(dimension);

    const xDefaultDomain = getMinMax(data.points, (d: Point) => d.x);

    const xDomain = [
        axis?.x?.min ?? xDefaultDomain[0],
        axis?.x?.max ?? xDefaultDomain[1],
    ];

    const xScale = scaleLinear().domain(xDomain).range([0, innerWidth]);

    const yDefaultDomain = getMinMax(data.points, (d: Point) => d.y);

    const yDomain: [number, number] = useMemo(
        () => [axis?.y?.min ?? yDefaultDomain[0], axis?.y?.max ?? yDefaultDomain[1]],
        [axis?.y?.min, axis?.y?.max, yDefaultDomain],
    );

    const yScale = useMemo(
        () => scaleLinear().domain(yDomain).range([innerHeight, 0]),
        [innerHeight, yDomain],
    );

    const lineGenerator = useMemo(
        () =>
            line<Point>()
                .x((d) => xScale(d.x ?? 0))
                .y((d) => yScale(d.y ?? 0))
                .defined((d) => d.x !== null && d.y !== null),
        [xScale, yScale],
    );

    useEffect(() => {
        if (svg === null) return;

        const selection = select(svg);

        if (selection === null) return;

        if (curve) {
            lineGenerator.curve(curve);
        }

        const linePath = selection.select("g.lineChart").selectAll("path");

        linePath
            .data([data.points])
            .join("path")
            .transition()
            /*  .duration(500)
            .ease(easeLinear) */
            .attr("d", lineGenerator)
            .attr("fill", "none")
            .attr("stroke", lineStyling?.stroke ?? "black")
            .attr("stroke-width", lineStyling?.strokeWidth ?? 1);
    }, [
        curve,
        data.points,
        lineGenerator,
        lineStyling?.stroke,
        lineStyling?.strokeWidth,
        svg,
    ]);

    return (
        <g
            className="lineChart"
            transform={`translate(${margin.left},${margin.top})`}
        />
    );
}
