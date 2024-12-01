import { useState, useEffect, useLayoutEffect } from "react";

export const useDimensions = (targetRef: React.RefObject<HTMLDivElement>) => {
    const getDimensions = () => ({
        width: targetRef.current ? targetRef.current.clientWidth : 0,
        height: targetRef.current ? targetRef.current.clientHeight : 0,
    });

    const [dimensions, setDimensions] = useState(getDimensions);

    const handleResize = () => setDimensions(getDimensions());

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useLayoutEffect(() => {
        console.log("d", getDimensions());
        handleResize();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return dimensions;
};
