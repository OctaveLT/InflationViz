import { useState } from "react";
import { useInflationsData } from "../../../api/hooks/useInflationsData";
import { Country } from "../constants/countries";
import { inflationColorScale } from "../functions/colorScale";
import { getCountryData } from "../functions/getCountryData";
import { InflationsData, LastRatesAndDate } from "../types/data";
import { CountryTile } from "./CountryTile";
import { InflationChartTile } from "./InflationChartTile";
import { MapTile } from "./MapTile";
import "./tiles.css";

function getLastInflationRates(
    data: InflationsData,
    lastIndex: number,
): Record<Country, number> {
    const countries = data.data.keys[0];

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const result: Record<Country, number> = {};

    countries.forEach((country, index) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        result[country] = data.data.data[index][lastIndex];
    });

    return result;
}

type TilesProps = {
    countryKey: Country;
    onCountryChange: (country: Country) => void;
};

export function Tiles({ countryKey, onCountryChange }: TilesProps) {
    const { data: inflationsData } = useInflationsData();
    const [periodIndexesState, setPeriodIndexesState] = useState<
        [number, number] | undefined
    >();
    const [lastRatesAndDateState, setLastRatesAndDateState] = useState<
        LastRatesAndDate | undefined
    >();

    if (inflationsData === undefined) return null;

    const periodIndexes = periodIndexesState ?? [
        0,
        inflationsData.data.keys[1].length - 1,
    ];
    const stringDatesSelection = inflationsData.data.keys[1].slice(
        periodIndexes[0],
        periodIndexes[1] + 1,
    );

    const lastRatesAndDate = lastRatesAndDateState ?? {
        date: stringDatesSelection.slice(-1)[0],
        rates: getLastInflationRates(inflationsData, periodIndexes[1]),
    };

    function handleDateRangeChange([start, end]: [Date, Date]) {
        if (inflationsData === undefined) return;

        const dates = inflationsData.data.keys[1];

        const startIndex = dates.findIndex((date) => {
            const time = new Date(date).getTime();

            return time >= start.getTime();
        });
        const endIndex = dates.findIndex((date) => {
            const time = new Date(date).getTime();

            return time >= end.getTime();
        });

        setPeriodIndexesState([startIndex, endIndex]);

        const lastDate = dates[endIndex];

        setLastRatesAndDateState({
            date: lastDate,
            rates: getLastInflationRates(inflationsData, endIndex),
        });
    }

    function handleDatePick(date: Date) {
        if (inflationsData === undefined) return;

        const dates = inflationsData.data.keys[1];

        const index = dates.findIndex(
            (d) => new Date(d).getTime() === date.getTime(),
        );

        setLastRatesAndDateState({
            date: dates[index],
            rates: getLastInflationRates(inflationsData, index),
        });
    }

    const lineData = getCountryData(inflationsData.data.data, countryKey);
    const inflationRatesSelection = lineData.slice(
        periodIndexes[0],
        periodIndexes[1] + 1,
    );

    const lastInflationRates = lastRatesAndDate.rates;
    const lastDate = lastRatesAndDate.date;

    return (
        <div className="tiles">
            <MapTile
                gridArea="map"
                lastDate={lastDate}
                highlightedCountry={countryKey}
                onCountryChange={onCountryChange}
                chloroplethConfig={{
                    data: lastInflationRates,
                    colorScale: inflationColorScale(),
                }}
            />
            <CountryTile
                gridArea="countryCard"
                countryKey={countryKey}
                lastRatesAndDate={lastRatesAndDate}
                inflationRatesSelection={inflationRatesSelection}
            />
            <InflationChartTile
                gridArea="lineChart"
                data={{
                    stringDates: stringDatesSelection,
                    inflations: inflationRatesSelection,
                }}
                countryKey={countryKey}
                onDateRangeChange={handleDateRangeChange}
                onDatePick={handleDatePick}
            />
        </div>
    );
}
