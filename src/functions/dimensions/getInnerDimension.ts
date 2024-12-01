import { Dimension, InnerDimension } from "../../types/dimensions/types";

const DEFAULT_ZERO_MARGIN = {
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
}

export const getInnerDimension = (
  dimension: Dimension,
): InnerDimension => {
  const { width, height, margin } = dimension;

  if (margin == null) return {
    innerWidth: width,
    innerHeight: height,
    margin: DEFAULT_ZERO_MARGIN,
  }

  const marginLeft = margin?.left ?? 0;
  const marginRight = margin?.right ?? 0;
  const marginTop = margin?.top ?? 0;
  const marginBottom = margin?.bottom ?? 0;

  return {
    innerWidth: Math.max(0, width - marginLeft - marginRight),  
    innerHeight: Math.max(0, height - marginTop - marginBottom),
    margin: {
      ...DEFAULT_ZERO_MARGIN,
      ...margin,
    }
  };
}