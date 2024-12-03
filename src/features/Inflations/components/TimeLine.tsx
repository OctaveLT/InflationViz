import { scaleTime } from "d3";
import { memo, useMemo, useRef } from "react";
import { useInflationsData } from "../../../api/hooks/useInflationsData";
import { XAxis } from "../../../components/viz/Axis/XAxis";
import { Brush, BrushEvent } from "../../../components/viz/Brush/Brush";
import { LineChart } from "../../../components/viz/LineChart/LineChart";
import { getInnerDimension } from "../../../functions/dimensions/getInnerDimension";
import { useBreakpoint } from "../../../hooks/useBreakpoint";
import { Dimension } from "../../../types/dimensions/types";
import { Country } from "../constants/countries";
import { theme } from "../constants/theme";
import { getCountryData } from "../functions/getCountryData";

const xMargin = {
    right: 10,
    left: 30,
};

type TimeLineProps = {
    countryKey: Country;
    onBrush: (range: [Date, Date]) => void;
};

const margin: Dimension["margin"] = xMargin;

function getDimensions(breakpoint: string) {
    if (breakpoint === "xs") {
        return {
            height: 80,
            width: 400,
            margin,
        };
    }

    if (breakpoint === "sm") {
        return {
            height: 80,
            width: 600,
            margin,
        };
    }

    if (breakpoint === "md") {
        return {
            height: 80,
            width: 600,
            margin,
        };
    }

    if (breakpoint === "lg") {
        return {
            height: 80,
            width: 600,
            margin,
        };
    }

    return {
        height: 160,
        width: 1000,
        margin,
    };
}

function useDimensions() {
    const breakpoint = useBreakpoint();

    const dimensions = useMemo(() => getDimensions(breakpoint), [breakpoint]);

    return dimensions;
}

export function TimeLine({ countryKey, onBrush }: TimeLineProps) {
    const svgRef = useRef<SVGSVGElement>(null);
    const { data: inflationsData } = useInflationsData();

    const dimension = useDimensions();
    const { innerWidth } = getInnerDimension(dimension);

    const brushDimension: Dimension = useMemo(
        () => ({
            ...dimension,
            margin: { ...xMargin, top: 0, bottom: 0 },
        }),
        [dimension],
    );

    const stringDates = useMemo(
        () => inflationsData?.data.keys[1] ?? [],
        [inflationsData],
    );

    const dateDomain: [Date, Date] = useMemo(
        () => [
            new Date(stringDates[0]),
            new Date(stringDates[stringDates.length - 1]),
        ],
        [stringDates],
    );

    const xScale = useMemo(
        () => scaleTime(dateDomain, [0, innerWidth]),
        [dateDomain, innerWidth],
    );

    function handleBrush(event: BrushEvent) {
        const { selection } = event;

        const [start, end] = selection.map(xScale.invert);

        onBrush([start, end]);
    }

    const axisDimension = useMemo(
        () => ({
            ...dimension,
            margin: {
                ...xMargin,
                top: 0,
                bottom: 20,
            },
        }),
        [dimension],
    );

    if (!inflationsData) return null;

    function handleDoubleClick() {
        onBrush(dateDomain);
    }

    const dates = stringDates.map((date) => new Date(date));
    const inflations = getCountryData(inflationsData.data.data, countryKey);

    const points = dates.map((date, i) => ({
        x: xScale(date),
        y: inflations[i],
    }));

    return (
        <svg
            ref={svgRef}
            width={dimension.width}
            height={dimension.height}
            onDoubleClick={handleDoubleClick}
            style={{
                padding: 10,
            }}
        >
            <LineChart
                svg={svgRef.current}
                dimension={{
                    ...dimension,
                    margin: {
                        ...xMargin,
                        top: 10,
                        bottom: 30,
                    },
                }}
                data={{ points }}
                lineStyling={{
                    stroke: theme.typography.primary,
                }}
            />
            <XAxis direction="bottom" scale={xScale} dimension={axisDimension} />
            <Brush dimension={brushDimension} onBrush={handleBrush} />
        </svg>
    );
}

export const TimeLineMemo = memo(TimeLine);
