import { useRef } from "react";
import { scaleLinear, line } from "d3";
import { getInnerDimension } from "../../../functions/dimensions/getInnerDimension";
import { Dimension } from "../../../types/dimensions/types";
import { getMinMax } from "../../../functions/data/getMinMax";

type Point = {
    x: number;
    y: number;
};

type Line = {
    points: Point[];
    stroke?: string;
    strokeWidth?: number;
};

type LineChartProps<Data extends Line> = {
    dimension: Dimension;
    data: Data;
};

export const LineChart = <Data extends Line>({
    dimension,
    data,
}: LineChartProps<Data>) => {
    const ref = useRef<SVGSVGElement | null>(null);
    const { width, height } = dimension;
    const { innerWidth, innerHeight, margin } = getInnerDimension(dimension);

    const xAccessor = (d: Point) => d.x;
    const yAccessor = (d: Point) => d.y;

    /*         const wrapper = d3
            .select(ref.current)
            .attr("width", width)
            .attr("height", height); */

    /*         const bounds = wrapper
            .append("g")
            .style(
                "transform",
                `translate(${margin.left}px, ${margin.top}px)`
            ); */

    const xDomain = getMinMax(data.points, xAccessor);

    const xScale = scaleLinear().domain(xDomain).range([0, innerWidth]);

    const yDomain = getMinMax(data.points, yAccessor);

    const yScale = scaleLinear().domain(yDomain).range([innerHeight, 0]);

    const lineGenerator = line<Point>()
        .x((d) => xScale(xAccessor(d)))
        .y((d) => yScale(yAccessor(d)));

    return (
        <>
            deffe
            <svg width={width} height={height} style={{ background: "white" }}>
                <g transform={`translate(${margin.left},${margin.top})`}>
                    {/* <g transform={`translate(0,${innerHeight})`} ref={ref} > */}
                    {/* <YAxis yScale={yScale} innerWidth={innerWidth} /> */}
                    <path
                        d={lineGenerator(data.points) ?? undefined}
                        fill="none"
                        stroke={data.stroke ?? "black"}
                        strokeWidth={data.stroke}
                    />
                    {/* </g> */}
                </g>
            </svg>
        </>
    );
};
