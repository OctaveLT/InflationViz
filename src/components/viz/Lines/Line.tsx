import { line } from "./d3";
import { getInnerDimension } from "../../../functions/dimensions/getInnerDimension";
import { Dimension } from "../../../types/dimensions/types";
import { Point } from "../../../types/shapes/types";

export type LineProps<Data extends [Point, Point] = [Point, Point]> = {
    dimension: Dimension;
    data: Data;
    lineStyling?: {
        stroke?: string;
        strokeWidth?: number;
    };
};

export function Line<Data extends [Point, Point]>({
    dimension,
    data,
    lineStyling,
}: LineProps<Data>) {
    const { margin } = getInnerDimension(dimension);

    const lineGenerator = line<Point>()
        .x((d) => d.x ?? 0)
        .y((d) => d.y ?? 0);

    return (
        <g transform={`translate(${margin.left},${margin.top})`}>
            <path d={lineGenerator(data) ?? ""} fill="none" {...lineStyling} />
        </g>
    );
}
