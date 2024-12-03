import { useEffect, useLayoutEffect, useState } from "react";

type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl";

const breakpoints: Record<number, Breakpoint> = {
    0: "xs",
    600: "sm",
    960: "md",
    1280: "lg",
    1920: "xl",
};

type Size = {
    width: number;
    height: number;
};

export function useBreakpoint() {
    const [breakpoint, setBreakPoint] = useState<Breakpoint>("xs");
    const [windowSize, setWindowSize] = useState<Size>({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    const handleResize = () => {
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
        });
    };

    useEffect(() => {
        window.addEventListener("resize", handleResize);

        const width = windowSize.width;

        if (0 < width && width < 600) {
            setBreakPoint(breakpoints[0]);
        }
        if (600 < width && width < 960) {
            setBreakPoint(breakpoints[600]);
        }
        if (960 < width && width < 1280) {
            setBreakPoint(breakpoints[960]);
        }
        if (1280 < width && width < 1920) {
            setBreakPoint(breakpoints[1280]);
        }
        if (width >= 1920) {
            setBreakPoint(breakpoints[1920]);
        }

        return () => window.removeEventListener("resize", handleResize);
    }, [windowSize.width]);

    useLayoutEffect(() => {
        handleResize();
    }, []);

    return breakpoint;
}
