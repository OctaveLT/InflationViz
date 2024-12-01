import { useState } from "react";
import { useInflationsData } from "../../../api/hooks/useInflationsData";
import { DateShort } from "../../../types/generics/dates";
import { Country } from "../constants/countries";
import { inflationDomain } from "../constants/domains";
import { createColorScale } from "../functions/colorScale";
import { getCountryData } from "../functions/getCountryData";
import { InflationsData } from "../types/data";
import { CountryCard } from "./CountryCard";
import { EUMap } from "./EUMap";
import { InflationsLineChart } from "./InflationsLineChart";

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
        result[country] = data.data.data[index][lastIndex - 1];
    });

    return result;
}

type ShownInflationRates = {
    date: DateShort;
    rates: Record<Country, number>;
};

type TilesProps = {
    countryKey: Country;
    onCountryChange: (country: Country) => void;
};

export function Tiles({ countryKey, onCountryChange }: TilesProps) {
    const { data: inflationsData } = useInflationsData();
    const [tempIndexes, setTempIndexes] = useState<[number, number] | undefined>();
    const [tempShownInflationRates, setTempShownInflationRates] = useState<
        ShownInflationRates | undefined
    >();

    if (inflationsData === undefined) return null;

    const indexes = tempIndexes ?? [0, inflationsData.data.keys[1].length - 1];
    const tempStringDates = inflationsData.data.keys[1].slice(
        indexes[0],
        indexes[1],
    );
    const shownInflationRates = tempShownInflationRates ?? {
        date: tempStringDates.slice(-1)[0],
        rates: getLastInflationRates(inflationsData, indexes[1]),
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

        setTempIndexes([startIndex, endIndex]);
        setTempShownInflationRates({
            date: dates[endIndex],
            rates: getLastInflationRates(inflationsData, endIndex),
        });
    }

    function handleDatePick(date: Date) {
        if (inflationsData === undefined) return;

        const dates = inflationsData.data.keys[1];

        const index = dates.findIndex(
            (d) => new Date(d).getTime() === date.getTime(),
        );

        setTempShownInflationRates({
            date: dates[index],
            rates: getLastInflationRates(inflationsData, index),
        });
    }

    const lineData = getCountryData(inflationsData.data.data, countryKey);
    const tempInflationRates = lineData.slice(indexes[0], indexes[1] + 1);

    const lastInflationRates = shownInflationRates.rates;
    const lastDate = shownInflationRates.date;

    return (
        <div
            style={{
                display: "grid",
                gridTemplateAreas: `
                        "map countryCard countryCard"
                        "map lineChart lineChart"
                        "map lineChart lineChart"
                        `,
                gridTemplateColumns: "auto 1fr",
                gridTemplateRows: "auto 1fr",
                gap: 10,
                padding: 10,
            }}
        >
            <EUMap
                gridArea="map"
                lastDate={lastDate}
                highlightedCountry={countryKey}
                onCountryChange={onCountryChange}
                chloroplethConfig={{
                    data: lastInflationRates,
                    colorScale: createColorScale(inflationDomain),
                }}
            />
            <CountryCard
                gridArea="countryCard"
                countryKey={countryKey}
                lastInflationRate={lastInflationRates[countryKey]}
                lastDate={lastDate}
            />
            <InflationsLineChart
                gridArea="lineChart"
                dimension={{
                    height: 250,
                    width: 600,
                    margin: {
                        bottom: 30,
                        left: 30,
                        right: 10,
                        top: 10,
                    },
                }}
                data={{
                    stringDates: tempStringDates,
                    inflations: tempInflationRates,
                }}
                countryKey={countryKey}
                onDateRangeChange={handleDateRangeChange}
                onDatePick={handleDatePick}
            />
        </div>
    );
}
