import { AxisDomain, AxisScale, select } from "d3";
import { Dimension } from "../../../types/dimensions/types";
import { toAxisFn } from "./constants";
import { getAxisConfig } from "./functions/getAxisConfig";

type XAxisProps<Domain extends AxisDomain> = {
    svg: SVGSVGElement | null;
    dimension: Dimension;
    scale: AxisScale<Domain>;
    direction: keyof typeof toAxisFn;
    tickDensity?: number;
};

export function XAxis<Domain extends AxisDomain>({
    svg,
    dimension,
    scale,
    direction,
    tickDensity = 50,
}: XAxisProps<Domain>) {
    const [min, max] = scale.range();
    const minMaxDif = max - min;

    const ticks = minMaxDif / tickDensity;

    if (svg === null) return null;

    const svgSelection = select(svg);

    if (svgSelection === null) return null;

    const { transform, axisFn } = getAxisConfig(direction, dimension);

    svgSelection
        .selectAll(`g.${direction}axis`)
        .data([null])
        .join("g")
        .attr("class", `${direction}axis`)
        .attr("transform", transform)
        .call(axisFn(scale).ticks(ticks));
}
