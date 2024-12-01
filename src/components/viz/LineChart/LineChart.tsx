import { CurveFactory, line, scaleLinear, select, transition } from "d3";
import { useEffect, useRef } from "react";
import { getMinMax } from "../../../functions/data/getMinMax";
import { getInnerDimension } from "../../../functions/dimensions/getInnerDimension";
import { Dimension } from "../../../types/dimensions/types";

type Point = {
    x: number;
    y: number;
};

type Line = {
    points: Point[];
};

type LineChartProps<Data extends Line> = {
    dimension: Dimension;
    data: Data;
    lineStyling?: {
        stroke?: string;
        strokeWidth?: number;
    };
    style?: React.CSSProperties;
    curve?: CurveFactory;
};

export const LineChart = <Data extends Line>({
    dimension,
    data,
    lineStyling,
    style,
    curve,
}: LineChartProps<Data>) => {
    const svgRef = useRef<SVGSVGElement | null>(null);
    const { width, height } = dimension;
    const { innerWidth, innerHeight, margin } = getInnerDimension(dimension);

    const xAccessor = (d: Point) => d.x;
    const yAccessor = (d: Point) => d.y;

    const xDomain = getMinMax(data.points, xAccessor);

    const xScale = scaleLinear().domain(xDomain).range([0, innerWidth]);

    const yDomain = getMinMax(data.points, yAccessor);

    const yScale = scaleLinear().domain(yDomain).range([innerHeight, 0]);

    const lineGenerator = line<Point>()
        .x((d) => xScale(xAccessor(d)))
        .y((d) => yScale(yAccessor(d)));

    const slow = () => transition().duration(2000);

    useEffect(() => {
        const svg = select(svgRef.current);

        if (svg == null) return;

        if (curve) {
            lineGenerator.curve(curve);
        }

        const linePath = svg.selectAll("g").selectAll("path");

        linePath
            .data([data.points])
            .join("path")
            .attr("d", lineGenerator)
            .call((selection) => {
                // @typescript-eslint/ban-ts-comment
                // @ts-expect-error the selection has nodes thus can get a total length
                const pathLength = selection.node()?.getTotalLength() ?? 0;
                selection
                    .attr("stroke-dashoffset", pathLength)
                    .attr("stroke-dasharray", pathLength);

                selection.transition(slow()).attr("stroke-dashoffset", 0);
            })
            .attr("fill", "none")
            .attr("stroke", lineStyling?.stroke ?? "black")
            .attr("stroke-width", lineStyling?.strokeWidth ?? 1);
    }, [data, curve, lineStyling?.stroke, lineStyling?.strokeWidth, lineGenerator]);

    return (
        <svg
            ref={svgRef}
            width={width}
            height={height}
            style={{
                background: "white",
                ...style,
            }}
        >
            <g transform={`translate(${margin.left},${margin.top})`} />
            {/*  <XAxis
                direction="left"
                svg={svgRef.current}
                scale={yScale}
                dimension={dimension}
            />
            <XAxis
                direction="bottom"
                svg={svgRef.current}
                scale={xScale}
                dimension={dimension}
            /> */}
        </svg>
    );
};
