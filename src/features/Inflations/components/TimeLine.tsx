import { scaleTime } from "d3";
import { useRef } from "react";
import { useInflationsData } from "../../../api/hooks/useInflationsData";
import { XAxisV3 } from "../../../components/viz/Axis/XAxisV3";
import { BrushEvent, useBrush } from "../../../components/viz/Brush/brush";
import { LineChartV2 } from "../../../components/viz/LineChart/LineChartV2";
import { getInnerDimension } from "../../../functions/dimensions/getInnerDimension";
import { Dimension } from "../../../types/dimensions/types";
import { Country } from "../constants/countries";
import { theme } from "../constants/theme";
import { getCountryData } from "../functions/getCountryData";

const xMargin = {
    right: 10,
    left: 30,
};

const dimension: Dimension = {
    width: 600,
    height: 80,
    margin: {
        ...xMargin,
    },
};

const brushDimension: Dimension = {
    ...dimension,
    margin: { ...xMargin, top: 0, bottom: 0 },
};

type TimeLineProps = {
    countryKey: Country;
    onBrush: (range: [Date, Date]) => void;
};

export function TimeLine({ countryKey, onBrush }: TimeLineProps) {
    const { data: inflationsData } = useInflationsData();
    const svgRef = useRef<SVGSVGElement>(null);

    const { innerWidth } = getInnerDimension(dimension);

    const stringDates = inflationsData?.data.keys[1] ?? [];

    const dateDomain: [Date, Date] = [
        new Date(stringDates[0]),
        new Date(stringDates[stringDates.length - 1]),
    ];

    const xScale = scaleTime(dateDomain, [0, innerWidth]);

    function handleBrush(event: BrushEvent) {
        const { selection } = event;

        const [start, end] = selection.map(xScale.invert);

        onBrush([start, end]);
    }

    useBrush(svgRef?.current, brushDimension, handleBrush);

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
            <LineChartV2
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
            <XAxisV3
                svg={svgRef.current}
                direction="bottom"
                scale={xScale}
                dimension={{
                    ...dimension,
                    margin: {
                        ...xMargin,
                        top: 60,
                        bottom: 0,
                    },
                }}
            />
        </svg>
    );
}
