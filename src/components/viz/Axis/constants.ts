import { axisBottom, axisLeft, axisRight, axisTop } from "d3";

/**
 * Dict from direction to axisFn of d3 (axisLeft, ...)
 */
export const toAxisFn = {
    left: axisLeft,
    right: axisRight,
    bottom: axisBottom,
    top: axisTop,
} as const;
