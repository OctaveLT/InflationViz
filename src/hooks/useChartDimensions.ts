import { useEffect, useRef, useState } from "react";
import { Dimension } from "../types/dimensions/types";

const combineChartDimensions = (dimension: Partial<Dimension>) => {
    const { margin } = dimension;
    const parsedDimensions = {
        width: dimension.width || 700,
        height: dimension.height || 100,
        marginTop: margin?.top || 10,
        marginRight: margin?.right || 10,
        marginBottom: margin?.bottom || 40,
        marginLeft: margin?.left || 75,
    };

    const boundedHeight = Math.max(
        parsedDimensions?.height ??
            0 - parsedDimensions.marginTop - parsedDimensions.marginBottom,
        0,
    );

    const boundedWidth = Math.max(
        parsedDimensions?.width ??
            0 - parsedDimensions.marginLeft - parsedDimensions.marginRight,
        0,
    );

    return {
        ...parsedDimensions,
        boundedHeight,
        boundedWidth,
    };
};

const useChartDimensions = <Ref extends Element>(dimension: Partial<Dimension>) => {
    const ref = useRef<Ref>();
    const combinedDimension = combineChartDimensions(dimension);

    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        if (dimension.width && dimension.height) return;

        const element = ref.current;

        if (element === undefined) return;

        const resizeObserver = new ResizeObserver((entries) => {
            if (!Array.isArray(entries)) return;
            if (!entries.length) return;

            const entry = entries[0];

            if (width != entry.contentRect.width) setWidth(entry.contentRect.width);
            if (height != entry.contentRect.height)
                setHeight(entry.contentRect.height);
        });
        resizeObserver.observe(element);

        return () => resizeObserver.unobserve(element);
    }, [combinedDimension, dimension.height, dimension.width, height, width]);

    const newSettings = combineChartDimensions({
        ...combinedDimension,
        width: combinedDimension.width ?? width,
        height: combinedDimension.height ?? height,
    });

    return [ref, newSettings] as const;
};

export default useChartDimensions;
