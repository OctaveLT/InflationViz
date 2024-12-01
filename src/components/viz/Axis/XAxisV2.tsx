import { AxisDomain, AxisScale, select } from "./d3";
import { Dimension } from "../../../types/dimensions/types";
import { toAxisFn } from "./constants";
import { getAxisConfig } from "./functions/getAxisConfig";
import { useEffect, useRef } from "react";

type XAxisProps<Domain extends AxisDomain> = {
    dimension: Dimension;
    scale: AxisScale<Domain>;
    direction: keyof typeof toAxisFn;
};

export function XAxisV2<Domain extends AxisDomain>({
    dimension,
    scale,
    direction,
}: XAxisProps<Domain>) {
    // The bounds (=area inside the axis) is calculated by substracting the margins
    const gRef = useRef(null);

    // Render the X and Y axis using d3.js, not react
    useEffect(() => {
        const selection = select(gRef.current);

        const { transform, axisFn } = getAxisConfig(direction, dimension);

        const axisGenerator = axisFn(scale); //.ticks(ticks);

        selection.selectAll("*").remove();
        /* const xAxisGenerator = d3.axisBottom(xScale);
        svgElement
            .append("g")
            .attr("transform", "translate(0," + boundsHeight + ")")
            .call(xAxisGenerator); */

        selection.append("g").attr("transform", transform).call(axisGenerator);
    }, [dimension, direction, scale]);
    /*   const ref = useRef<SVGSVGElement | null>(null);
    const [min, max] = scale.range();
    const minMaxDif = max - min;

    console.log(scale.range(), scale.domain());

    const ticks = minMaxDif / tickDensity;

    useEffect(() => {
        //const svg = ref.current;
        if (svg === null) return;

        const svgSelection = select(svg);

        if (svgSelection === null) return;

        const { transform, axisFn } = getAxisConfig(direction, dimension);

        const axisGenerator = axisFn(scale).ticks(ticks);

        svgSelection
            .selectAll(`g.${direction}axis`)
            .data([null])
            .join("g")
            .attr("class", `${direction}axis`)
            .attr("transform", transform)
            .call(axisGenerator);
    }, [dimension, scale, direction, tickDensity, min, max, minMaxDif, ticks]);
 */
    return <g ref={gRef} />;
} // Layout. The div size is set by the given props.
