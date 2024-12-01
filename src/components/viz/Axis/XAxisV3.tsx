import { AxisDomain, AxisScale, select } from "d3";
import { Dimension } from "../../../types/dimensions/types";
import { toAxisFn } from "./constants";
import { getAxisConfig } from "./functions/getAxisConfig";
import { useEffect, useRef } from "react";

type XAxisProps<Domain extends AxisDomain> = {
    svg: SVGSVGElement | null;
    dimension: Dimension;
    scale: AxisScale<Domain>;
    direction: keyof typeof toAxisFn;
    tickDensity?: number;
};

export function XAxisV3<Domain extends AxisDomain>({
    svg,
    dimension,
    scale,
    direction,
}: XAxisProps<Domain>) {
    const ref = useRef(null);

    useEffect(() => {
        if (svg === null) return;

        const selection = select(svg);

        if (selection === null) return;

        const { axisFn } = getAxisConfig(direction, dimension);

        const axisGenerator = axisFn(scale); 

        const { left, top } = dimension.margin;

        selection
            .select("g." + direction + "axis")
            .selectAll("*")
            .remove();

        selection
            .append("g")
            .attr("transform", `translate(${left},${top})`)
            .call(axisGenerator);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [svg]);

    return <g ref={ref} className={direction + "axis"} />;
}
