import { scaleLinear, scaleTime } from "d3";
import { useRef, useState } from "react";
import { ScatteredPoints } from "../../../components";
import { XAxis } from "../../../components/viz/Axis/XAxis";
import { Grid } from "../../../components/viz/Lines/Grid";
import { Line } from "../../../components/viz/Lines/Line";
import { TooltipPosition } from "../../../components/viz/Tooltip/Tooltip";
import { getInnerDimension } from "../../../functions/dimensions/getInnerDimension";
import { useBreakpoint } from "../../../hooks/useBreakpoint";
import { Dimension } from "../../../types/dimensions/types";
import { Country } from "../constants/countries";
import { inflationDomain } from "../constants/domains";
import { theme } from "../constants/theme";
import { thresholdColor } from "../functions/colorScale";
import { InflationsData } from "../types/data";
import { InflationTooltip } from "./InflationTooltip";
import { TimeLine } from "./TimeLine";

type InflationChartTileProps = {
    data: {
        stringDates: InflationsData["data"]["keys"][1];
        inflations: InflationsData["data"]["data"][number];
    };
    countryKey: Country;
    gridArea: string;
    onDateRangeChange: (dateRange: [Date, Date]) => void;
    onDatePick: (date: Date) => void;
};

const margin: Dimension["margin"] = {
    bottom: 30,
    left: 30,
    right: 10,
    top: 10,
};

function useDimensions() {
    const breakpoint = useBreakpoint();

    if (breakpoint === "xs") {
        return {
            height: 250,
            width: 400,
            margin,
        };
    }

    if (breakpoint === "sm") {
        return {
            height: 250,
            width: 600,
            margin,
        };
    }

    if (breakpoint === "md") {
        return {
            height: 250,
            width: 600,
            margin,
        };
    }

    if (breakpoint === "lg") {
        return {
            height: 250,
            width: 600,
            margin,
        };
    }

    return {
        height: 350,
        width: 1000,
        margin,
    };
}

export function InflationChartTile({
    data,
    gridArea,
    countryKey,
    onDateRangeChange,
    onDatePick,
}: InflationChartTileProps) {
    const svgRef = useRef<SVGSVGElement | null>(null);
    const dimension = useDimensions();

    const [tooltipPosition, setTooltipPosition] = useState<TooltipPosition | null>(
        null,
    );

    const { width, height } = dimension;
    const { innerWidth, innerHeight, margin } = getInnerDimension(dimension);

    const { stringDates, inflations } = data;

    const dates = stringDates.map((date) => new Date(date));

    const xScale = scaleTime([dates[0], dates[dates.length - 1]], [0, innerWidth]);
    const yScale = scaleLinear(inflationDomain, [innerHeight, 0]);

    const points = dates.map((date, i) => ({
        x: date,
        y: inflations[i],
    }));

    return (
        <div
            style={{
                gridArea,
                position: "relative",
                color: theme.typography.primary,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                ...theme.card,
            }}
        >
            <svg
                ref={svgRef}
                width={width}
                height={height}
                style={{
                    padding: 10,
                }}
            >
                <Line
                    dimension={dimension}
                    data={[
                        { x: 0, y: yScale(2) },
                        { x: innerWidth, y: yScale(2) },
                    ]}
                    lineStyling={{
                        stroke: thresholdColor,
                        strokeWidth: 3,
                    }}
                />
                <Grid
                    dimension={dimension}
                    y={{ multipleOf: 10, domain: inflationDomain }}
                    lineStyling={{
                        stroke: theme.grey[3],
                    }}
                />
                <ScatteredPoints
                    svg={svgRef.current}
                    dimension={{
                        height,
                        width,
                        margin: {
                            bottom: 30,
                            left: 40,
                            right: 10,
                            top: 10,
                        },
                    }}
                    data={{ points }}
                    axis={{
                        y: {
                            min: inflationDomain[0],
                            max: inflationDomain[1],
                        },
                        x: {
                            scale: "time",
                        },
                    }}
                    onMouseEnter={(point) => {
                        setTooltipPosition({
                            x: xScale(point.x ?? 0),
                            y: yScale(point.y ?? 0),
                        });
                    }}
                    onMouseLeave={() => {
                        setTooltipPosition(null);
                    }}
                    onClick={(point) => {
                        const index = points.findIndex((p) => p === point);
                        onDatePick(dates[index]);
                    }}
                />
                <XAxis
                    direction="bottom"
                    scale={xScale}
                    dimension={{
                        height,
                        width,
                        margin: {
                            ...margin,
                            bottom: 10,
                        },
                    }}
                />
                <XAxis
                    direction="left"
                    scale={yScale}
                    dimension={{
                        height,
                        width,
                        margin: {
                            ...margin,
                            left: 30,
                        },
                    }}
                />
            </svg>
            <TimeLine countryKey={countryKey} onBrush={onDateRangeChange} />
            <InflationTooltip
                dimension={dimension}
                tooltipPosition={tooltipPosition}
                xScale={xScale}
                yScale={yScale}
            />
        </div>
    );
}
