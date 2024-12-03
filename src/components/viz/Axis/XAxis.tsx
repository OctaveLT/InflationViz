import { AxisDomain, AxisScale, select } from "d3";
import { ElementRef, useEffect, useRef } from "react";
import { Dimension } from "../../../types/dimensions/types";
import { toAxisFn } from "./constants";
import { getAxisConfig } from "./functions/getAxisConfig";

type XAxisProps<Domain extends AxisDomain> = {
    dimension: Dimension;
    scale: AxisScale<Domain>;
    direction: keyof typeof toAxisFn;
    tickDensity?: number;
};

export function XAxis<Domain extends AxisDomain>({
    dimension,
    scale,
    direction,
    tickDensity,
}: XAxisProps<Domain>) {
    const ref = useRef<ElementRef<"g"> | null>(null);

    const [min, max] = scale.range();
    const minMaxDif = max - min;

    const ticks = tickDensity != null ? minMaxDif / tickDensity : undefined;

    useEffect(() => {
        if (ref.current === null) return;

        const selection = select(ref.current);

        if (selection === null) return;

        const { transform, axisFn } = getAxisConfig(direction, dimension);

        const axisGenerator = axisFn(scale).ticks(ticks);

        selection.attr("transform", transform).call(axisGenerator);
    }, [dimension, direction, scale, ticks]);

    return <g ref={ref} className={`${direction}-axis`} />;
}
