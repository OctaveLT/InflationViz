import { getInnerDimension } from "../../../../functions/dimensions/getInnerDimension";
import { Dimension } from "../../../../types/dimensions/types";
import { toAxisFn } from "../constants";

export function getAxisConfig(
    direction: keyof typeof toAxisFn,
    dimension: Dimension,
) {
    const {
        innerHeight,
        margin: { left, top },
    } = getInnerDimension(dimension);
    if (direction === "left")
        return {
            transform: `translate(${left},${top})`,
            axisFn: toAxisFn[direction],
        };

    if (direction === "bottom")
        return {
            transform: `translate(${left},${innerHeight - 10})`,
            axisFn: toAxisFn[direction],
        };

    throw new Error("Direction not supported yet");
}
