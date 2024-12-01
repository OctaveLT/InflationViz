import { scaleLinear } from "./d3";
import { getInnerDimension } from "../../../functions/dimensions/getInnerDimension";
import { Line, LineProps } from "./Line";
import { Point } from "../../../types/shapes/types";
import { memo } from "react";

type LinesProps = Omit<LineProps, "data"> & {
    direction: "x" | "y";
    multipleOf: number;
    domain: [number, number];
};

type GridProps = Omit<LineProps, "data"> & {
    x?: {
        multipleOf: number;
        domain: [number, number];
    };
    y?: {
        multipleOf: number;
        domain: [number, number];
    };
};

function Lines({ direction, multipleOf, domain, ...restProps }: LinesProps) {
    const { dimension } = restProps;
    const { innerWidth, innerHeight } = getInnerDimension(dimension);

    const range = direction === "x" ? [0, innerWidth] : [innerHeight, 0];

    const scale = scaleLinear().domain(domain).range(range);

    const samples = Array.from({ length: domain[1] - domain[0] + 1 })
        .map((_, i) => i + domain[0])
        .filter((value) => value % multipleOf === 0);

    function getData(multiple: number): [Point, Point] {
        if (direction === "x") {
            return [
                { x: scale(multiple), y: 0 },
                { x: scale(multiple), y: innerHeight },
            ];
        }

        return [
            { x: 0, y: scale(multiple) },
            { x: innerWidth, y: scale(multiple) },
        ];
    }

    return samples.map((multiple) => (
        <Line {...restProps} key={multiple} data={getData(multiple)} />
    ));
}

export function Grid({ x, y, ...restProps }: GridProps) {
    return (
        <>
            {x && (
                <Lines
                    {...restProps}
                    direction="x"
                    domain={x.domain}
                    multipleOf={x.multipleOf}
                />
            )}
            {y && (
                <Lines
                    {...restProps}
                    direction="y"
                    domain={y.domain}
                    multipleOf={y.multipleOf}
                />
            )}
        </>
    );
}

export const MemoizedGrid = memo(Grid);
