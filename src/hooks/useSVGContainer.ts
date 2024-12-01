import { ReactNode, useRef } from "react";
import { getInnerDimension } from "../functions/dimensions/getInnerDimension";
import { Dimension } from "../types/dimensions/types";
import { SVGContainer } from "../components/viz/SVGContainer/SVGContainer";

export const useSVGContainer = (dimension: Dimension) => {
    const ref = useRef<SVGSVGElement | null>(null);
    const innerDimension = getInnerDimension(dimension);

    const Container = ({
        children,
        style,
    }: {
        children: ReactNode;
        style?: React.CSSProperties;
    }) =>
        SVGContainer({
            ref,
            dimension,
            children,
            style,
        });

    return {
        svgRef: ref,
        SVGContainer: Container,
        innerDimension,
    };
};
